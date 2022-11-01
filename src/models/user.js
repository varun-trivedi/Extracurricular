const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User",{
    name: {
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