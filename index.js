const express=require("express");
const dotenv=require("dotenv");

dotenv.config();

const app=express();

app.get("/",(req,res)=>{
    res.send("Hello from url shortener");
})

app.listen( process.env.PORT  ,()=>{
    console.log("Server is running on port 8989");
})