
//server instantiate
const express=require('express');
const app=express();

//used to parse req.body in express
const bodyParser=require('body-parser');

//specifically parse json data and add it to the request.body object
app.use(bodyParser.json());

//activate setver on port 3000
app.listen(3000,(req,res)=>{
    console.log("hello jee kaise ho sare..");
})

app.get('/',(req,res)=>{
    res.send("this is home page")
})

app.post('/api/cars',(req,res)=>{
    const {name,brand}=req.body;
    console.log(name);
    console.log(brand);
    res.send("car submitted successfully");
})

const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(() => {console.log("connection successfully")})
.catch((error) => {console.log("received an error")});