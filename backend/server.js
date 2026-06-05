const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const app = express()
require("./config/db")

const authRoute=require("././Routes/authRoute")
const employeeRoute=require("././Routes/employeeRoute")
const cors = require("cors")
const corsOption = {
    origin: [
        'http://localhost:3000',
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}

app.use(express.json())
app.use(cors(corsOption))

app.use("/api/auth",authRoute)
app.use("/api/employee",employeeRoute)



app.listen(process.env.PORT  || 5000, () => {
    console.log("server is running on port 5000")
})