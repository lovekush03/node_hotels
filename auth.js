const passport = require("passport");
//local-startegy also known as username password strategy
const LocalStrategy = require("passport-local").Strategy; 
const Person = require('./models/Person.js');
const Menu = require('./models/Menu.js');

passport.use(new LocalStrategy(async(username,password,done) => {
    //Authentication Logic
    try{
    //   console.log(`Received Credentials: ${username}  ${password}`);
      const user = await Person.findOne({username:username});
      if(!user){
        //Authentication Failed and return
        return done(null,false,{message:"Incorrect User name."});
      }
      
      const isMatched = await user.comparePassword(password);
      if(isMatched){
        return done(null,user);
      }
      else{
        return done(null,false,{message:"Incorrect password"});
      }
    }catch(err){
      return done(err);
    }
  }))
  

  
module.exports = passport;