import mongoose, {Schema} from "mongoose";


const commentSchema = new Schema({
    comment: {
        type:String,
        required:true,
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    post_id:{
        type:Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
},{timestamps:{createdAt:"created_at",updatedAt:"updated_at"}});

export const Comment = mongoose.model('Comment',commentSchema)