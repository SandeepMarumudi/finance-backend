const mongoose=require("mongoose")

const transactionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    category:{
        type:String,
        required:true,
        enum:["shopping","rent","food","others","gas"]
    }
})
module.exports=mongoose.model("Transaction",transactionSchema)