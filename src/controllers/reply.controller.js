

import { validationResult } from "express-validator";
import ApiResponseCode from "../enums/api_response_code.js";
import api_response from "../utils/api_response.js";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { Reply } from "../models/reply.model.js";

export async function create_reply(req, res) {

    try {
        const validation_error = validationResult(req);
        if (!validation_error.isEmpty()) {
            throw new TypeError(JSON.stringify(validation_error.array()))
        }
        const post = await Post.findById(req.body.post_id)
        if(!post){
            throw new Error('Invalid post id');
        }
        const comment = await Comment.findById(req.body.comment_id)
        if(!comment){
            throw new Error('Invalid comment id');
        }
        req.body.user_id = req.user._id
        const reply = await Reply.create(req.body);
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'Reply created Successfully', reply))
    } catch (error) {
        let message = error.message;
        if (error.name == "TypeError") {
            message = JSON.parse(error.message);
        }
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}


export async function get_reply(req, res) {

    try {
        const { reply_id } = req.params;
        const { user_id,post_id,comment_id } = req.query
        let reply = await Reply.find().select('-__v');
        if (reply_id) {
            reply = await Reply.findById(reply_id).select('-__v');
        }
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Reply fetched Successfully', reply))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}

export async function update_reply(req, res) {

    try {
        const { reply_id } = req.params;
        if (!reply_id) {
            throw new Error('Reply Id not found')
        }
        const reply = await Reply.findOneAndUpdate(
            {
                _id: reply_id,
                user_id: req.user._id
            },
            {
                $set: {
                    'reply': req.body.reply
                }
            },
            {
                new: true
            }
        ).select('-__v');
        if(!reply){
            throw new Error('Reply Not found');
        }
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Reply Updated Successfully', reply))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}