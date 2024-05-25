import { body } from "express-validator";


const LikeRequest = [
    body('post_id').notEmpty().withMessage('Post Id is required'),
    
    body('like_type')
    .notEmpty().withMessage('Like type is required')
    .isIn(['post','comment','reply']).withMessage('invalid like type. it should be between these three [post,comment,reply]'),

    body('comment_id').if((value,{req}) => ['comment','reply'].indexOf(req.body.like_type) > -1).notEmpty().withMessage('Comment id is required'),
    body('reply_id').if((value,{req}) => ['reply'].indexOf(req.body.like_type) > -1).notEmpty().withMessage('Reply id is required')
];



export default LikeRequest;