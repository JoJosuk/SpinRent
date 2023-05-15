const express = require('express');
const cors=require('cors');
const { default: mongoose } = require('mongoose');
const User=require('./models/User');
const Cars=require('./models/Cars');
const Booking=require('./models/Booking');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const Download=require('image-downloader');
const multer = require('multer');
const secretsalt=bcrypt.genSaltSync(8);
const fs = require('fs');
const { error } = require('console');

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    });
  }

const app=express();
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use ('/uploads',express.static(__dirname+'/uploads'));
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL)
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



    
app.post('/cars',(req,res)=>{
    const {token}=req.cookies;
    const {title,location,license,addedPhotos,description,features,maxpassengers,price}=req.body;
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,userData)=>{
        if (err) throw err;
       const idkcarsig = await Cars.create({
            owner:userData.id,
            title,location,licenseplate:license,
            photos:addedPhotos,description,
            features,maxnum:maxpassengers,price,
        });
        res.json(idkcarsig);
    })
    
});
app.get('/carsall',async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL)
    res.json(await Cars.find({}));
})

app.get('/cars',async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL)
    const {token}=req.cookies;
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,userData)=>{
        if (err) throw err;
        const {id}=userData;
        res.json(await Cars.find({owner:id}));
    });
});
app.get('/cars/:id',async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL)
    const {id}=req.params;
    res.json(await Cars.findById(id));
});

app.put('/cars',async (req,res)=>{
    const {token}=req.cookies;
    const {id,title,location,license,addedPhotos,description,features,maxpassengers,price}=req.body;
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,userData)=>{
        const placeDoc=await Cars.findById(id);
        if(err) throw err;
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title,location,licenseplate:license,
            photos:addedPhotos,description,
            features,maxnum:maxpassengers,price,
            });
            await placeDoc.save();
            res.json('ok')
        }
    });
});

app.get('/showcar/:id',async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL)
    const {id}=req.params;
    res.json(await Cars.findById(id));
})

app.get('/allcars',async (req,res)=>{
    res.json(await Cars.find({}));
})

app.post('/booking',async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL)
    const userData = await getUserDataFromReq(req);
    const {car,start,stop,fullname,phone,price}=req.body;
    Booking.create({
        car,start,stop,fullname,phone,price,
        user:userData.id,
    }).then((doc)=>{
        res.json(doc);
    }).catch((err)=>{
        throw err; 
    });
    

    
});

app.get('/booking',async (req,res)=>{
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('car'));
})


app.listen(4000);
