const express  = require('express');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const auth = require('../middleware/auth');

const authrouter = express.Router();

authrouter.post('/api/signup',async(req,res)=>{
try{
    const {email,name,password} = req.body;
    
    const existuser = await User.findOne({email});
       if(existuser){
        return res.status(400).json({msg: "user already exists! "}); // client erroe code 400
    
       }
       const hashedpass  = await bcrypt.hash(password,8);     
       let user = new User({
        email,
        name,
        password:hashedpass,
       });
       user = await user.save();
       res.json(user);
    
}catch(err){
    res.status(500).json({msg: err.message});
}
})

authrouter.post('/api/signin',async (req,res) => {
    try{
       const {email , password} = req.body;
       const user  = await User.findOne({email});
       if(!user){
        return res.status(400).json({msg: 'user not fount'});
       } 
       const ismatch =   await bcrypt.compare(password,user.password);
       if(!ismatch){
        return res.status(400).json({msg: 'wrong password entered! '});
       }
       const  token  = jwt.sign({id:user._id},"passwordkey");
       res.json({token, ...user._doc});    
    }
     
    catch(err){
    res.status(500).json({msg: err.message});
    console.log(err.message);
    }
});


authrouter.post('/tokenisvalid',async(req,res)=>{
try{
const token = req.header('x-auth-token');
if(!token) return res.json(false);
const varified = jwt.verify(token,'passwordkey');
if(!varified) return res.json(false);

const user  =await User.findById(varified.id);

if(!user)  return res.json(false);
  res.json(true);
}
catch(err){
  res.status(500).json({error : err.message});
  console.log(err.message);
}

});

authrouter.get('/' , auth, async(req,res) => {
    //console.log(req.user);
    const user  = await User.findById(req.user);
   // console.log(user);
    res.json({...user._doc, token : req.token});
    
})

 

module.exports = authrouter; 