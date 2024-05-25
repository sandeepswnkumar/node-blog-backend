import { body } from "express-validator";


const CreateReplyRequest = [
    body('reply').notEmpty().withMessage('Reply is required'),
    body('post_id').notEmpty().withMessage('Post Id is required'),
    body('comment_id').notEmpty().withMessage('Comment Id is required'),
];

export default CreateReplyRequest;