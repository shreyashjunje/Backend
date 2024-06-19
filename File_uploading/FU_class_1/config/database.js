const mongoose=require('mongoose');
require("dotenv").config();

const connectWithDB= ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{console.log("app is connected successfully")})
    .catch((error)=>{
        console.log("db connection issue");
        console.error(error);
        process.exit(1);
    })
}

module.exports=connectWithDB;