import { asyncHandeler } from "../../../utils/asyncHandeler.js";
import { Job } from "../models/job.models.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

const getAllJobs = asyncHandeler(async (req, res) => {
    const jobs = await Job.find().sort({ postedDate: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});

const createNewJob = asyncHandeler(async (req, res) => {
    const {
        title,
        description,
        company,
        location,
        salary,
        jobType,
        experience,
        skills,
        deadline
    } = req.body;

    const job = await Job.create({
        title,
        description,
        company,
        location,
        salary,
        jobType,
        experience,
        skills,
        deadline
    });

    return res
        .status(201)
        .json(new ApiResponse(201, job, "New Job added"));
});

const deleteJob = asyncHandeler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
        return res
        .status(404)
        .json(new ApiResponse(404, null, "Job not found"));
    }

    return res
    .status(200)
    .json(new ApiResponse(200, null, "Job deleted successfully"));
});

export {
    createNewJob,
    getAllJobs,
    deleteJob
};
