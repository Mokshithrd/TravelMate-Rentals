const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose=require("passport-local-mongoose");
const { schema } = require('./review');
const { required } = require('joi');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);