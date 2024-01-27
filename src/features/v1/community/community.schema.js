import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({

    _id:{
        type:String,
        required: true
    },

    name:{
        type:String,
        required:true
    },

    slug:{
        type:String,
        required:true
    },

    owner:{
        type:String,
        required:true,
        ref:'User'
    }
  
},{timestamps:true})

const Community = mongoose.model("Community",communitySchema);
export default Community;