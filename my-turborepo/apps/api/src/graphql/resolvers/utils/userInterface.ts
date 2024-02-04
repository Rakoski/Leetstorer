import mongoose from "mongoose";
import {Document} from "mongodb";

export interface UserInterface extends Document {
    _id: mongoose.Types.ObjectId[];
    email: string;
    createdProblems: mongoose.Types.ObjectId[] | string;
}
