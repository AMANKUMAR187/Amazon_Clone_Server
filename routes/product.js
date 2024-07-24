const express = require('express');
const productroute = express.Router();
const auth = require('../middleware/auth');
const Product = require('../model/product');


productroute.get('/api/product',auth, async(req,res)=>{
 try{
     const product = await Product.find({category : req.query.category});
     console.log(product);
     res.status(200).json(product);
 }
 catch(err){
    res.status(500).json({msg : err.message});
 }

});

module.exports = productroute;