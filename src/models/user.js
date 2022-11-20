const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User",{
    name: {
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    rollNo:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    mobileNo:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        // minLength: 7,
        validate(value){
            if(validator.contains(value.toLowerCase(),"password") === true)
                throw new Error("Password cannot contain 'password'");
        }
    }
})
module.exports = User;