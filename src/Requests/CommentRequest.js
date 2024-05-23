import { body } from "express-validator";


const CommentRequest = [
    body('comment').notEmpty().withMessage('Comment is required'),
    body('post_id').notEmpty().withMessage('Post Id is required'),
];

export default CommentRequest;