import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({

    _id:{
        type:String,
        required: true
    },

    name:{
        type:String,
        required:true,
        enum:['Community Admin','Community Member']
    },

},{timestamps:true})

const Role = mongoose.model("Role",roleSchema);
export default Role;