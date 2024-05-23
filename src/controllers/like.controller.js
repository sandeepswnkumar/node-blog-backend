

import { validationResult } from "express-validator";
import ApiResponseCode from "../enums/ApiResponseCode.js";
import api_response from "../utils/api_response.js";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { Like } from "../models/Like.model.js";
import { CommentLike } from "../models/comment_like.model.js";
import { ReplyLike } from "../models/reply_like.model.js";
import LikeType from "../enums/LikeType.js";

export async function create_like(req, res) {

    try {
        const validation_error = validationResult(req);
        if (!validation_error.isEmpty()) {
            throw new TypeError(JSON.stringify(validation_error.array()))
        }
        req.body.user_id = req.user._id;
        let response = req.body;
        let message = "Somthing went wrong!"
        
        switch (req.body.like_type) {
            case LikeType.POST:
                response = await Like.create(req.body)
                message = "Post Liked Successfully";
                break;
            case LikeType.COMMENT:
                response = await CommentLike.create(req.body)
                message = "Comment Liked Successfully";
                break;
            case LikeType.REPLY:
                response = await ReplyLike.create(req.body)
                message = "Reply Liked Successfully";
                break;
        }
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, message, response))
    } catch (error) {
        let message = error.message;
        if (error.name == "TypeError") {
            message = JSON.parse(error.message);
        }
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}


export async function get_like(req, res) {

    try {
        const { comment_id } = req.params;
        const { user_id, post_id } = req.query
        let post = await Comment.find().select('-__v');
        if (comment_id) {
            post = await Comment.findById(comment_id).select('-__v');
        }
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Like fetched Successfully', post))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}

export async function update_like(req, res) {

    try {
        const { comment_id } = req.params;
        if (!comment_id) {
            throw new Error('Comment Id not found')
        }
        const comment = await Comment.findOneAndUpdate(
            {
                _id: comment_id,
                user_id: req.user._id,
                comment_id: req.comment_id
            },
            {
                $set: {
                    'comment': req.body.comment
                }
            },
            {
                new: true
            }
        ).select('-__v');
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Comment Updated Successfully', comment))
    } catch (error) {
        let message = error.message;
        if (error.name == "TypeError") {
            message = JSON.parse(error.message);
        }
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}