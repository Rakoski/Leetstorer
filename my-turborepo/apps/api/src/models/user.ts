import mongoose, { Document, Schema } from 'mongoose';
import dateScalar from "../utils/graphqlDateScalarType";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    isAdmin: boolean;
    createdProblems: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: dateScalar, required: false },
    isAdmin: { type: Boolean, required: true, default: false },
    createdProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }]
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;