import mongoose, { Schema } from "mongoose";


const postSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:'',
    },
},{timestamps:{createdAt:"created_at",updatedAt:"updated_at"}})

export const Post = mongoose.model('Post',postSchema);