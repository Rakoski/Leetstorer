import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    createdProblems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Problem',
        },
    ],
});

module.exports = mongoose.model('User', userSchema);