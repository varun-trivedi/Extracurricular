const mongoose = require("mongoose");
const validator = require("validator");

const VenueBookings = mongoose.model("VenueBookings",{
    rollNo: {
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length != 8)
            throw new Error("Not a Valid Roll No.");

        }
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
        trim:true,
        validate(value){
            if(value != "Morning" && value != "Afternoon" && value != "Evening")
                throw new Error("Enter valid Slot");
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
    }
})
module.exports = VenueBookings;