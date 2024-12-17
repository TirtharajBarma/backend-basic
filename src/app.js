import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '16kb'}))           // bodyParser.json()
app.use(express.urlencoded())                    // url encoded
app.use(express.static("public"))                // static 
app.use(cookieParser())

export { app } 
