import { validationResult } from "express-validator";
import { reqModel } from "../models/reqdetails.model.js";
import ApiResponseCode from "../enums/api_response_code.js"
import api_response from "../utils/api_response.js";

const apiDetails = async (req, res, next) => {
    try {
        const { body, url, method, host, originalUrl, ip } = req
        const validation_error = validationResult(req);
        if (!validation_error.isEmpty()) {
            throw new TypeError(JSON.stringify(validation_error.array()))
        }


        const createreq = await reqModel.create({
            body,
            url,
            method,
            host,
            originalUrl,
            ip: null
        })

        const createdReq = await reqModel.findById(createreq)


        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'ReqDetails created Successfully', createdReq))
        next()
    } catch (error) {
        console.log("Some thing went wrong!", error);
    }
}

export { apiDetails }