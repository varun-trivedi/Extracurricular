const mongoose = require("mongoose");
const validator = require("validator");

const Feedback = mongoose.model("Feedback",{
    fullName:{
        type:String,
        required:true
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
    message:{
        type:String,
        required:true,
        trim:true,
    },

})
module.exports = Feedback;