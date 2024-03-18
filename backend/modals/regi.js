import mongoose from "mongoose";
let rentschema = mongoose.Schema
let regis = new rentschema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
export default mongoose.model("User", regis);