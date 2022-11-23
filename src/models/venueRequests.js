const mongoose = require("mongoose");
const validator = require("validator");

const VenueRequests = mongoose.model("VenueRequests",{
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
    },
    approved:{
        type:Boolean,
        default:false
    },
    reason:{
        type:String,
        required:true,
        trim:true
    }
})
module.exports = VenueRequests;