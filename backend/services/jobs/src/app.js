import express from "express"
import cors from "cors"

const app = express()
app.use(express.json());

import createNewJob from "../src/routes/job.route.js"

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use("/api/v1", createNewJob)

export { app }