import {
    createNewJob
} from "../controller/job.controller.js";
import { Router } from "express"

const router = Router()

router.route("/jobs").post(createNewJob)

export default router