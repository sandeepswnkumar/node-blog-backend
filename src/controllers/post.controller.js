

import { validationResult } from "express-validator";
import ApiResponseCode from "../enums/ApiResponseCode.js";
import api_response from "../utils/api_response.js";

export function create_post(req, res) {

    try {
        const validation_error = validationResult(req);
        if (!validation_error.isEmpty()) {
            throw new TypeError(JSON.stringify(validation_error.array()))
        }
        console.log("After validation");
        const { title, content, image } = req.body
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'User login Successfully', req.body))
    } catch (error) {
        let message = error.message;
        if(error.name == "TypeError"){
            message = JSON.parse(error.message);
        }
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, message))
    }
}