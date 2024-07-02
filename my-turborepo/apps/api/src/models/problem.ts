import mongoose, { Document, Schema } from 'mongoose';

export interface IProblem extends Document {
    title: string;
    level: string;
    description: string;
    user_description?: string;
    frequency: number;
    link: string;
    data_structure: string;
    date?: string;
    creator: mongoose.Types.ObjectId;
}

const problemSchema = new Schema<IProblem>({
    title: { type: String, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    user_description: { type: String, required: false },
    frequency: { type: Number, required: true },
    link: { type: String, required: true },
    data_structure: { type: String, required: true },
    date: { type: String, required: false },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Problem = mongoose.model<IProblem>('Problem', problemSchema);
export default Problem;