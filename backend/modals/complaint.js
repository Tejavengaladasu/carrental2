import mongoose from "mongoose";
let rentschema = mongoose.Schema
let qry = new rentschema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true
    }
})
export default mongoose.model("Querys", qry);