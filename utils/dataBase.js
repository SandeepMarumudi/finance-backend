const { default: mongoose } = require("mongoose")



const connectDB=async()=>{
    try{
     await mongoose.connect("mongodb+srv://sandy2242:2KOLKM9CvRfjxkZD@namstenode.vefwfiq.mongodb.net/finance")
    }catch(err){
        console.log(err.message)
    }
}

module.exports=connectDB