const express = require('express');
const cors=require('cors');
const { default: mongoose } = require('mongoose');
const User=require('./models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const secretsalt=bcrypt.genSaltSync(8);

const app=express();
require('dotenv').config();
console.log(process.env.JWT_SECRET)
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL)
console.log(process.env.MONGO_URL);
app.get('/test',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json('test ok');
});
app.post('/register',async (req,res)=>{
    const {fname,lname,email,password}=req.body;
    try{
        const createduser= await User.create({
            fname,
            lname,
            email,
            password:bcrypt.hashSync(password,secretsalt),
        });
    
        res.json(createduser);
    }
    catch(err){
        res.status(422).json(err);
    }
});

app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const userDoc=await User.findOne({email});
    if (userDoc){
        var passOk = bcrypt.compareSync(password,userDoc.password);
        if (passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id},process.env.JWT_SECRET,{},(err,token)=>{
                if (err) throw err;
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'none'
                  }).json(userDoc);
            });
        }
        else{
            res.json('passwrong');
        }         
    }
    else{
        res.json("not found")
    }
});

app.listen(4000);
