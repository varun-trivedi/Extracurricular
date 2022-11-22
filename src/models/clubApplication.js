const mongoose = require("mongoose");
const validator = require("validator");

const ClubApplication = mongoose.model("ClubApplication",{
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
    clubName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    reason:{
        type:String,
        required:true,
        trim:true
    }
})
module.exports = ClubApplication;