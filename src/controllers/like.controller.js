

import { validationResult } from "express-validator";
import ApiResponseCode from "../enums/api_response_code.js";
import api_response from "../utils/api_response.js";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { Reply } from "../models/reply.model.js";
import { PostLike } from "../models/post_like.model.js";
import { CommentLike } from "../models/comment_like.model.js";
import { ReplyLike } from "../models/reply_like.model.js";
import LikeType from "../enums/like_type.js";

export async function create_like(req, res) {

    try {
        const validation_error = validationResult(req);
        if (!validation_error.isEmpty()) {
            throw new TypeError(JSON.stringify(validation_error.array()))
        }
        req.body.user_id = req.user._id;
        let response = [];
        let message = "Somthing went wrong!"
        const {post_id,user_id} = req.body;
        const post = await Post.findById(post_id);
        if(!post){
            throw new Error("Post not found")
        }
        let comment = {};
        switch (req.body.like_type) {
            case LikeType.POST:
                let postlike = await PostLike.findOne({post_id,user_id})
                if(postlike){
                    await PostLike.deleteOne({ _id: postlike._id });
                    message = "Post Unliked Successfully";
                }else{
                    response = await PostLike.create(req.body)
                    message = "Post Liked Successfully";
                }
                break;
            case LikeType.COMMENT:
                comment = await Comment.findById(req.body.comment_id);
                if(!comment){
                    throw new Error("Comment not found")
                }
                let commentlike = await CommentLike.findOne({post_id,user_id,comment_id:req.body.comment_id})
                if(commentlike){
                    await CommentLike.deleteOne({ _id: commentlike._id });
                    message = "Comment Unliked Successfully";
                }else{
                    response = await CommentLike.create(req.body)
                    message = "Comment Liked Successfully";
                }
                break;
            case LikeType.REPLY:
                const {reply_id} = req.body;
                comment = await Comment.findById(req.body.comment_id);
                if(!comment){
                    throw new Error("Comment not found")
                }
                let reply = await Reply.findById(reply_id);
                if(!reply){
                    throw new Error("Reply not found")
                }
                let replyLike = await ReplyLike.findOne({post_id,user_id,reply_id,comment_id:req.body.comment_id})
                if(replyLike){
                    await ReplyLike.deleteOne({ _id: replyLike._id });
                    message = "Reply Unliked Successfully";
                }else{
                    response = await ReplyLike.create(req.body)
                    message = "Reply Liked Successfully";
                }
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