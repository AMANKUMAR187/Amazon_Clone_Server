const jwt = require('jsonwebtoken');
const User = require('../model/user');

const admine = async (req,res,next) => {
    try{
          const token  = req.header('x-auth-token');
          if(!token)
          return res.status(400).json({msg:"No auht token, access denied"});

          const varified  = jwt.verify(token , "passwordkey");
          if(!varified) return res.status(400).json({msg : "token verification fail"});
           const user = await User.findById(varified.id);
           if(user.type == 'user'|| user.type =='seller'){
            res.status(400).json({msg : 'you are not an admine'});
           }           
 
          req.user = varified.id;
          req.token = token;
          next();
    }
    catch(err){
      res.status(500).json({error  : err.message});
    }
}

module.exports = admine;