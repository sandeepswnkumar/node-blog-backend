import { Router } from "express";
import { create_post } from "../controllers/post.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import PostRequest from "../Requests/PostRequest.js";
const router = Router()

router.route('/').post(auth,PostRequest,create_post)

export default router;