const express = require('express');
const cors=require('cors');
const { default: mongoose } = require('mongoose');
const User=require('./models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const Download=require('image-downloader');
const multer = require('multer');
const secretsalt=bcrypt.genSaltSync(8);
const fs = require('fs');


const app=express();
require('dotenv').config();
console.log(process.env.JWT_SECRET)
app.use(express.json());
app.use(cookieParser());
app.use ('/uploads',express.static(__dirname+'/uploads'));
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
    mongoose.connect(process.env.MONGO_URL)
    const {email,password}=req.body;
    const userDoc=await User.findOne({email});
    if (userDoc){
        var passOk = bcrypt.compareSync(password,userDoc.password);
        if (passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id},process.env.JWT_SECRET,{},(err,token)=>{
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        }
        else{
            res.status(422).json('pass not ok')
        }         
    }
    else{
        res.json("not found")
    }
});

app.get('/profile',(req,res)=>{
    mongoose.connect(process.env.MONGO_URL)
    const {token} =req.cookies;
    if (token){
        jwt.verify(token,process.env.JWT_SECRET,{},async (err,userData)=>{
            if (err) throw err;
            const {fname,lname,email,_id}=await User.findById(userData.id)
            res.json({fname,lname,email,_id});
        });
    }
    else{
        res.json(null);
    }
    
});

app.post('/logout',(req,res)=>{
    res.cookie('token', '').json(true);
});
app.post('/uploadbylink',async(req,res)=>{
    const {link} = req.body;
    const newname ='photo'+Date.now()+'.jpg'
    await Download.image({
        url:link,
        dest:__dirname+'\\uploads\\'+newname,
    });
    res.json(newname);
});
const photosMiddleware=multer({dest:'uploads/'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
    for (let i=0;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        const parts=originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path+'.'+ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }
    res.json(uploadedFiles);
});


app.listen(4000);
