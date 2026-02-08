import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'rejected', 'accepted'],
        default: 'pending'
    },
    adminNotes: {
        type: String,
    }
}, { timestamps: true });

export const Application = mongoose.model('Application', applicationSchema);
