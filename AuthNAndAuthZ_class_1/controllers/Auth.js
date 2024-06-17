const bcrypt=require('bcrypt');
const User=require("../models/user")
const jwt=require('jsonwebtoken');
// const { options } = require('../routes/User');
require("dotenv").config();
//signUp route handler
exports.signUp=async (req,res)=>{

    try{

        //fetched all the data from req body
        const {name,email,password,role}=req.body;

        //check if user already exist in database
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"this email already exists",
            })

        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10)

        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"error in hashing password",
            })
        }

        //create entry for use

        const user=await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:"entry created successfully",
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user can not be registred please another email",
        })
    }


}


exports.login=async (req,res)=>{
    try{

        //fetch all the data 
        const {email,password}=req.body;

        //check if data os valid or not
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill all details carefully"
            })
        }

        //check for registred user
        const user=await User.findOne({email});

        //check if email is registred or not
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not registred",
            })
        }

        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
        };

        //verify password and generate jwt token
        if(await bcrypt.compare(password,user.password)){
            //password match'
            let token=jwt.sign(payload,process.env.JWT_SECRET,
                                                {
                                                    expiresIn:"2h"    
                                                }
            );

            user.token=toObject();
            user.password=undefined;

            const options={
                expires:new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"user logged in successfully",
                token,
                user,
            })
        }
        else{
            //password do not matched
            return res.status(402)/json({
                success:"false",
                message:"password incorrect",
            })
        }


    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"login failure"
        })

    }
}