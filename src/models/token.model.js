import mongoose, { Schema } from "mongoose";


const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

export const Token = mongoose.model("Token", tokenSchema)