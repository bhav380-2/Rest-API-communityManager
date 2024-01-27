import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";
import User from './user.schema.js';

export default class UserRepository{

    async signUp(name,email,hashedPassword){
        try{
            const newUser = await User.create({
                _id:Snowflake.generate(Date.now()),
                
                name:name,
                email:email,
                password:hashedPassword
            })
            return newUser;

        }catch(err){

            console.log(err);
            throw(err);
        }
    }

    async findByEmail(email){
        try{

            const user = await User.findOne({email:email});
            return user;

        }catch(err){

            console.log("Error in finding email :::",err);
            throw err;

        }

    }
    
}