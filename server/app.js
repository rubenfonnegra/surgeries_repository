import express from "express";
import fileUpload from "express-fileupload";
import postsRoutes from "./routes/post.routes.js";
import cors from "cors";


const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

// rutas
app.use(postsRoutes)


export default app

