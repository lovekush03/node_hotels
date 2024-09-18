const express = require('express')
const app = express()
const db = require('./db.js');
require("dotenv").config();
const PORT = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body
const Person = require('./models/Person.js');
const Menu = require('./models/Menu.js');
app.get('/', function (req, res) {
  res.send('Hello  how may i help you');
})


//Importing router files
const personRoutes = require('./routes/personRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');

//Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(PORT , ()=>{
  console.log(`Server is listening at port ${PORT}`);
})