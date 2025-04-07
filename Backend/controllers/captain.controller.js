import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

async function registerCaptain(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle, location } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({message: 'Captain already exist'});
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        latitude: location?.latitude || '',
        longitude: location?.longitude || '', 
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ message: 'User registered successfully', token, captain });
}

async function loginCaptain(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,captain});
}

async function getCaptainProfile(req,res, next) {
    res.status(200).json({captain: req.captain});
}

async function logoutCaptain(req,res,next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
}

export default {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain
}