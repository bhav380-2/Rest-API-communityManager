import express from 'express';
import RoleController from './role.controller.js';

const roleRouter = express.Router();
const roleController = new RoleController();

roleRouter.post('/',(req,res)=>{roleController.addRole(req,res)});
roleRouter.get('/',(req,res)=>{roleController.getRoles(req,res)});


console.log("Role router loaded");
export default roleRouter;