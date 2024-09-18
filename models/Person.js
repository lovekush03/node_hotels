const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})

personSchema.pre('save', async function(next){
    const person = this;

    //Hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) return next();
    try{
        //hash password generator
        const salt = await bcrypt.genSalt(10);

        //hash password generation
        const hashedPassword = await bcrypt.hash(person.password,salt);

        //Override the plain password with the hashed password
        person.password = hashedPassword;

        next();
    }catch(err){
        return next(err);
    }
    
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
    }catch(err){
        throw err;
    }
}
//Create Person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;
