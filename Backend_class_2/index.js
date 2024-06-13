const express=require('express');
const app=express();

// load config from env file
require("dotenv").config();

const PORT =process.env.PORT || 4000;

//middleware to parse json  request body
app.use(express.json());

//import routes for todo api
const todoRoutes=require("./routes/todos");
const dbConnect = require('./config/database');

//mount todo api routes 
app.use("/api/v1",todoRoutes);

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})

//connect to the db
// const dbconnect=require("./config/database");
dbConnect();

//default route
app.get("/",(req,res) => {
    res.send(`<h1>this is Homepage body</h1>`)
})