import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';

import { connectUsingMongoose } from './src/config/mongoose.js'; 
import v1Router from './src/features/v1/v1Route.js';

const app = express();
const PORT = 8000;



app.use(express.json());

app.use('/v1',v1Router);


app.get("/",(req,res)=>{
    res.send("hello");
})

app.use((err,req,res,next)=>{
    console.log(err);
   res.status(503).send('something went wrong, please try again later');
})



app.listen(PORT,(err)=>{
    if(err){
        console.log("Error while listening to port ",PORT);
        return;
    }
    console.log("Successfully connected to port ",PORT);

    connectUsingMongoose();
})
