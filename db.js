const mongoose= require("mongoose");

const connectToDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,()=>{
            console.log("conneted to DB successfully");
        })
    }catch(error){
        console.log("Error while connecting to DB", error);
    }
}


export default connectToDB;