import mongoose, {Schema} from 'mongoose';

const schema = mongoose.Schema

const problemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        require: true
    },
    link: {
        type: String,
        require: true
    },
    data_structure: {
        type: String,
        require: true
    },
    date: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Problem', problemSchema);