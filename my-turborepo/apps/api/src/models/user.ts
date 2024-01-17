import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdProblems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Problem'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);