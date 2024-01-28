import mongoose from 'mongoose';
import env from './environment.js';
// import dotenv from 'dotenv';
// dotenv.config();



export const connectUsingMongoose = async()=>{

    try{
        await mongoose.connect(env.mongo_url);

        console.log("connected to mongodb");
    }catch(err){
        console.log("Error while connecting to db ::::::",err);
    }
}