import {log} from "@repo/logger";
import mongoose from "mongoose";
import {ObjectId} from "mongodb";

const Problem = require('../../models/problem.ts')
const User = require('../../models/user.ts')

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
}

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

            let userFromUserSchema = new User

            userFromUserSchema.createdProblems.push(result._id);
            await userFromUserSchema.save();

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
}