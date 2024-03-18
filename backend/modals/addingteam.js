import mongoose from "mongoose";
let rentschema = mongoose.Schema
let ad = new rentschema({
    name:{
        type:String,
    },
    position:{
        type:String,
    },
    mempics:{
        type:String,
    }
})
export default mongoose.model("Team", ad);