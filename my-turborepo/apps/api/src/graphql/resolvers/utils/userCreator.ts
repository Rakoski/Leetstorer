import mongoose from "mongoose";
import { UserInterface } from "./userInterface.ts";
import { ProblemInterface } from "./problemInterface.ts";

const User = require('../../../models/user.ts')

const userCreator = async (userId: mongoose.Types.ObjectId | string): Promise<unknown> => {
    try {
        const creator = await User.findById(userId).populate('createdProblems');

        if (!creator) {
            return new Error("User not found");
        }

        const populatedProblems = creator.createdProblems as unknown as ProblemInterface[];

        return {
            _id: creator._id.toString(),
            email: creator.email,
            username: creator.username,
            createdProblems: populatedProblems.map((problem) => ({
                _id: problem._id.toString(),
                title: problem.title,
                level: problem.level,
                description: problem.description,
                user_description: problem.user_description,
                frequency: problem.frequency,
                link: problem.link,
                data_structure: problem.data_structure,
                date: problem.date.toISOString(),
            })),
        }
    } catch (err) {
        throw err;
    }
};

export default userCreator;