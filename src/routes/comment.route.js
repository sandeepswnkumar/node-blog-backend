import { Router } from "express";
import { create_comment,get_comment,update_comment } from "../controllers/comment.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import CommentRequest from "../Requests/create_comment_request.js";
const router = Router()

router.route('/').post(auth,CommentRequest,create_comment)
router.route('/:comment_id?').get(auth, get_comment)
router.route('/:comment_id').put(auth, update_comment)

export default router;