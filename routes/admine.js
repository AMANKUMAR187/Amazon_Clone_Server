const express = require ('express');
const jwt  = require('jsonwebtoken');
const admineroute = express.Router();
const admine  = require('../middleware/admine');
const Product = require('../model/product');

admineroute.post('/admine/addproducts',admine,async (req,res) => {
try{
      const {name,description,images,quantity,price,category} = req.body;
       let product = new Product({
        name,
        description,
        images,
        quantity,
        price,
        category,
       });
       
       product = await product.save();
       res.status(200).json(product);
}
catch(err){
    res.status(500).json({error : err.message});
}

});

admineroute.get('/admine/getallproducts',admine ,async (req,res)=>{
    try{
         const products = await Product.find({});
         res.status(200).json(products); 
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
});
admineroute.post('/admine/deleteproduct',admine,async(req,res)=>{
 try{
       const {id} = req.body;
       let product = await Product.findByIdAndDelete(id);
       res.json(product);
 }
 catch(err){
      res.status(500).json({error : err.message});
 }
});


module.exports = admineroute;