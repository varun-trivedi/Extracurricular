const mongoose = require("mongoose");
const validator = require("validator");

const BulletinRequest = mongoose.model("BulletinRequest",{
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
    content:{
        type:String,
        required:true,
        trim:true,
    },

})
module.exports = BulletinRequest;