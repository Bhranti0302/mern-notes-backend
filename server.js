const express=require("express");
const app=express();
require("dotenv").config();
const connectDB=require("./config/db");

connectDB();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Api is running...")
})

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})