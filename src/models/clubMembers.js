const mongoose = require("mongoose");
const validator = require("validator");

const ClubMembers = mongoose.model("ClubMembers",{
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
    clubName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(validator.isEmail(value) === false)
                throw new Error("Not a Valid E-Mail");

        }
    }
})
module.exports = ClubMembers;