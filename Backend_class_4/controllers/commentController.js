const Comment=require("../models/commentModel");
const Post=require("../models/postModel");

exports.CommentController= async (req,res)=>{
    try{
        //...Aprroach 1..//
        // const {post,user,body}=req.body;

        // const response=await Comment.create({post,user,body});

        // res.status(200).json(
        //     {
        //         success:true,
        //         data:response,
        //         message:"comment created successfully",
        //     }
        // );


        //Approach 2
        //fetched all the data
        const {post,user,body}=req.body;
        //create comment object 
        const comment=new Comment({
            post,
            user,
            body,
        })

        //save the new comment into the database
        const savedComment=await comment.save();


        // find the post by id then update the comment array by adding new comment
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments: savedComment._id}},{new:true})
                                .populate("comments")
                                
                                //populate the comments array with comment documents 
                                .exec();

        res.json({
            post:updatedPost,
        });
    }                           

    catch(error){
        console.error(error);
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
