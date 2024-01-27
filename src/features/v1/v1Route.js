import express from 'express';
import userRouter from './user/user.routes.js';
import roleRouter from './role/role.routes.js';
import communityRouter from './community/community.routes.js';
import memberRouter from './member/member.routes.js';

const v1Router = express.Router();

v1Router.use('/auth',userRouter);

v1Router.use('/role',roleRouter);

v1Router.use('/community',communityRouter);

v1Router.use('/member',memberRouter);




console.log("version 1 routes loaded");
export default v1Router;