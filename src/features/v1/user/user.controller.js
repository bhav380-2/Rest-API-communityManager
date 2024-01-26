
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req,res,next){
        const {name,email,password} = req.body;

        try{

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
            const data =  await this.userRepository.signUp(name,email,hashedPassword);

            if(!data){

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

            return res.status(200).send({
                "status":true,
                "content":{
                    "data" : data,
                    "meta":{
                        "access_token": ""
                    }
                }
            })

        }catch(err){
            console.log("error in signup :::",err);
            return res.status(500).send("Something went wrong");
        }
    }

}