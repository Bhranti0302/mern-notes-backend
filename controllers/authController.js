const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const cookieOptions = require('../utils/cookieOption');
const jwt = require('jsonwebtoken')

// ================= REGISTER =================
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Create new user
        const user = await User.create({
            name,
            email,
            password
        });

        // 3. Generate JWT token
        const token = generateToken(user.id);

        // 4. Set token in HTTP-only cookie
        res.cookie('token', token, cookieOptions);

        // 5. Send response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// ================= LOGIN =================
exports.login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        
        // 1. Check if user exists
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 2. Check if password matches
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Set Online Status
        user.status = "online";
        user.lastSeen = null;
        await user.save();


        // 3. Generate JWT token
        const token = generateToken(user.id);

        // 4. Set token in HTTP-only cookie
        res.cookie('token', token, cookieOptions);

        // 5. Send response
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            status: user.status
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// ================= LOGOUT =================
exports.logout = async (req, res) => { 
    try {
        const token = req.cookies.token;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
        }

        // Set Offline Status
        await User.findByIdAndUpdate(decoded.id, { status: "offline", lastSeen: new Date() });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}