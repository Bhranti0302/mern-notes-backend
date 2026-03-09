const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup
const signupUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        const userExists=await User.findOne({email});

        if(userExists){
            return res.status(400).json({message:'User already exists'});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        });

        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Login
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:'Invalid credentials'});
        }

        if(user && (await bcrypt.compare(password,user.password))){
            const token=jwt.sign(
                { id:user._id },
                process.env.JWT_SECRET,
                { expiresIn:'30d' }
            );

            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token
            });

        } else {
            res.status(400).json({message:'Invalid credentials'});
        }
        } catch(error){
            res.status(500).json({message:error.message});
        }
    };

module.exports = { signupUser, loginUser };
         