import { User } from "../models/user.model.js";
import api_response from "../utils/api_response.js";
import ApiResponseCode from "../enums/api_response_code.js";
import jwt from "jsonwebtoken";
import { Token } from "../models/token.model.js";
import { validationResult } from "express-validator";

export async function login(req, res) {
    try {
        const validation_error = validationResult(req);

        if (!validation_error.isEmpty()) {
            throw new TypeError(JSON.stringify(validation_error.array()))
        }
        const user = await User.findOne({ email }).select('-password,-__v');
        if (!user) {
            throw new Error('Invalid user');
        }
        let isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new Error('Invalid password');
        }
        let token = await generate_access_and_refresh_token(user._id);
        if (token.success !== undefined && !token.success) {
            throw new Error(token.message)
        }
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'User login Successfully', token))
    } catch (error) {
        let message = error.message;
        if (error.name == "TypeError") {
            message = JSON.parse(error.message);
        }
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}

export async function logout(req, res) {
    try {
        let token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Access Denied. No, token provided.');
        }
        token = await Token.findOneAndDelete({ token });
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'User Log out Successfully'))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}

export async function refresh_token(req, res) {
    try {
        const validation_error = validationResult(req);
        if (!validation_error.isEmpty()) {
            throw new TypeError(JSON.stringify(validation_error.array()))
        }

        let verified_token = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);

        let user = await User.findOne({
            _id: verified_token._id,
            refreshToken: refresh_token
        });

        if (!user) {
            throw new Error('Invalid user');
        }

        let token = await generate_access_and_refresh_token(verified_token?._id);

        if (token.success !== undefined && !token.success) {
            throw new Error(token.message)
        }
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Token refreshed Successfully', token))

    } catch (error) {
        let message = error.message;
        if (error.name == "TypeError") {
            message = JSON.parse(error.message);
        }
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}

export async function generate_access_and_refresh_token(user_id) {
    try {
        if (!user_id) {
            throw new Error('Invalid user');
        }
        const user = await User.findById(user_id).select('-__v -password');
        let refresh_token = user.generateRefreshToken();
        user.refreshToken = refresh_token.refresh_token;
        user.save();

        let access_token = user.generateAccessToken();
        await Token.create({
            token: access_token.access_token,
            user_id: user._id,
        })

        return {
            access_token: access_token.access_token,
            refresh_token: refresh_token.refresh_token,
            user: user
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}


export async function register(req, res) {
    try {
        const validation_error = validationResult(req);
        if (!validation_error.isEmpty()) {
            throw new TypeError(JSON.stringify(validation_error.array()))
        }
        const user = await User.create(req.body)
        const userObj = user.toJSON()
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'User Created Successfully', userObj))
    } catch (error) {
        let message = error.message;
        if (error.name == "TypeError") {
            message = JSON.parse(error.message);
        }
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}