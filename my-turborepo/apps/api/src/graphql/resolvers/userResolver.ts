import bcrypt from "bcryptjs";
import {log} from "@repo/logger";
import {ProblemInterface} from "./utils/problemInterface.ts";
import jwt from "jsonwebtoken";

const Problem = require('../../models/problem');
const User = require('../../models/user.ts');

const userCreator = require('./utils/userCreator.ts')

module.exports = {
    users: async (req: {isAuth: boolean}) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized!")
        }

        try {
            let users = null

            users = await User.find().populate('createdProblems');

            return users.map((user: { _doc: { _id: string }, _id: string, email: string, createdProblems: Array<ProblemInterface> }) => ({
                ...user,
                _id: user._id.toString(),
                email: user.email,
                createdProblems: user.createdProblems.map((problem) => ({
                    title: problem.title,
                    level: problem.level,
                    description: problem.description,
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
    createUser: async (args: {userInput: { email: string; password: string }}) => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });

            if (existingUser) {
                throw new Error("User already exists!");
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
            });

            const result = await user.save();

            log("User created successfully");
            return { ...result, password: null, _id: result._id, email: result.email };
        } catch (err) {
            log("Error in createUser resolver: ", err);
            throw new Error("Error in creating user");
        }
    },
    login: async (args: { email: string, password: string }) => {
        try {
            let user = null

            user = await User.findOne({ email: args.email });

            if (!user) {
                throw new Error("User does not exist!");
            }

            const passwordsAreEqual = await bcrypt.compare(args.password, user.password);

            if (!passwordsAreEqual) {
                throw new Error("401 Invalid credentials");
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_KEY,
                { expiresIn: '1h' }
            );

            return { userId: user.id, token: token, tokenExpiration: 1 };
        } catch (err) {
            console.error("Error in login:", err.message);
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
                throw new Error("User or problem not found");
            }

            user.createdProblems.push(problem._id);
            await user.save();

            return {
                _id: problem._id.toString(),
                title: problem.title,
                level: problem.level,
                description: problem.description,
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
}