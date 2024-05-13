import mongoose from "mongoose";
import {Document} from "mongodb";

export interface UserInterface extends Document {
    _id: mongoose.Types.ObjectId[];
    username: string;
    email: string;
    password: string | null;
    resetPasswordToken: string | undefined;
    resetPasswordExpires: Date | number | undefined;
    createdProblems: mongoose.Types.ObjectId[] | string;
}
