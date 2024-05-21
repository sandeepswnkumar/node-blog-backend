import mongoose,{Schema} from "mongoose";


const postTagSchema = new Schema({
    post_id:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    tag_id :{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }
})

postTagSchema.index(
    {
        post_id:1,
        tag_id:1
    },
    {
        unique:true
    }
)


export const PostTag = mongoose.model('PostTag',postTagSchema);