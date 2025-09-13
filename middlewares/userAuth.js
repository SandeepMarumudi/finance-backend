const jwt=require("jsonwebtoken")
const User = require("../models/users")
const userAuth=async(req,res,next)=>{
try{
    const {token}=req.cookies
    if(!token){
        throw new Error("Please login!!!!!")
    }
    const decodeValue=await jwt.verify(token,"Sandy2242")
    const{_id}=decodeValue
    const user=await User.findById({_id:_id})
    req.user=user
     next()

}catch(err){
    res.status(401).send(err.message)
}
}

module.exports=userAuth