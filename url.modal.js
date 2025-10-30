const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        unique:[true,"This name is already taken"]
        ,
        longURL:{
            type:string,
            required:[true,"Long url is required"],
            trim:true,
            unique:[true
                ,"This long url is already present"
            ]

        },
        shortURL:{
            typr:string,
            unique:true,
        }
    }
});


const longToShortURL=mongoose.model("long_url_to_short_url",urlSchema);


export default longToShortURL;
