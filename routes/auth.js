const express = require("express");
const bcrypt=require("bcrypt")
const { validate } = require("../models/users");
const signupValidation = require("../validations/signupValidations");
const User = require("../models/users");
const jwt=require("jsonwebtoken")

const authRouter = express.Router();

authRouter.get("/get",async(req,res)=>{
    try{
        const {token}=req.cookies
        const value=await jwt.verify(token,"Sandy2242")
        const {_id}=value
        const user=await User.findOne({_id:_id})
        if(!user){
            throw new Error("Please login")
        }
        res.json({data:user})

    }catch(err){
        res.status(400).send(err.message)
    }
})

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
         return res.status(404).json({ message: "Email not found, please sign up" });
     }
     const checkPassword=await user.validatePassword(password)
     if(checkPassword){
        const token=await user.getJWT()
        res.cookie("token",token,{
          httpOnly: true, 
          secure: true, 
          sameSite: "None", 
          path: "/", 
        })
         res.json({message:"loggedin successfully",loggedInUser:user})
     }else{
        return res.status(404).json({ message: "Please wrong please try again"});
      
     }
    }catch(err){
        res.json({message:err.message})
    }

})
authRouter.post("/signout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  res.send("Logged out successfully");
});


module.exports=authRouter