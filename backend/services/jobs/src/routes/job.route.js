import { Router } from "express";
import {
    createNewJob,
    getAllJobs,
    deleteJob
} from "../controller/job.controller.js";

const router = Router();

router.route("/jobs")
    .post(createNewJob)
    .get(getAllJobs)
    .delete(deleteJob)

router.route("/jobs/:id")
    .delete(deleteJob)

export default router;
