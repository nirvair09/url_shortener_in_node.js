const express=require("express");
const dotenv=require("dotenv");
const { default: connectToDB } = require("./db");
const { default: longToShortURL } = require("./url.modal");

dotenv.config();

const app=express();

connectToDB();

app.get("/",(req,res)=>{
    res.send("Hello from url shortener");
})


app.post("/",async(req,res)=>{
    try {

        const {name,url} = req.body||null;

        if(!name || !url){
            return res.status(400).json({
                status:"Failed",
                message:"Name and URL must be provided",
            });
        };

        const timeStamp=Date.now();

        const mongoData={
            name,
            longURL:url,
            shortURL:"http://short.ly/"+(name).toString(),
        }

        const doc = await longToShortURL.create(mongoData);

        if(!doc){
            return res.status(400).json({
                status:"Failed creation of url at dataBase",
                message:"Error occured while creating short URL",
            });
        }else{
            return res.status(200).json({
                status:"Success",
                message:"Short URL created successfully",
                shortURL:doc.shortURL,
            })
        }
        
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({
            status:"Failed",
            message:"Internal Server Error",
        })
    }
});


app.get("/:shortURL", async(req,res)=>{
    try {

        const {shortURL}=req.params || null;

        if(!shortURL){
            return res.status(400).json({
                status:"Failed",
                message:"Short URL must be provided"
            })        
        };

        const result = await longToShortURL.findOne({
            shortURL:"http//short.ly"+shortURL
        })

        if(!result){
            return res.status(400).json({
                status:"Failed",
                message:"No matching URL found",
            })
        }

        
        return res.status(302).redirect(result.longURL );
        
    } catch (error) {
        console.log("Error while redirecting to long URL", error);

        res.status(500).json({
            status:"Failed",
            message:"INernal Server Error",
        })
    }
})

app.listen( process.env.PORT  ,()=>{
    console.log("Server is running on port 8989");
})