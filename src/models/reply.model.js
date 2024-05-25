import {Schema,model} from "mongoose";

const replySchema = new Schema({
    reply:{
        type:String,
        required:true
    },
    post_id:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment_id:{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})


export const Reply = model('Reply',replySchema);