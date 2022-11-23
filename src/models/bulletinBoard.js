const mongoose = require("mongoose");
const validator = require("validator");

const BulletinBoard = mongoose.model("BulletinBoard",{
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
    content:{
        type:String,
        required:true,
        trim:true,
    },

})
module.exports = BulletinBoard;