import mongoose from "mongoose";
let rentschema = mongoose.Schema
let books = new rentschema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    adhar:{
        type:String
    },
    licence:{
        type:String
    },
    phone:{
        type:String
    },
    car:{
        type:String
    },
})
export default mongoose.model("bookind", books); 