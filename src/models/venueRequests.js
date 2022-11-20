const mongoose = require("mongoose");
const validator = require("validator");

const VenueRequests = mongoose.model("VenueRequests",{
    rollNo: {
        type:String,
        required:true,
        trim:true
    },
    venue:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        required:true,
    },
    slot:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    approved:{
        type:Boolean,
        default:false
    }
})
module.exports = VenueRequests;