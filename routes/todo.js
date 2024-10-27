const express = require('express');
const Todo = require('../models/todo');
const todoRouter = express.Router();

//Post task
todoRouter.post('/tasks', async (req,res) => {
  try {
    const {title, id, completed} = req.body;
    //Find if a title exist
    if(!title||title.trim == ""){
      return res.status(400).json({msg:"The todo must have a title"});
    }

    const newTodo = new Todo({ title, id, completed });
        await newTodo.save();
        res.status(201).send(newTodo);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

//Retrieve task
todoRouter.get('/tasks', async(req,res) => {
  try {
    const todo = await Todo.find();
    return res.status(201).json(todo);
  } catch (e) {
    res.status(500).json({erroe:e.message})
  }
});

//Updating task
todoRouter.put('/tasks/:id', async(req,res) => {
  try {

   const {id} = req.params;
   const {title, completed} = req.body;

   const updateTodoId = await Todo.findByIdAndUpdate(
    id,
    {title, completed},
    {new:true},
   );

   if(!updateTodoId){
    return res.status(404).json({error:"Todo not found"});
   }

   return res.status(200).json(updateTodoId);


  
  } catch (e) {
    res.status(500).json({error: "Something went wrong"});
  }
});
//Deleting task
todoRouter.delete('/tasks/:id', async(req,res)=> {
  try {
    const {id} = req.params;

    const deleteTodo = await Todo.findByIdAndDelete(id);

    if(!deleteTodo) {
      return res.status(404).json({error: "Todo not found"});
    }

    return res.status(200).json({msg: "Todo deleted successfully"});
  } catch (e) {
    res.status(500).json({error: "Something went wrong"});
  }
})

module.exports = todoRouter;