import express from 'express';
import CommunityController from './community.controller.js';
import jwtAuth from '../../../middlewares/jwt.middleware.js';

const communityRouter = express.Router();
const communityController = new CommunityController();


communityRouter.post('/',jwtAuth,(req,res)=>{communityController.addCommunity(req,res)});

communityRouter.get('/',(req,res)=>{communityController.getCommunities(req,res)});

communityRouter.get('/:id/members',(req,res)=>{communityController.getCommunityMembers(req,res)})

communityRouter.get('/me/owner',jwtAuth,(req,res)=>{communityController.getMyOwnedCommunities(req,res)});

communityRouter.get('/me/member',jwtAuth,(req,res)=>{communityController.getMemberCommunities(req,res)});



console.log("community router loaded");
export default communityRouter;