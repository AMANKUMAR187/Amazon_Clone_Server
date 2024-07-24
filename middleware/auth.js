const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {

    try{
        
          const token  = req.header('x-auth-token');
          if(!token)
          return res.status(400).json({msg:"No auht token, access denied"});
          const varified  = jwt.verify(token , "passwordkey");
          if(!varified) return res.status(400).json({msg : "token verification fail"});
          req.user = varified.id;
          req.token = token;
          next();
                                                                                     
      }

    catch(err){

          res.status(500).json({error  : err.message});

    }

  }

module.exports = auth;