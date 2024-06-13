//import the model
const Todo = require("../models/Todo");


// define route handler

exports.getTodos = async(req,res) =>{
    try{
        const todos=await Todo.find({});
        res.status(200).json(
            {
                success:true,
                data:todos,
                message:"Entire todo is fetched ",
            }
        );
    }
    catch(err){
       console.error(err);
       res.status(500).json(
        {
            success:false,
            data:"server error",
            message:err.message,
        }
    );
    }
}
exports.getTodoById = async(req,res) =>{
    try{
        const id =req.params.id;
        const todo=await Todo.findById({_id: id});

        if(!todo){
            return res.status(404).json(
                {
                    success:false,
                    data:"there is no todo",
                    // message:err.message ,
                }
               
            )
        }
        res.status(200).json(
            {
                success:true,
                data:todo,
                message:"we fetched the todo by id",
            }
        );
    }
    catch(err){
       console.error(err);
       res.status(500).json(
        {
            success:false,
            data:"server error",
            message:err.message,
        }
    );
    }
}