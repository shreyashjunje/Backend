const mongoose=require('mongoose');

require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // console.log('Connection is successful');

    })

    .then(()=>{console.log("connection is successful")})
    .catch((error)=>{
        console.log("error occured");
        console.error(error.message);
        //

        //iska kai matlab hai
        process.exit(1);
    })
}

module.exports=dbConnect;