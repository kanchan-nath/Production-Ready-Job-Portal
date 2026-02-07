import { asyncHandeler } from "../../../utils/asyncHandeler.js";
import mongoose from "mongoose";
import { Job } from "../models/job.models.js";
import { ApiResponse } from "../../../utils/ApiResponse.js"

const createNewJob = asyncHandeler(async (req, res) => {
    const { title, description, company, location, salary, jobType, experience, skills, deadline } = req.body;

    const jobs = await Job.create({
        title,
        description,
        company,
        location,
        salary,
        jobType,
        experience,
        skills,
        deadline
    })

    return res
        .status(201)
        .json(new ApiResponse(201, jobs, "New Job added"))
})

export {
    createNewJob
}