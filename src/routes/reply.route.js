import { Router } from "express";
import { create_reply,get_reply,update_reply } from "../controllers/reply.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import CreateReplyRequest from "../Requests/create_reply_request.js";
import errorHandler from "../middleware/error_handler.middleware.js";
const router = Router()

router.use(errorHandler);
router.route('/').post(auth,CreateReplyRequest,create_reply)
router.route('/:reply_id?').get(auth, get_reply)
router.route('/:reply_id').put(auth, update_reply)

export default router;