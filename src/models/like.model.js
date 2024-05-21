import mongoose, {Schema} from "mongoose";

const likeSchema = new Schema({
    post_id :{ 
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user_id :{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

likeSchema.index(
    {
        post_id:1,
        user_id:1
    },
    {
        unique:true
    }
)


export const Like = mongoose.model('Like',likeSchema);