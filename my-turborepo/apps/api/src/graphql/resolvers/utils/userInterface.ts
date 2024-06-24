import { Document, ObjectId } from "mongodb";

export interface UserInterface extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | null;
    createdProblems: ObjectId[];
    isAdmin: boolean;
}