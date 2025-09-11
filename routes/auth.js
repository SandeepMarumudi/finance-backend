const express = require("express");
const bcrypt=require("bcrypt")
const { validate } = require("../models/users");
const signupValidation = require("../validations/signupValidations");
const User = require("../models/users");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
   signupValidation(req.body);
   const hashPassword=await bcrypt.hash(password,10)

   const user=new User({
    firstName,
    lastName,
    email,
    password:hashPassword,
    phone
   })
   const savedUser= await user.save()
    res.json({message:"user added successfully",data:savedUser})
  } catch (err) {
    res.status(400).json({message:err.message})
  }
});

authRouter.post("/login",async(req,res)=>{
    try{
     const {email,password}=req.body
     const user=await User.findOne({email:email})
     if(!user){
        throw new Error("Email not found please login")
     }
     const checkPassword=await user.validatePassword(password)
     if(checkPassword){
        const token=await user.getJWT()
        res.cookie("token",token)
         res.json({message:"loggedin successfully",loggedInUser:user})
     }else{
        throw new Error("Please wrong please try again")
     }
    }catch(err){
        res.json({message:err.message})
    }

})

authRouter.post("/signout",async(req,res)=>{
    try{

        res.cookie("token",null,{expires:new Date(Date.now())})
        res.send("loggedout successfully")
    }catch(err){
        res.json({message:err.message})
    }
})

module.exports=authRouter