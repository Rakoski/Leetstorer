import { log } from "@repo/logger";
import mongoose from "mongoose";
import any = jasmine.any;

const Problem = require('../../models/problem');
const User = require('../../models/user.ts');

const userCreator = require('./utils/userCreator.ts');

module.exports = {
    problems: async (req: {isAuth: boolean}) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized!")
        }

        try {
            const problems = await Problem.find();
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
        } catch (err) {
            log("Error in fetching problems:", err);
            throw err;
        }
    },
    createProblem: async (args: {problemInput: { title: string; description: string; level: string;
        frequency: number; link: string; data_structure: string; date: string; userId: string }},
                          req: {isAuth: boolean}) => {

        if (!req.isAuth) {
            throw new Error("Unauthorized!")
        }

        try {
            const { title, description, level, frequency, link,
                data_structure, date, userId } = args.problemInput;

            let user = null

            user = await User.findById(userId);

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
                date: result.date.toString(),
                creator: {
                    _id: user._id.toString(),
                    email: user.email,
                    createdProblems: user.createdProblems.map((problemId) => ({
                        _id: problemId.toString(),
                    })),
                },
            };
        } catch (err) {
            log("Error in saving a problem: ", err);
            throw err;
        }
    },
};
