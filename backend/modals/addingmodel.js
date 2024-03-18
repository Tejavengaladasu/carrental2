import mongoose from "mongoose";
let rentschema = mongoose.Schema
let adcar = new rentschema({
    name:{
        type:String
    },
    model:{
        type:String
    },
    transmission:{
        type:String
    },
    variant:{
        type:String
    },
    rating:{
        type:String
    },
    price:{
        type:String
    },
    carimgs:{
        type:String
    },
})
export default mongoose.model("Cars", adcar); 