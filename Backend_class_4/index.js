const express=require('express');
const app=express();
require("dotenv").config();
const PORT=process.env.PORT || 3000;

app.use(express.json());

const blog=require("./routes/blog")

app.use("/api/v1",blog);

const connectWithDB=require("./config/database");
connectWithDB();


app.listen(PORT,(req,res)=>{
    console.log("App started successfully");
    
})

app.get("/",(req,res)=>{
    res.send("this is home page");
})
