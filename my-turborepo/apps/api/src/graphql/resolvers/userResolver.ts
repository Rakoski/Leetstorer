import bcrypt from "bcryptjs";
import { log } from "@repo/logger";
import { ProblemInterface } from "./utils/problemInterface.ts";
import { UserInterface } from "./utils/userInterface.ts";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from '../../utils/aws-config.ts';
import * as crypto from "crypto";

const userCreator = require('./utils/userCreator');

module.exports = {
    users: async (args: object, req: {isAuth: boolean, isAdmin: boolean}) => {
        if (!req.isAuth && !req.isAdmin) {
            throw new Error("Unauthorized!")
        }

        try {
            let users = UserInterface;
             users = await User.find().populate('createdProblems');

            if (!users) {
                return new Error("Could not retrieve user and it's problems");
            }

            return users.map((user) => ({
                ...user._doc,
                _id: user._id.toString(),
                createdProblems: user.createdProblems.map((problem: ProblemInterface) => ({
                    title: problem.title,
                    level: problem.level,
                    description: problem.description,
                    user_description: problem.user_description,
                    frequency: problem.frequency,
                    link: problem.link,
                    data_structure: problem.data_structure,
                    date: problem.date,
                }))
            }));

        } catch (err) {
            log("Error in querying a user: ", err);
            throw err;
        }
    },
    createUser: async (_args: unknown, { userInput: { username, email, password } }: { userInput: { username: string, email: string, password: string } }) => {
        try {
            const existingUser = await User.findOne({ email });

            log("existinguser: ", existingUser);
            if (existingUser) {
                return new Error("User already exists!");
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                username,
                email,
                password: hashedPassword,
            });

            const result = await user.save();

            return { password: null, _id: result._id, email: result.email, username: result.username };

            if (result) {
                return { ...result._doc, password: null };
            }
        } catch (err) {
            log("Error in createUser resolver: ", err);
            throw new Error("Error in creating user");
        }
    },
    login: async (_args: unknown, { email, password }: { email: string, password: string }) => {
        try {
            let user = null
            user = await User.findOne({ email });
            if (!user) {
                return new Error("404 " + email +  " User not found!");
            }

            const passwordsAreEqual = await bcrypt.compare(password, user.password);
            if (!passwordsAreEqual) {
                return new Error("401 Invalid credentials");
            }

            const token = process.env.JWT_KEY
                ? jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '48h' })
                : null;

            return { userId: user.id, token, tokenExpiration: 48 };
        } catch (err) {
            if (err instanceof Error) {
                console.error("Error in login:", err.message);
            }
            throw err;
        }
    },

    // because I configured my server without the proper relay modifications, I will need to do some concessions,
    // mainly, I basically cannot do queries since I don't have the Node type. I will then, use mutations to fetch
    // my users problems.
    getUserProblems: async (args: { userId: string }, req: {isAuth: boolean, isAdmin: boolean}) => {
        if (!req.isAuth) {

            throw new Error("Unauthorized!");
        }

        try {
            let user = null

            user = await User.findById(args.userId).populate('createdProblems');

            if (!user) {
                return new Error("User not found!");
            }

            return user.createdProblems.map((problem) => ({
                _id: problem._id.toString(),
                title: problem.title,
                level: problem.level,
                description: problem.description,
                user_description: problem.user_description,
                frequency: problem.frequency,
                link: problem.link,
                data_structure: problem.data_structure,
                date: problem.date?.toString()
            }));
        } catch (err) {
            console.log("Error in getUserProblems resolver: ", err);
            throw err;
        }
    },
    associateUserWithProblem: async (_args: unknown, args: { userId: string, problemId: string }) => {
        try {
            const { userId, problemId } = args;

            let user, problem = null

            user = await User.findById(userId);
            problem = await Problem.findById(problemId);

            if (!user || !problem) {
                return new Error("User or problem not found");
            }

            user.createdProblems.push(problem._id);
            await user.save();

            return {
                _id: problem._id.toString(),
                title: problem.title,
                level: problem.level,
                description: problem.description,
                user_description: problem.user_description,
                frequency: problem.frequency,
                link: problem.link,
                data_structure: problem.data_structure,
                date: problem.date?.toString(),
                creator: await userCreator(userId),
            };
        } catch (err) {
            log("Error in associateUserWithProblem resolver: ", err);
            throw err;
        }
    },
    requestPasswordReset: async ({ email }) => {
        try {
            log("email sent!")
            let user: UserInterface

            user = await User.findOne({ email });

            if (!user) {
                return new Error('User with this email does not exist');
            }

            const resetToken = crypto.randomBytes(20).toString('hex');
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

            await user.save();

            await sendPasswordResetEmail(email, resetToken);

            return true;
        } catch (err) {
            console.error('Error in requestPasswordReset:', err);
            throw err;
        }
    },
    resetPassword: async ({ token, newPassword }) => {
        try {
            let user: UserInterface
            user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });

            if (!user) {
                return new Error('Invalid or expired reset token');
            }

            user.password = await bcrypt.hash(newPassword, 12);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            await user.save();

            return true;
        } catch (err) {
            console.error('Error in resetPassword:', err);
            throw err;
        }
    },
}