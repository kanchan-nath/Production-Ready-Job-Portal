import express from "express"

const app = express()

import createNewJob from "../src/routes/job.route.js"

app.use("/api/v1", createNewJob)

export { app }