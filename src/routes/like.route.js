import { Router } from "express";
import { create_like } from "../controllers/like.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import PostLikeRequest from "../Requests/PostLikeRequest.js";
const router = Router()

router.route('/').post(auth,PostLikeRequest,create_like)
// router.route('/:comment_id?').get(auth, get_comment)

export default router;