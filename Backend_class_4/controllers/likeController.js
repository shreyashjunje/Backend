const Like=require("../models/likeModel");
const Post=require("../models/postModel")

exports.LikeController= async (req,res)=>{
    try{
        const  {post,user}=req.body;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is required to create a like",
            });
        }
        const like=new Like({
            post,
            user,
        })

        const likeobj=await like.save();

        const updatedLikes= await Post.findByIdAndUpdate(post,{$push:{likes:likeobj._id}},{new:true}).populate("likes").exec();

        res.json({
            post:updatedLikes,
        });
    }

    catch(error){
        // console.error(err);
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

exports.unLikeController= async (req,res)=>{
    try{
        const  {post,like}=req.body;
        //find and delete one like from like collection
        const deletedLike= await Like.findOneAndDelete({post:post,_id:like});

        // update the post collection
        const updatedPost=await Post.findByIdAndUpdate(post,{$pull:{likes: deletedLike._id}},{new:true})
                                .populate("likes").exec();
        
             res.json({
                post:updatedPost,
             })
    }

    catch(error){
        // console.error(err);
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