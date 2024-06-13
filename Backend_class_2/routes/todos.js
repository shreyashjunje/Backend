const express=require("express");
const router=express.Router();

//import controller
const {createTodo}=require("../controllers/createTodo");
const {getTodos,getTodoById}=require("../controllers/getTodos");
const{updateTodos}=require("../controllers/updateTodos");


//define api route
router.post("/createTodo",createTodo);
router.get("/getTodos",getTodos);
router.get("/getTodosById/:id",getTodoById);
router.put("/updateTodos/:id",updateTodos);

module.exports= router;