import { registerUser,Loginuser, FetchData } from "../Controller/userData.js";
import express from 'express';
const userRouter=express.Router();
userRouter.post('/signup',registerUser);
userRouter.post('/login',Loginuser);
userRouter.get('/fetchdata',FetchData);
export  default userRouter;