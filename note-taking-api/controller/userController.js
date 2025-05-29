const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req,res) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({msg : "Email alredy registered!"})

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({name,email,password: hashedPassword})

        res.status(201).json({msg: "User registered successfully"})
        
    } catch (error) {
        res.status(400).json({message : 'Server Error',error : error.message})
    }
}

const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({msg : "Invalid email or password!"})

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) return res.status(400).json({msg: "Invalid email or password!"})

        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET, {expiresIn : '1d'})
        res.status(200).json({msg : "Login successfull",token});
            
    } catch (error) {
        res.status(400).json({message:"Server Error", error : error.message})
    }
}

module.exports = {register, login}