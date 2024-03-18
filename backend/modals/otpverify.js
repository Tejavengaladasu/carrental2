import mongoose from "mongoose";
let rentschema = mongoose.Schema
let otpver = new rentschema({
    email:{
        type:String
    },
    otp:{
        type:String
    },
    showhour:{
        type:String
    },
    showmin:{
        type:String
    },
    status:{
        type:String
    }
})
export default mongoose.model("Otp", otpver);