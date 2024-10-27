const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type:String,
    required:true,
  },
  id:{
    type:Number,
    required:true,
  },
  completed:{
    type:Boolean,
    required:true,
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;