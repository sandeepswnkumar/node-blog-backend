import { Router } from "express";
import userRoute from "../src/routes/user.route.js"
import authRoute from "../src/routes/auth.route.js"
import postRoute from "../src/routes/post.route.js"
import commentRoute from "../src/routes/comment.route.js"
import likeRoute from "../src/routes/like.route.js"
import replyRoute from "../src/routes/reply.route.js"
import api_response from "./utils/api_response.js";
import ApiResponseCode from "./enums/api_response_code.js";

const router = Router()

router.use('/user', userRoute)
router.use('/auth', authRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);
router.use('/like', likeRoute);
router.use('/reply', replyRoute);
router.use((req, res, next) => {
    res.status(ApiResponseCode.NOT_FOUND).json(new api_response(false, ApiResponseCode.NOT_FOUND, "Resource not found"));
});



export default router