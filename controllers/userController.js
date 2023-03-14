const express = require('express');
const router = express.Router();
asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

getUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });

createUser = asyncHandler(async (req, res) => {
    const {name , email , password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please enter all fields');
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error('User already exists');
    }
    const hasedpass = await bcrypt.hash(password , 10);
    const user = await User.create({
        name: name,
        email: email,
        password: hasedpass
    });
    res.json({user});
});

loginUser = asyncHandler(async (req, res) => {
    const {email , password} = req.body;
    if(!email || !password){
        res.status(400);
        throw   new Error('Please enter all fields');
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password , user.password))){
        const accessToken = jwt.sign({
            user : {
                id: user._id,
                name: user.name,
                email: user.email
            }
 
        } , process.env.ACCESS_TOKEN_SECRET , 
        {expiresIn : '1m'});
        req.user = user;
        res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

module.exports = { getUser  , createUser , loginUser};