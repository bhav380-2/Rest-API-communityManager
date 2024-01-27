import express from 'express';
import MemberController from './member.controller.js';
import jwtAuth from '../../../middlewares/jwt.middleware.js';



const memberRouter = express.Router();
const memberController = new MemberController();


memberRouter.post('/',jwtAuth,(req,res)=>{memberController.addMember(req,res)});

memberRouter.delete('/:id',jwtAuth,(req,res)=>{memberController.deleteMember(req,res)});



console.log("Member router loaded");
export default memberRouter;