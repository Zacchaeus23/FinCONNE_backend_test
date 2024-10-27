//Import express module
const express = require('express');

//import mongoose
const mongoose = require('mongoose');

//import todo routes
const todoRouter = require('./routes/todo');

const cors = require('cors');

//Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

//Create an instance of an express application
const app = express();
//mongodb string
const DB = "mongodb+srv://zacchaeusm873:Zacchaeus19*@cluster0.pp57o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(cors());
app.use(todoRouter);

mongoose.connect(DB).then(()=> {
  console.log('mongodb connected')
});

//Start the server and listen on the specified port
app.listen(PORT,"0.0.0.0", function(){
  console.log(`server is running on port ${PORT}`);
  
});