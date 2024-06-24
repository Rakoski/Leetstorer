import { log } from "@repo/logger";
import Problem from "../../models/problem";
import User from "../../models/user";
import userCreator from "./utils/userCreator";

interface ProblemInput {
    title: string;
    description: string;
    user_description: string;
    level: string;
    frequency: number;
    link: string;
    data_structure: string;
    date: string;
    userId: string;
}

interface AuthRequest {
    isAuth: boolean;
    isAdmin?: boolean;
}

export const ProblemResolvers = {
    problems: async (_: any, __: any, { req }: { req: AuthRequest }): Promise<object[]> => {
        if (!req.isAuth || !req.isAdmin) {
            throw new Error("Unauthorized");
        }

        try {
            const problems = await Problem.find();
            const populatedProblems: object[] = [];

            for (const problem of problems) {
                const populatedUserCreator = await userCreator(problem.creator);
                populatedProblems.push({
                    ...problem,
                    _id: problem._id.toString(),
                    date: problem.date?.toString() || "",
                    creator: populatedUserCreator,
                });
            }

            return populatedProblems;
        } catch (err) {
            log("Error in fetching problems:", err);
            throw err;
        }
    },
    createProblem: async (args: {problemInput: { title: string; description: string; user_description: string;
                                  level: string; frequency: number; link: string; data_structure: string; date: string; userId: string }},
                          req: {isAuth: boolean}) => {

        if (!req.isAuth) {
            throw new Error("Unauthorized!");
        }

        try {
            const { title, description, user_description, level, frequency, link, data_structure, date, userId } = args.problemInput;

            const user = await User.findById(userId);

            if (!user) {
                return new Error("User not found");
            }

            const problem = new Problem({
                title,
                description,
                user_description,
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

            return {
                _id: result._id.toString(),
                title: result.title,
                level: result.level,
                description: result.description,
                frequency: result.frequency,
                link: result.link,
                data_structure: result.data_structure,
                date: result.date ? result.date.toString() : "",
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
    editProblem: async (
        args: {problemInput: { title: string; description: string; user_description: string;
                level: string; frequency: number; link: string; data_structure: string; date: string; userId: string },
               problemId: string,
        },
        req: {isAuth: boolean}
    ) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized!");
        };

        try {
            const problem = await Problem.findById(args.problemId);

            if (!problem) {
                return new Error("Problem not found");
            }

            const { title, description, user_description, level, frequency, link, data_structure, date } = args.problemInput;

            if (title) problem.title = title;
            if (description) problem.description = description;
            if (user_description) problem.user_description = user_description;
            if (level) problem.level = level;
            if (frequency) problem.frequency = frequency;
            if (link) problem.link = link;
            if (data_structure) problem.data_structure = data_structure;
            if (date) problem.date = new Date(date).toISOString();

            const updatedProblem = await problem.save();

            log("Problem updated successfully");

            return {
                _id: updatedProblem._id.toString(),
                title: updatedProblem.title,
                level: updatedProblem.level,
                description: updatedProblem.description,
                user_description: updatedProblem.user_description,
                frequency: updatedProblem.frequency,
                link: updatedProblem.link,
                data_structure: updatedProblem.data_structure,
                date: updatedProblem.date?.toString() || "",
                creator: {
                    _id: updatedProblem.creator ? updatedProblem.creator.toString() : "",
                },
            };
        } catch (err) {
            log("Error in updating a problem: ", err);
            throw err;
        }
    },
};

export default ProblemResolvers;