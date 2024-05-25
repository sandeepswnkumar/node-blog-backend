import mongoose, {Schema} from "mongoose";

const postLikeSchema = new Schema({
    post_id :{ 
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user_id :{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deleted_at:{
        type: Date,
        default: null
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

postLikeSchema.index(
    {
        post_id:1,
        user_id:1
    },
    {
        unique:true
    }
)


export const PostLike = mongoose.model('PostLike',postLikeSchema);