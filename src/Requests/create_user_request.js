import { body } from "express-validator";

const CreateUserRequest = [

    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter valid email'),
    body('password').notEmpty().withMessage('Password is required')
]

export default CreateUserRequest