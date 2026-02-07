import {app} from "./app.js"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

app.get("/", (req, res)=>{
    console.log("Hello World")
    res.send("Hello World!")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at Port ${process.env.PORT}`)
})