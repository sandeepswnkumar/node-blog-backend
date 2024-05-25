
import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        email: true,
        required: true
    },
    refreshToken:{
        type:String,
        default:''
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:{createdAt:"created_at",updatedAt:"updated_at"}})

userSchema.index(
    {
        email: 1,
    },
    {
        unique: true,
    }
)

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,10)
    }
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
};

userSchema.methods.generateAccessToken = function(){
    try {
        let access_token = jwt.sign(
            {
                _id : this._id,
                name : this.name,
                email : this.email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRE_IN
            }
        )
        let verified_token = jwt.verify(access_token,process.env.ACCESS_TOKEN_SECRET);
        let token = {
            access_token,
            exp : process.env.ACCESS_TOKEN_EXPIRE_IN,
            expiresIn : new Date(verified_token.exp),
            iat : new Date(verified_token.exp)
        }
        return token;
    } catch (error) {
        return {
            error: error.message,
            success:false
        }
    }
}

userSchema.methods.generateRefreshToken = function(){
    try {
        const refresh_token = jwt.sign(
            {
                _id : this._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn : process.env.REFRESH_TOKEN_EXPIRE_IN
            }
        )
        let verified_token = jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET);
        let token = {
            refresh_token,
            expiresIn : verified_token.exp
        }
        return token;
    } catch (error) {
        return {
            error: error.message,
            success:false
        }
    }
}

export const User = mongoose.model('User', userSchema);