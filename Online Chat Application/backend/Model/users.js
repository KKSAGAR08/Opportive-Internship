const mongoose = require('mongoose')

const db = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
},{timestamps:true})

const User = mongoose.model('User',db);

module.exports = User;