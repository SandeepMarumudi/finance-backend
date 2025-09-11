const express=require("express")
const connectDB = require("./utils/dataBase")
const authRouter = require("./routes/auth")






const app=express()
app.use(express.json())





app.use("/",authRouter)










connectDB()
.then(()=>{
    console.log("dataBase connected successfully")
    app.listen("6666",()=>{
        console.log("Server started running on 6666")
    })
})
.catch((err)=>{
    console.log(err)
})