import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary";
dotenv.config();

import { connectDB } from "./config/db.js"

import userRouter from "./routes/userRoute.js"
import imageRoute from "./routes/imageRoutes.js"
const app = express();

// app.use(cors({
//     origin: [process.env.ORIGIN],
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
//     credentials: true
// }));


cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/users", userRouter)
app.use("/api/images", imageRoute)

const port = process.env.PORT || 5000;

const server = app.listen(port, async () => {
    try {
        await connectDB();
        console.log(`server listening on port ${port}`);

    } catch (error) {
        console.log("internal server error: " + error.message);
    }
})


