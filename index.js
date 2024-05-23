import express from "express";
import dotenv from "dotenv";
import connect_db from "./src/config/database.js";
dotenv.config({
    path:'./.env'
})
const app = express();
const PORT = process.env.APP_PORT || 3000;
connect_db();
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
// app.use(cookieParser())


import userRoute from "./src/routes/user.route.js"
import authRoute from "./src/routes/auth.route.js"
import postRoute from "./src/routes/post.route.js"
import commentRoute from "./src/routes/comment.route.js"
import likeRoute from "./src/routes/like.route.js"
app.use('/user', userRoute)
app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/comment', commentRoute);
app.use('/like', likeRoute);


app.listen(PORT, function(){
    console.log('Listing on port ',PORT)
})