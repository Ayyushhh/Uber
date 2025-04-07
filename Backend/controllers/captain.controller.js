import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";

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

export default {
    registerCaptain
}