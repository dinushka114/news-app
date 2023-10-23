import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import dotenv from "dotenv";
import authToken from "../helpers/authToken.js";

dotenv.config();


// @desc    Admin creation
// @route   POST /api/auth
const registerAdminAccount = asyncHandler(async (req, res) => {

    // define attributes for suer admin
    // getting all the attributes fromm environment variables
    const name = process.env.ADMIN_NAME || "news admin";
    const email = process.env.ADMIN_EMAIL || "admin@news.com";
    const password = process.env.ADMIN_PW || "newsAdmin123";
    const role = process.env.ADMIN_ROLE || "Admin";

    // check the admin already created in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Admin already created" })
    }

    // If not create the admin user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401).json({message:"Invalid user data"});
    }
});


const profile = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: "Profile" })
})


// @desc    User register
// @route   POST /api/auth/register
const userRegister = asyncHandler(async (req, res) => {

    // get the data from request body
    const { name, email, password } = req.body;

    // check user is already with the given email
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Email already exists!!" })
    }

    // create new user with given user data
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }


})


// @desc    User Login
// @route   POST /api/auth/user-login
const userLogin = asyncHandler(async (req, res, role) => {

    // get credentials from request body
    const { email, password } = req.body;

    // find the user with given email
    const user = await User.findOne({ email });

    // check the role 
    if (user.role != role) {
        res.status(403).json({
            message: "Please make sure you are logging in from the right portal."
        });
    } else if (user && (await user.matchPassword(password))) {
        authToken(res, user._id, role);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: role
        });
    } else {
        res.status(401).json({message:"Invalid email or password"})
    }
})


const userLogut = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


export { registerAdminAccount, userRegister, userLogin, userLogut, profile }