const mongoose=require('mongoose');

const connectWithDB=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB connected successfully"))
    .catch((error)=>{
        console.log("Db connection failed");
        console.error(error);
        process.exit(1);
    })
}

module.exports=connectWithDB;