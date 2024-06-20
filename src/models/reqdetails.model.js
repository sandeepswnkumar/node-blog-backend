import mongoose from "mongoose"

const reqDetailsSchema = new mongoose.Schema({
    body: {
        type: [{ String }],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        default: ''
    }
})


export const reqModel = mongoose.model('reqModel', reqDetailsSchema)