const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc register user
//@route Post api/users/register
// access public
const registerUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mendatory")
    }
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        res.status(400);
        throw new Error("user already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log('User created', user);
    if(user){
        const {password, ...userCreated} = user.toObject();
        res.status(201).json({userCreated});
    } else {
        res.status(500);
        throw new Error("Failed to create user");
    }

});

// @desc login user
//@route Post api/users/login
// access public
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400)
        throw new Error("All fields are required");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    )
        res.json({accessToken});
    } else{
        res.status(401);
        throw new Error("email or password is not valid");

    }
})

// @desc login user
//@route Get api/users/current
// access private
const currentUser = asyncHandler( async (req, res) => {
    res.json(req.user);
})

module.exports = { registerUser, loginUser, currentUser };