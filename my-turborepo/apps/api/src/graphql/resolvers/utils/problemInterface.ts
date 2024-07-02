import { Document, ObjectId } from "mongodb";

export interface ProblemInterface extends Document {
    _id: ObjectId;
    creator: ObjectId;
    title: string;
    level: string;
    description: string;
    user_description: string;
    frequency: number;
    link: string;
    data_structure: string;
    date: Date;
}