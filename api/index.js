const express = require('express');
const cors=require('cors');
const { default: mongoose } = require('mongoose');
const app=express();
require('dotenv').config();

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL)
console.log('hey');
app.get('/test',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json('test ok');
});
//3gx3uBoZDnbfhITD
app.post('/register',(req,res)=>{
    const {name,email,password}=req.body;

    res.json({name,email,password});
});

app.listen(4000);

