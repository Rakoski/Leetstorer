import mongoose from "mongoose";

export interface ProblemInterface {
    creator:  mongoose.Types.ObjectId[] | string;
    _doc: object[unknown];
    _id: mongoose.Types.ObjectId[];
    title: string;
    level: string;
    description: string;
    frequency: number;
    link: string;
    data_structure: string;
    date: string;
}