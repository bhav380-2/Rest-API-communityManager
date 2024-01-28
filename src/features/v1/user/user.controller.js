
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../../config/environment.js';

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req,res,next){

        try{
            const {name,email,password} = req.body;
            let errors = [];

            if(name.length<2){

                errors.push({
                    "param": "name",
                    "message": "Name should be at least 2 characters.",
                    "code": "INVALID_INPUT"
                })
            }

            if(password.length<6){
                errors.push({
                    "param": "password",
                    "message": "Password should be at least 6 characters.",
                    "code": "INVALID_INPUT"
                })
            }

            if(errors.length>0){
                return res.status(400).send({
                    "status": false,
                    "errors": errors
                })
            }

            const hashedPassword = await bcrypt.hash(password,12);
            const newUser =  await this.userRepository.signUp(name,email,hashedPassword);

            if(!newUser){
                errors.push({
                    "param": "email",
                    "message": "User with this email address already exists.",
                    "code": "RESOURCE_EXISTS"
                })

                return res.status(400).send({
                    "status": false,
                    "errors": errors
                 })
            }

            const token = jwt.sign({userID:newUser._id,email:newUser.email},env.jwt_secret,{
                expiresIn:'1h',
            });

            return res.status(200).send({
                "status":true,
                "content":{
                    "data" : {

                        "id": newUser._id,
                        "name": newUser.name,
                        "email": newUser.email,
                        "created_at": newUser.createdAt
                    },
                    "meta":{
                        "access_token": token
                    }
                }
            })

        }catch(err){
            console.log("error in signup :::",err);
            return res.status(500).send("Something went wrong");
        }
    }

    async signIn(req,res,next){
      
        try{
            const {email,password} = req.body;

            const user = await this.userRepository.findByEmail(email);
            console.log(user);
            if(!user){
                return res.status(400).send({
                    "status": false,
                    "errors": [
                      {
                        "param": "email",
                        "message": "Please provide a valid email address.",
                        "code": "INVALID_INPUT"
                      }
                    ]
                  });
            }else{

                const result = await bcrypt.compare(password,user.password);

                if(result){
                    const token = jwt.sign({userID:user._id,email:user.email},env.jwt_secret,{
                        expiresIn:'1h'
                    });

                    return res.status(200).send({
                        "status":true,
                        "content":{
                            "data" : {
                                "id": user._id,
                                "name": user.name,
                                "email": user.email,
                                "created_at": user.createdAt
                            },
                            "meta":{
                                "access_token": token
                            }
                        }
                    })
                }else{
                    
                    return res.status(400).send({
                        "status": false,
                        "errors": [
                          {
                            "param": "password",
                            "message": "The credentials you provided are invalid.",
                            "code": "INVALID_CREDENTIALS"
                          }
                        ]
                      });
                }
            }

        }catch(err){
            console.log("error in signin ::::",err);
            return res.status(500).send("Something went wrong")
        }
    }

    async getMyDetail(req,res,next){

        try{
            const user = await this.userRepository.findByEmail(req.userEmail);

            if(user){
                return res.status(200).send({
                    "status": true,
                    "content": {
                        "data": {
                            "id": user._id,
                            "name": user.name,
                            "email": user.email,
                            "created_at": user.createdAt
                        }
                    }
                 })
    
            }else{
    
                return res.status(400).send({
                    "status": false,
                    "errors": [
                      {
                        "message": "You need to sign in to proceed.",
                        "code": "NOT_SIGNEDIN"
                      }
                    ]
                })
            }
        }catch(err){
            throw err;
        }
    }
}