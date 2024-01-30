import bcrypt from "bcryptjs";
import {log} from "@repo/logger";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";

const Problem = require('../../models/problem');
const User = require('../../models/user.ts');

const userCreator = async (userId: mongoose.Types.ObjectId[] | unknown): Promise<unknown> => {
    try {
        const creator: UserInterface | null = await User.findById(userId).populate('createdProblems');

        if (!creator) {
            throw new Error("User not found");
        }

        return {
            _id: creator._id.toString(),
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

interface UserInterface {
    _doc: object[unknown];
    _id: mongoose.Types.ObjectId[];
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
};

const problemCreator = async (problemIds: Array<mongoose.Types.ObjectId[]>): Promise<Array<unknown>> => {
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

module.exports = {
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
    associateUserWithProblem: async (args: { userId: string, problemId: string }) => {
        try {
            const { userId, problemId } = args;

            let user = new User()
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