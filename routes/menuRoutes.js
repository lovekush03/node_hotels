const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');

//POST Method for posting the menu item

router.post('/',async(req,res)=>{
    try{
      const data = req.body;
      const newItem = new Menu(data);
      const response = await newItem.save();
      console.log("Menu Item Saved Successfully");
      res.status(200).json(response);
    }catch(err){
      console.log("Error is: " + err);
      res.status(500).json({error:'Internal Server Error'});
    }
})
  
//Get Method to get all menu Items
router.get('/',async(req,res) => {
    try{
        const response = await Menu.find();  //MongoDb command to print all records in DB
        console.log("Data Fetched Successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
        }
})

//Get Method to get menu items according to taste
router.get('/:taste',async(req,res)=>{
    try{
        const tasteType = req.params.taste;
        if(tasteType == 'Sweet' || tasteType == 'Sour' || tasteType == 'Spicy'){
            const response = await Menu.find({taste:tasteType});
            console.log("Data Fetched Successfully");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid Taste Type'});
        }
    }catch(err){
        console.log("Error is: "+err);
        res.status(500).json({error:"Internal Server Error"});
    }
})
  
module.exports = router;
