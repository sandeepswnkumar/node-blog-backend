

import { validationResult } from "express-validator";
import ApiResponseCode from "../enums/api_response_code.js";
import api_response from "../utils/api_response.js";
import { Post } from "../models/post.model.js";

export async function create_post(req, res) {

    try {
        const validation_error = validationResult(req);
        if (!validation_error.isEmpty()) {
            throw new TypeError(JSON.stringify(validation_error.array()))
        }
        const post = await Post.create(req.body);
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'Post created Successfully', post))
    } catch (error) {
        let message = error.message;
        if (error.name == "TypeError") {
            message = JSON.parse(error.message);
        }
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}


export async function get_post(req, res) {

    try {
        const { post_id } = req.params;
        const { user_id } = req.query
        let post = await Post.find().select('-__v');
        if (post_id) {
            post = await Post.findById(post_id).select('-__v');
        }
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Post fetched Successfully', post))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}

export async function update_post(req, res) {

    try {
        const { post_id } = req.params;
        if (!post_id) {
            throw new Error('Post Id not found')
        }
        delete req.body.user_id;
        const post = await Post.findOneAndUpdate(
            {
                _id: post_id,
                user_id: req.user._id
            },
            {
                $set: req.body
            },
            {
                new: true
            }
        ).select('-__v');
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Post Updated Successfully', post))
    } catch (error) {
        let message = error.message;
        if (error.name == "TypeError") {
            message = JSON.parse(error.message);
        }
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}