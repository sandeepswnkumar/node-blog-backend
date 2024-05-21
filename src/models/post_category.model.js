import mongoose, { Schema } from "mongoose";

const postCategorySchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: {createdAt:"created_at",updatedAt:"updated_at"} });

postCategorySchema.index(
    {
        post_id: 1,
        category_id: 1
    },
    {
        unique:true
    }
)


export const PostCategory = mongoose.model('PostCategory', postCategorySchema);