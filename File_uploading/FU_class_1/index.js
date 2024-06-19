const express=require('express');
require("dotenv").config();

//app create
const app=express();


//port find kiya
const PORT=process.env.PORT || 8000



//db se connect karna hai
const connectWithDB=require("./config/database")
connectWithDB();

//middleware add karna hai 
app.use(express.json());
// express does not have any method to interact with files
//  thats why we need third party package to interact with files
//npm i express-fileupload
// it stores files on server
const fileupload=require("express-fileupload");
app.use(fileupload());



//cloud se connect karna hai
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();



//api route mount karna hai 
const FileUpload=require("./routes/FileUpload");
app.use("/api/v1/upload",FileUpload)




//server activate karna hai
app.listen(PORT,(req,res)=>{
    // res.send(`App is listening at ${PORT}`)
     console.log(`app is running at ${PORT}`)
})



