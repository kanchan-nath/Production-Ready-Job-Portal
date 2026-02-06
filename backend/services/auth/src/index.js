import {app} from "./app.js"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

// app.get("/", ()=>{
//     console.log("Hello World")
// })

app.listen(3000, ()=>{
    console.log("Server is running at port 3000")
})