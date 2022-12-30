import express from 'express';
import { login, regsiter } from '../controllers/users.controller.js';

const userRouter = express.Router();

userRouter.post("/register", regsiter);

userRouter.post("/login", login);

export default userRouter