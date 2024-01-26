import express from 'express';
import userRouter from './user/user.routes.js';

const v1Router = express.Router();

v1Router.use('/auth',userRouter);






console.log("version 1 routes loaded");
export default v1Router;