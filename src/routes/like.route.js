import { Router } from "express";
import { create_like } from "../controllers/like.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import LikeRequest from "../Requests/like_request.js";
const router = Router()

router.route('/').post(auth,LikeRequest,create_like)

export default router;