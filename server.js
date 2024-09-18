const express = require('express')
const app = express()
const db = require('./db.js');
require("dotenv").config();
const passport = require("./auth.js");

const PORT = process.env.PORT;

//Middleware Function
const logUsers = (req,res,next) => {
  console.log(`${new Date().toLocaleString()} Request made at: ${req.originalUrl}`);
  next(); //Move to the next phase
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body
const Person = require('./models/Person.js');
const Menu = require('./models/Menu.js');

app.use(logUsers);   // Use the middleWare on each and Every Route Created.

//Initialize Passport
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local",{session:false});

app.get('/', logUsers ,function (req, res) {
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