import { body } from "express-validator";

const RefreshTokenRequest = [

    body('refresh_token').notEmpty().withMessage('Refresh token is required'),
]

export default RefreshTokenRequest