//auth, isStudent,isAdmin middleware

const jwt=require("jsonwebtoken");
require("dotenv").config();


exports.auth=(req,res,next)=>{
    try{
        //extract jwt token
        //pending:other ways to fetch
        const token=req.body.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing",
            });
        }

        //verify the token
        try{

            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);

            // why this -> bcoz we store user info to verify the role becoz info are present in payload 
            req.user=payload;

        }catch(error){
            return res.status(401).json({
                success:false,
                message:"invalid token",
            })

        }
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"somethig went wrong ,while verifying the token"
        });
    }
}

exports.isStudent=(req,res,next)=>{
    try{

        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for student"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        });
    }
}

exports.isAdmin=(req,res,next)=>{
    try{

        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for admin"
            })
        }
        next(); 

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        });
    }
}