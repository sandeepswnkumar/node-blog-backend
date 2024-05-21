import { Schema, model } from "mongoose";

const replyLikeSchema = Schema({
    comment_id :{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    reply_id :{
        type: Schema.Types.ObjectId,
        ref: 'Reply'
    },
    post_id : {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user_id : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const ReplyLike = model('ReplyLike',replyLikeSchema);