const mongoose = require("mongoose");
const validator = require("validator");

const VenueBookings = mongoose.model("VenueBookings",{
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
    }
})
module.exports = VenueBookings;