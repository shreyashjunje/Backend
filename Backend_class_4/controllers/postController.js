    const Post=require("../models/postModel");

    exports.PostController= async (req,res)=>{
        try{
            const {title,body}=req.body;

            if (!title || !body) {
                return res.status(400).json({
                    success: false,
                    message: "Title and body are required",
                });
            }

            const response=await Post.create({title,body});

            // res.json({
            //     resposnse,
            // })

            res.status(200).json(
                {
                    success:true,
                    data:response,
                    message:"post created successfully",
                }
            );

        }
        catch(error){
            // console.error(error);
            console.log(error);
            res.status(500).json(
                {
                    success:false,
                    data:"internal server error",
                    message:error.message,
                }
            );
        }
    }

    exports.PostController2= async (req,res)=>{
        try{


            const response=await Post.find({}).populate("likes").populate("comments").exec();
            // res.json({
            //     posts,
            // })

            res.status(200).json(
                {
                    success:true,
                    data:response,
                    message:"fetched all posts",
                }
            );

        }
        catch(error){
            // console.error(error);
            console.log(error);
            res.status(500).json(
                {
                    success:false,
                    data:"internal server error",
                    message:error.message,
                }
            );
        }
    }