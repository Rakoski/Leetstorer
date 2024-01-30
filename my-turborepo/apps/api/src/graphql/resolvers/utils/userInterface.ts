import mongoose from "mongoose";

export interface UserInterface {
    _doc: object[unknown];
    _id: mongoose.Types.ObjectId[];
    email: string;
    createdProblems: mongoose.Types.ObjectId[] | string;
}
