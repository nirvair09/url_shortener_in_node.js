const express=require("express");
const dotenv=require("dotenv");
const { default: connectToDB } = require("./db");

dotenv.config();

const app=express();

connectToDB();

app.get("/",(req,res)=>{
    res.send("Hello from url shortener");
})

app.listen( process.env.PORT  ,()=>{
    console.log("Server is running on port 8989");
})