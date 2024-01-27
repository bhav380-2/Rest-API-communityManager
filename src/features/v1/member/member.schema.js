import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({

    _id:{
        type:String,
        required: true
    },

    community:{
        type:String,
        ref:'Community',
        required:true

    },

    user:{
        type:String,
        ref:'User',
        required:true
    },

    role:{
        type:String,
        ref:'Role',
        required:true
    }
  
},{timestamps:true})

const Member = mongoose.model("Member",memberSchema);
export default Member;