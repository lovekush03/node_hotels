const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        // default:2, 
    },
    taste:{
        type:String,
        enum:['Spicy','Sweet','Sour'],
        required:true,
    },
    is_drink:{
        type:Boolean,
        default:false,
    },
    ingredients:{
        type:[String],   //Array of String
        default:[],
    },
    num_sales:{
        type:Number,
        default:0,
    }
})
const Menu = mongoose.model('Menu',menuSchema);

module.exports = Menu;