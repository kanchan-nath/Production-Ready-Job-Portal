import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    skills: [String],
    postedDate: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date,
    },
});

export const Job = new mongoose.model("Job", jobSchema)