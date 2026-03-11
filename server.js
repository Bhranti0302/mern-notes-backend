const express=require("express");
const app=express();
require("dotenv").config();
const connectDB=require("./config/db");

const authRoutes=require("./routes/authRoutes");

connectDB();

app.use(express.json());
app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("Api is running...")
})

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})