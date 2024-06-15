const express=require("express");
const router=express.Router();

//import controller
const {CommentController}=require("../controllers/CommentController")
const {PostController,PostController2}=require("../controllers/PostController");
const {LikeController, unLikeController}=require("../controllers/LikeController");


//mapping creates
// router.get("/comment", CommentController);
router.post("/posts/create",PostController);
router.get("/posts",PostController2)
router.post("/comments/create",CommentController);
router.post("/likes/like",LikeController)
router.post("/likes/unlike",unLikeController)



// exp orts

module.exports=router;