import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from 'cors';
import { connectDB } from "./db/db.js";
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import captainRoutes from './routes/captain.routes.js'

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);

export {
    app
}