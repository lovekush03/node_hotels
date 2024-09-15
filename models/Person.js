const mongoose = require('mongoose');

//Define a Person schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true    //making name field mandatory
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum:['chef','manager','waiter'],
        required:true
    },
    mobile:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
})


//Create Person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;
