// const express=require("express");
// const dotenv=require("dotenv")

import express from "express";
import dotenv from "dotenv"
const app=express();
dotenv.config();
import cookieParser from 'cookie-parser'
import authRouter from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/conntectToMongoDB.js";

const PORT= process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRouter)
app.use("/api/message", messageRoutes)
app.use("/api/user", userRoutes)



app.get("/",(req,res)=>{
    res.send("Hello Rajan ChaubeyS");
    
})

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
})