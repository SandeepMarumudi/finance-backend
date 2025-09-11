const { default: mongoose } = require("mongoose");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.methods.validatePassword=async function(userInputPassword){
try{
const {password}=this
const ispassword=await bcrypt.compare(userInputPassword,password)
return ispassword
}catch(err){
    console.log(err)
}
}

userSchema.methods.getJWT=async function(){
    try{
        const {_id}=this
        const token=await jwt.sign({_id:_id},"Sandy2242")
        return token
        

    }catch(err){
        console.log(err)
    }
}

const User=mongoose.model("User",userSchema)
module.exports=User