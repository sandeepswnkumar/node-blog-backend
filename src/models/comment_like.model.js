import { Schema, model } from "mongoose";

const commentLikeSchema = Schema({
    comment_id :{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
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

export const CommentLike = model('CommentLike',commentLikeSchema);