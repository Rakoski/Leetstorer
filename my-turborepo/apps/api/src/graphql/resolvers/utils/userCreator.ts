import mongoose from "mongoose";
import {UserInterface} from "./userInterface.ts";
import {ProblemInterface} from "./problemInterface.ts";

const User = require('../../../models/user.ts')

const userCreator = async (userId: mongoose.Types.ObjectId[] | unknown): Promise<unknown> => {
    try {
        const creator: UserInterface = await User.findById(userId).populate('createdProblems');

        if (!creator) {
            throw new Error("User not found");
        }

        return {
            _id: creator._id.toString(),
            email: creator.email,
            createdProblems: typeof creator.createdProblems !== "string" ? creator.createdProblems?.map((problem: ProblemInterface) => ({
                _id: problem._id.toString(),
                title: problem.title,
                level: problem.level,
                description: problem.description,
                frequency: problem.frequency,
                link: problem.link,
                data_structure: problem.data_structure,
                date: problem.date,
            })) : null,
        }
    } catch (err) {
        throw err;
    }
};

module.exports = userCreator