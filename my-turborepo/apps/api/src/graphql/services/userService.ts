import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { log } from "@repo/logger";

const User = require('../../models/user.ts')

interface UserInterface {
    _doc: object[unknown];
    _id: mongoose.Types.ObjectId[];
    email: string;
    createdProblems: mongoose.Types.ObjectId[];
}

class UserService {
    static async createUser(email: string, password: string) {
        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                throw new Error("User already exists!");
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                email,
                password: hashedPassword,
            });

            const result = await user.save();

            log("User created successfully");
            return { ...result, password: null, _id: result._id, email: result.email };
        } catch (err) {
            log("Error in createUser service: ", err);
            throw new Error("Error in creating user");
        }
    }

    static async getUser(userId: string) {
        try {
            let user = new User()

            user = await User.findById(userId).populate("createdProblems");

            if (!user) {
                throw new Error("User not found");
            }

            return {
                _id: user._id.toString(),
                email: user.email,
                createdProblems: user.createdProblems.map((problem: any) => ({
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
    }

    static async associateUsersWithProblems()
}

export default UserService;
