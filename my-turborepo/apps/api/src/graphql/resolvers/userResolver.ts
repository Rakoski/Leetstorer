import bcrypt from "bcryptjs";
import { log } from "@repo/logger";
import { ProblemInterface } from "./utils/problemInterface.ts";
import { UserInterface } from "./utils/userInterface.ts";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from '../../utils/aws-config.ts';
import * as crypto from "crypto";
import assert from "node:assert";

const Problem = require('../../models/problem');
const User = require('../../models/user.ts');

const userCreator = require('./utils/userCreator.ts')

module.exports = {
    users: async (args: object, req: {isAuth: boolean, isAdmin: boolean}) => {
        if (!req.isAuth && !req.isAdmin) {
            throw new Error("Unauthorized!")
        }

        try {
            let users = null
            users = await User.find().populate('createdProblems');

            return users.map((user: { _doc: { _id: string }, _id: string, username: string, email: string,
                createdProblems: Array<ProblemInterface>}) => ({
                ...user,
                _id: user._id.toString(),
                email: user.email,
                username: user.username,
                createdProblems: user.createdProblems.map((problem) => ({
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
    createUser: async (args: {userInput: { username: string, email: string; password: string }}) => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });

            log("existinguser: ", existingUser);
            if (existingUser) {
                return new Error("User already exists!");
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                username: args.userInput.username,
                email: args.userInput.email,
                password: hashedPassword,
            });

            assert(user, "User is null");

            const result = await user.save();

            return { password: null, _id: result._id, email: result.email, username: result.username };

        } catch (err) {
            log("Error in createUser resolver: ", err);
            throw new Error("Error in creating user");
        }
    },
    login: async (args: { email: string, password: string }) => {
        try {
            let user = null

            let email = args.email;
            let password = args.password;
            user = await User.findOne({ email });
            if (!user) {
                return new Error("User does not exist!");
            }

            const passwordsAreEqual = await bcrypt.compare(password, user.password);
            if (!passwordsAreEqual) {
                return new Error("401 Invalid credentials");
            }

            const jwtKey = process.env.JWT_KEY;
            if (!jwtKey) {
                return new Error("JWT_KEY is not defined in environment variables");
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, jwtKey, { expiresIn: '48h' });

            return { userId: user.id, token, tokenExpiration: 48 };
        } catch (err: unknown) {
            console.error("Error in login:", err);
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
            let user = new User()

            user = await User.findById(args.userId).populate('createdProblems');

            if (!user) {
                return new Error("User not found!");
            }

            assert(Array.isArray(user.createdProblems), "user.createdProblems is not an array");

            return user.createdProblems.map((problem: ProblemInterface) => ({
                _id: problem._id.toString(),
                title: problem.title,
                level: problem.level,
                description: problem.description,
                user_description: problem.user_description,
                frequency: problem.frequency,
                link: problem.link,
                data_structure: problem.data_structure,
                date: problem.date.toString()
            }));
        } catch (err) {
            console.log("Error in getUserProblems resolver: ", err);
            throw err;
        }
    },
    associateUserWithProblem: async (args: { userId: string, problemId: string }) => {
        try {
            const { userId, problemId } = args;

            let user = null
            let problem = new Problem()

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
                date: problem.date.toString(),
                creator: await userCreator(userId),
            };
        } catch (err) {
            log("Error in associateUserWithProblem resolver: ", err);
            throw err;
        }
    },
    requestPasswordReset: async (args: { email: string }) => {
        try {
            log("email sent!")
            let user: UserInterface

            const { email } = args;
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
    resetPassword: async (args: { token: string, newPassword: string }) => {
        try {
            let user: UserInterface
            let token = args.token;
            user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });

            if (!user) {
                return new Error('Invalid or expired reset token');
            }

            let newPassword = args.newPassword;
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