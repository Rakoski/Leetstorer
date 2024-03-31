import ExistingProblems from "../../models/existing_problems.ts";
import {log} from "@repo/logger";

const existingProblemsResolver = {
    existingProblems: async (args, req: {isAuth: boolean}) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized!")
        }

        try {
            let existingProblems = null

            existingProblems = await ExistingProblems.find();

            if (!existingProblems) {
                return new Error("Existing Problem not found")
            }

            return existingProblems.map(problem => ({
                _id: problem._id.toString(),
                number_title: problem.number_title,
                existing_link: problem.existing_link,
                existing_description: problem.existing_description,
                existing_difficulty: problem.existing_difficulty,
                existing_video: problem.existing_video
            }));
        } catch (err) {
            console.error("Error in fetching existing problems:", err);
            throw err;
        }
    },
    createExistingProblem: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized!");
        }

        try {
            const { number_title, existing_link, existing_description, existing_difficulty, existing_video } = args.problemInput;

            const existingProblem = new ExistingProblems({
                number_title,
                existing_link,
                existing_description,
                existing_difficulty,
                existing_video,
            });

            const result = await existingProblem.save();

            return {
                _id: result._id.toString(),
                number_title: result.number_title,
                existing_link: result.existing_link,
                existing_description: result.existing_description,
                existing_difficulty: result.existing_difficulty,
                existing_video: result.existing_video,
            };
        } catch (err) {
            log("Error in saving an existing problem: ", err);
            throw err;
        }
    },
};

export default existingProblemsResolver;
