const express=require('express');
const router=express.Router();

const {signUp,login}=require("../controllers/Auth");
const {auth,isStudent, isAdmin}=require("../middlewares/auth");


router.post("/signup",signUp);
router.post("/login",login);

//protected routes 
router.get("/student", auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route of student ",  
    })
})
router.get("/admin", auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route of admin ",  
    })
})

module.exports=router;


