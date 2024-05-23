import { Router } from "express";
import { create_post, get_post, update_post } from "../controllers/post.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import PostRequest from "../Requests/PostRequest.js";
const router = Router()

router.route('/').post(auth, PostRequest, create_post)
router.route('/:post_id?').get(auth, get_post)
router.route('/:post_id?').put(auth, update_post)

export default router;