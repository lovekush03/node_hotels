//file respnsible fro estabhishing connection with database
const mongoose = require('mongoose');
require("dotenv").config();

//Define the MongoDB connection URL
const mongoURL = process.env.DB_URL;

//Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//Get the default connection
//Mongoose maintain a default connection object representing the mongoDb connection.
const db = mongoose.connection;

//Define event Listener for database Connection
//connected disconnected error : is already listed keyword event 
db.on('connected',()=>{
    console.log("MongoDB connected successfully");
});

db.on('error',(err)=>{
    console.log("MongoDb Connection error",err);
});

db.on('disconnected',() =>{
    console.log("MongoDb Disconnected");
});


//Export the database Connection
module.exports = db;