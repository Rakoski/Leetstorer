import ExistingProblems from "../../models/existingproblems.ts";
import {log} from "@repo/logger";

const existingProblemsResolver = {
    existingproblems: async (args: object, req: {isAuth: boolean, isAdmin: boolean}) => {
        if (!req.isAuth || !req.isAdmin) {
            throw new Error("Unauthorized!")
        }

        try {
            let existingProblems = null

            existingProblems = await ExistingProblems.find();

            if (!existingProblems) {
                return new Error("Existing Problems not found")
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
    createExistingProblems: async (args: {existingProblemsInput: { number_title: string, existing_link: string,
                                           existing_description: string, existing_difficulty: string, existing_video: string }},
                                   req: {isAuth: boolean}) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized!");
        }

        try {
            const { number_title, existing_link, existing_description, existing_difficulty, existing_video } =
                args.existingProblemsInput;

            const existingProblem = new ExistingProblems({
                number_title,
                existing_link,
                existing_description,
                existing_difficulty,
                existing_video,
            });

            let result = null

            result = await existingProblem.save();

            if (result) {
                return {
                    _id: result._id.toString(),
                    number_title: result.number_title,
                    existing_link: result.existing_link,
                    existing_description: result.existing_description,
                    existing_difficulty: result.existing_difficulty,
                    existing_video: result.existing_video,
                };
            }
        } catch (err) {
            log("Error in saving an existing problem: ", err);
            throw err;
        }
    },
    clearExistingProblems: async (args: unknown, req: { isAuth: boolean }) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized!")
        }

        try {
            const result = await ExistingProblems.deleteMany({});
            return "Existing problems collection cleared successfully.";
        } catch (err) {
            console.error("Error in clearing existing problems:", err);
            throw err;
        }
    }
};

export default existingProblemsResolver;