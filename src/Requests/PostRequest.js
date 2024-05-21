import { body } from "express-validator";


const PostRequest = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
];

export default PostRequest;