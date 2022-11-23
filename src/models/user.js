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
        trim:true,
        validate(value){
            if(value.length != 8)
            throw new Error("Not a Valid Roll No.");

        }

    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(validator.isEmail(value) === false)
                throw new Error("Not a Valid E-Mail");

        }
    },
    mobileNo:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(validator.isMobilePhone(value) == false)
            throw new Error("Not a valid mobile number");

        }

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
        minLength: 7,
        validate(value){
            if(validator.contains(value.toLowerCase(),"password") === true)
                throw new Error("Password cannot contain 'password'");
        }
    }
})
module.exports = User;