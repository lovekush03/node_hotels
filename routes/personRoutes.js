const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')
// here instead of writing app. we write router.
/*
app.post('/person',(req,res)=>{
  const data = req.body  //assuming request body contain the person

  //create a new person document using mongoose model
  /*METHOD-1 - 
  const newPerson = new Person();
  newPerson.name = data.name;
  newPerson.age = data.age;
  newPerson.mobile = data.mobile;
  newPerson.email = data.email;
  newPerson.address = data.address;
  */
  /* METHOD - 2 */
  //const newPerson = new Person(data);

  //Save the new Person to the database
  /* Method - 1 to save - But nowadays it is deprecated as callbacks reduce readability , rather we use async await
  newPerson.save((error, savedPerson)=>{
    if(error){
      console.log('Error saving person: ',error);
      res.status(500).json({error:'Internal Server Error'});
    }
    else{
      console.log("Data Saved Successfully");
      res.send(200).json(savedPerson);
    }
  }) */
 /* Method - 2 to save - using async await try catch*/
  
//});



router.post('/', async(req,res) => {

    try{
      const data = req.body;
      
      const newPerson = new Person(data);
    
      //Save the new Person to the database
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log("Error is: " + err);
      res.status(500).json({error:'Internal Server Error'});
    }
  
  
})
  
//Get Method to get all the person
router.get('/',async(req,res) => {
    try{
      const response = await Person.find();
      console.log("Data Fetched Successfully");
      res.status(200).json(response);
    }catch(err){
      console.log("Error is: " + err);
      res.status(500).json({error:'Internal Server Error'});
    }
})
  
  //Get Method to get all the Chef Data
  /*
  app.get('/person/chef',async(req,res) => {
    try{
      const response = await Person.find({'work':'chef'});
      console.log("Data Fetched Successfully");
      res.status(200).json({response});
    }catch(err){
      console.log("Error is: " + err);
      res.status(500).json({error:'Internal Server Error'});
    }
  })
  
  */
  
  //Get Method to get Persons according to their work
  // ":" -> makes work a variable / dynamically entered field
  // work can be chef, waiter , manager etc
  //end point will be adjusted accordingly
router.get('/:work',async(req,res) => {
    try{
      const workType = req.params.work;  //Extract the work from the URL parameter
      //Validation of any sort 
      if(workType == "chef" || workType == "manager" || workType == "waiter"){
          const response = await Person.find({work:workType});
          console.log("Data Fetched");
          res.status(200).json(response);
      }else{
        res.status(404).json({error:'Invalid Work Type'});
      }
  
    }catch(err){
      console.log("Error is: "+err);
      res.status(500).json({error : 'Internal Server error'});
    }
})

router.put('/:id',async(req,res) => {
    try{
        const personId = req.params.id;  //Extract the id from the URL parameter
        const updatedPersonData = req.body;     //Updated data for the person
        
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new :true,  //Returns the updated document
            runValidators:true, //Run Mongoose validation passed in schema of model
        });

        //If their is no document present with passed id
        if(!response){
            return res.status(404).json({error:'Person Not Found'});
        }
        console.log("Data Updated Successfully");
        res.status(200).json(response);
    }catch(err){
        console.log("Error is: "+err);
        res.status(500).json({error : 'Internal Server error'});
    }
})
  
module.exports = router;