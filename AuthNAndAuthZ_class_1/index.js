const express=require('express');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT || 8000

app.use(express.json())

const connectWithDB=require("./config/database");
connectWithDB();

//instead of above we can write this
// require("./config/database").connectWithDB();


//route import and mount
const User=require("./routes/User")
app.use("/api/v1",User)


app.listen(PORT,(req,res)=>{
    console.log(`App is listening at ${PORT}`)
})

