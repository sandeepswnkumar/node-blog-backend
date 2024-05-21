import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import ApiResponseCode from '../enums/ApiResponseCode.js';
import { Token } from '../models/token.model.js';

export async function auth(req,res,next){
    try {
        let token = req.header('Authorization')?.replace('Bearer ','');

        if(!token) throw new Error('Access Denied. No token provided.');

        let verified_token = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        token = await Token.findOne({token});

        if(!token) throw new Error('Invalid Access Token');

        const user = await User.findById(verified_token?._id).select('-password, -__v');

        if(!user) throw new Error('Invalid Access Token');

        req.user = user;

    } catch (error) {
        let token = req.header('Authorization')?.replace('Bearer ','');
        if(token) await Token.findOneAndDelete({token});
        return res.status(ApiResponseCode.UNAUTHORIZED)
        .json({
            success:false,
            message:"Invalid Access Token",
            description:error.message,
            status_code:ApiResponseCode.UNAUTHORIZED
        })
    }
    next();
}