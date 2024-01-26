import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../../middlewares/jwt.middleware.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup',(req,res)=>{userController.signUp(req,res)});



console.log("user router loaded");
export default userRouter;