import mongoose from "mongoose";
import {Document} from "mongodb";

export interface ProblemInterface extends Document {
    creator:  mongoose.Types.ObjectId[] | string;
    _id: mongoose.Types.ObjectId[];
    title: string;
    level: string;
    description: string;
    user_description: string,
    frequency: number;
    link: string;
    data_structure: string;
    date: string;
}