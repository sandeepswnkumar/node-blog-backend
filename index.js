import express from "express";
import dotenv from "dotenv";
import connect_db from "./src/config/database.js";
import errorHandler from "./src/middleware/error_handler.middleware.js";
import appRouter from './src/app.route.js'
dotenv.config({
    path: './.env'
})
const app = express();
const PORT = process.env.APP_PORT || 3000;
connect_db();
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use('/',appRouter)
app.use(errorHandler);
const server = app.listen(PORT, function () {
    console.log('Listing on port ', PORT)
})

