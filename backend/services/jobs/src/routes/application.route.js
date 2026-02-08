import { Router } from "express";
import {
    createApplication,
    getAllApplications,
    getApplicationsByUser,
    updateApplicationStatus
} from "../controllers/application.controller.js";
// import { checkJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/applications")
    .post(createApplication);

router.route("/applications/user/me")
    .get( getApplicationsByUser);

router.route("/applications/job/:jobId")
    .get(getAllApplications);

router.route("/applications/:id")
    .put( updateApplicationStatus);

export default router;
