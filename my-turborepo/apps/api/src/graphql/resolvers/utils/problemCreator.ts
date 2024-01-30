import mongoose from "mongoose";
import {ProblemInterface} from "./problemInterface.ts";

const Problem = require('../../../models/problem.ts')
const userCreator = require('./userCreator.ts')

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

module.exports = problemCreator