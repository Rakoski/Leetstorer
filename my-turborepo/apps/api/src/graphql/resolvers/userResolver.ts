import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import assert from "assert";

import userCreator from './utils/userCreator.ts';
import User from '../../models/user.ts';
import Problem from '../../models/problem';

import { ProblemInterface } from './utils/problemInterface.ts';
import { sendPasswordResetEmail } from '../../utils/aws-config.ts';
import { log } from "@repo/logger";

const UserResolvers: object = {
    users: async (args: object, req: { isAuth: boolean; isAdmin: boolean }) => {
        if (!req.isAuth && !req.isAdmin) {
            throw new Error("Unauthorized!");
        }

        try {
            const users = await User.find().populate('createdProblems');

            return users.map((user) => {
                const userObject = user.toObject();
                return {
                    ...userObject,
                    _id: userObject._id.toString(),
                    resetPasswordExpires: userObject.resetPasswordExpires ? userObject.resetPasswordExpires : "",
                    createdProblems: userObject.createdProblems.map((problem: any) => ({
                        ...problem,
                        _id: problem._id.toString(),
                    })),
                };
            });
        } catch (err) {
            log("Error in querying a user: ", err);
            throw err;
        }
    },
    createUser: async (args: { userInput: { username: string; email: string; password: string } }) => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });

            if (existingUser) {
                throw new Error("User already exists!");
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                username: args.userInput.username,
                email: args.userInput.email,
                password: hashedPassword,
            });

            assert(user, "User is null");

            const result = await user.save();

            return { password: null, _id: result._id.toString(), email: result.email, username: result.username };
        } catch (err) {
            log("Error in createUser resolver: ", err);
            throw new Error("Error in creating user");
        }
    },
    login: async (args: { email: string; password: string }) => {
        try {
            const user = await User.findOne({ email: args.email });
            if (!user) {
                throw new Error("User does not exist!");
            }

            const passwordsAreEqual = await bcrypt.compare(args.password, user.password);
            if (!passwordsAreEqual) {
                throw new Error("401 Invalid credentials");
            }

            const jwtKey = process.env.JWT_KEY;
            if (!jwtKey) {
                throw new Error("JWT_KEY is not defined in environment variables");
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, jwtKey, { expiresIn: '48h' });

            return { userId: user.id, token, tokenExpiration: 48 };
        } catch (err) {
            console.error("Error in login:", err);
            throw err;
        }
    },
    getUserProblems: async (args: { userId: string }, req: { isAuth: boolean }) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized!");
        }

        try {
            const user = await User.findById(args.userId).populate('createdProblems');

            if (!user) {
                throw new Error("User not found!");
            }

            const populatedProblems = user.createdProblems as unknown as ProblemInterface[];

            return populatedProblems.map((problem) => ({
                ...problem.toObject(),
                _id: problem._id.toString(),
                date: problem.date ? problem.date.toString() : "",
            }));
        } catch (err) {
            console.log("Error in getUserProblems resolver: ", err);
            throw err;
        }
    },
    associateUserWithProblem: async (args: { userId: string; problemId: string }) => {
        try {
            const user = await User.findById(args.userId);
            const problem = await Problem.findById(args.problemId);

            if (!user || !problem) {
                return new Error("User or problem not found");
            }

            user.createdProblems.push(problem._id);
            await user.save();

            return {
                ...problem,
                _id: problem._id.toString(),
                date: problem.date ? problem.date.toString() : "",
                creator: await userCreator(args.userId),
            };
        } catch (err) {
            log("Error in associateUserWithProblem resolver: ", err);
            throw err;
        }
    },
    requestPasswordReset: async (args: { email: string }) => {
        try {
            const user = await User.findOne({ email: args.email });

            if (!user) {
                return new Error('User with this email does not exist');
            }

            const resetToken = crypto.randomBytes(20).toString('hex');
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

            await user.save();

            await sendPasswordResetEmail(args.email, resetToken);

            return true;
        } catch (err) {
            console.error('Error in requestPasswordReset:', err);
            throw err;
        }
    },
    resetPassword: async (args: { token: string; newPassword: string }) => {
        try {
            const user = await User.findOne({
                resetPasswordToken: args.token,
                resetPasswordExpires: { $gt: Date.now() },
            });

            if (!user) {
                return new Error('Invalid or expired reset token');
            }

            user.password = await bcrypt.hash(args.newPassword, 12);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            await user.save();

            return true;
        } catch (err) {
            console.error('Error in resetPassword:', err);
            throw err;
        }
    },
};

export default UserResolvers;
