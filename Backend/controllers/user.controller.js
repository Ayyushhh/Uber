import userModel from "../models/user.model.js";
import userService from '../services/user.service.js';
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

async function registerUser(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    
    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({message: 'User already exist'});
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ message: 'User registered successfully', token, user });
}

async function loginUser(req,res,next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,user});
}

async function getUserProfile(req, res, next) {
    res.status(200).json({user: req.user});
}

async function logoutUser(req,res,next) {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out' });
}

export default {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
};