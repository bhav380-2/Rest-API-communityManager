import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import env from './src/config/environment.js';
import { connectUsingMongoose } from './src/config/mongoose.js'; 
import v1Router from './src/features/v1/v1Route.js';

const app = express();
const PORT = process.env.PORT!=undefined ? process.env.PORT:8000;



// const corsOptions ={
//     origin : ''
// }

app.use(cors());


app.use(express.json());

app.use('/v1',v1Router);

app.use((req,res)=>{
   res.status(404).send('API NOT FOUND !!!');
})



app.listen(PORT,(err)=>{
    if(err){
        console.log("Error while listening to port ",PORT);
        return;
    }
    console.log("Successfully connected to port ",PORT);

    connectUsingMongoose();
})
