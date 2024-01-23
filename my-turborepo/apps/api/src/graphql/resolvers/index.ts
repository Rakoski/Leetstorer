import bcrypt from "bcryptjs";
import {log} from "@repo/logger";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";

const Problem = require('../../models/problem');
const User = require('../../models/user.ts');

interface UserInterface {
    _doc: any;
    _id: ObjectId;
    email: string;
    createdProblems: mongoose.Types.ObjectId[];
}

interface ProblemInterface {
    creator: unknown;
    _doc: unknown;
    _id: ObjectId;
    title: string;
    level: string;
    description: string;
    frequency: number;
    link: string;
    data_structure: string;
    date: string;
}

const problemCreator = async (problemIds: Array<unknown>): Promise<Array<unknown>> => {
    try {
        const problems: Array<ProblemInterface> = await Problem.find({ _id: { $in: problemIds } });

        return problems.map((problem) => ({
            ...problem._doc,
            _id: problem._id,
            creator: userCreator.bind(this, problem.creator),
        }));
    } catch (err) {
        throw err;
    }
};


const userCreator = async (userId: unknown): Promise<unknown> => {
    try {
        const creator: UserInterface | null = await User.findById(userId).populate('createdProblems');

        if (!creator) {
            throw new Error("User not found");
        }

        return {
            _id: creator._doc._id.toString(),
            email: creator.email,
            createdProblems: creator.createdProblems.map((problem: ProblemInterface) => ({
                _id: problem._id.toString(),
                title: problem.title,
                level: problem.level,
                description: problem.description,
                frequency: problem.frequency,
                link: problem.link,
                data_structure: problem.data_structure,
                date: problem.date,
            })),
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    problems: () => {
        return Problem.find()
            .then(async (problems: any[]) => {
                const populatedProblems = [];
                for (const problem of problems) {
                    const populatedUserCreator = await userCreator(problem._doc.creator);
                    populatedProblems.push({
                        ...problem._doc,
                        _id: problem._id,
                        date: problem.date.toString(),
                        creator: populatedUserCreator
                    });
                }
                return populatedProblems;
            })
            .catch((err: any) => {
                log("Error in fetching problems:", err);
                throw err;
            });
    },
    // Inside createProblem resolver
    createProblem: async (args: { problemInput: { title: string; description: string; level: string; frequency: number; link: string; data_structure: string; date: string; userId: string } }) => {
        try {
            const { title, description, level, frequency, link, data_structure, date, userId } = args.problemInput;

            const user = await User.findById(userId);

            if (!user) {
                throw new Error("User not found");
            }

            const problem = new Problem({
                title,
                description,
                level,
                frequency,
                link,
                data_structure,
                date: new Date(date).toISOString(),
                creator: userId,
            });

            const result = await problem.save();

            user.createdProblems.push(result._id);
            await user.save();

            log("Problem saved successfully");

            return {
                _id: result._id.toString(),
                title: result.title,
                level: result.level,
                description: result.description,
                frequency: result.frequency,
                link: result.link,
                data_structure: result.data_structure,
                date: result.date.toString()
            };
        } catch (err) {
            log("Error in saving a problem: ", err);
            throw err;
        }
    },
    users: () => {
        log("Users: ")
        return User.find().populate('createdProblems')  
            .then((users: object[]) => {
                return users.map((user: { _doc: { _id: string }, _id: string, email: string, createdProblems: Array<ProblemInterface> }) =>
                    ({
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
                    })
                );
            })
            .catch((err: any) => {
                log("Error in querying a user: ", err);
                throw err;
            });
    },
    createUser: async (args: { userInput: { email: string; password: string } }) => {
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
}