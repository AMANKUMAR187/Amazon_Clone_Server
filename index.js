const express  = require('express');
const mongoose = require('mongoose');
 
//import from other file....
const authrouter = require('./routes/auth.js'); 
const admineroute = require('./routes/admine.js');
const productroute  = require('./routes/product.js');

const db ='mongodb+srv://amanorg:i0MWm76xKJgIgIvo@cluster0.ycxisay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// i0MWm76xKJgIgIvo

const app =  express();
const port = 3000;

// mid ware ....
app.use(express.json());
app.use(authrouter);
app.use(admineroute);
app.use(productroute);


mongoose.connect(db).then(()=>{
    console.log('database connected successfully');
}).catch((e)=>{
    console.log(e);
});



app.listen(port,"0.0.0.0",() =>{
    console.log("server started `http://localhost:3000`");
})


