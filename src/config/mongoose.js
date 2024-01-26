import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectUsingMongoose = async()=>{


    try{
        await mongoose.connect(process.env.DB_URL)

        console.log("connected to mongodb");
    }catch(err){
        console.log("Error while connecting to db ::::::",err);
        
    }
}