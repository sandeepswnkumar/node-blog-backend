import { body } from "express-validator";

const LoginRequest = [

    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
]

export default LoginRequest