import express from 'express';
const router = express.Router();

import { body } from 'express-validator';
import captainController from '../controllers/captain.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

router.post('/register', 
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 character long'),
        body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 character long'),
        body('vehicle.capacity').isLength({min: 1}).withMessage('Capacity must be atleast 1'),
        body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type'),
    ],
    captainController.registerCaptain
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
    ],
    captainController.loginCaptain
);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

export  default router;