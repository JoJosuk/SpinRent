const mongoose =require('mongoose');

const carsschema = new mongoose.Schema({
    owner: { type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    location:String,
    licenseplate:String,
    photos:[String],
    description:String,
    features:[String],
    maxnum:Number,
});

const Carsmodel = mongoose.model("Cars",carsschema);
module.exports=Carsmodel;