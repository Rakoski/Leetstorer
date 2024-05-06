import mongoose from "mongoose";
import {Document} from "mongodb";
import {ProblemInterface} from "./problemInterface.ts";

export interface UserInterface extends Document {
    _id: mongoose.Types.ObjectId[];
    username: string;
    email: string;
    isAdmin: boolean
    createdProblems: ProblemInterface[];
}
