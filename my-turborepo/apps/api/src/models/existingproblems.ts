import mongoose, { Schema } from 'mongoose';

const ExistingProblemsSchema = new Schema({
    number_title: {
        type: String,
        required: true
    },
    existing_link: {
        type: String,
        required: true
    },
    existing_description: {
        type: String,
        required: true
    },
    existing_difficulty: {
        type: String,
        required: true
    },
    existing_video: {
        type: String,
        required: false
    },
});

const ExistingProblems = mongoose.model('Existingproblems', ExistingProblemsSchema);

export default ExistingProblems;
