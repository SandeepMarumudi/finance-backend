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

module.exports=authRouter