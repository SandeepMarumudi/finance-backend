const validator=require("validator")


const signupValidation=(user)=>{
    const {firstName,lastName,email,phone,password}=user
    if(!firstName || !lastName){
        throw new Error("firstName and lastName required")
    }else if(firstName.length<3 || lastName.length>20){
        throw new Error("name should be more than 2 characters ")

    }else if(!validator.isEmail(email)){
        throw new Error("enter valid email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("please enter strong password")
    }
}

module.exports=signupValidation