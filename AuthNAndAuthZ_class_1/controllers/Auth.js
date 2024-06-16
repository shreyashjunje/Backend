const bcrypt=require('bcrypt');
const User=require("../models/user")

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