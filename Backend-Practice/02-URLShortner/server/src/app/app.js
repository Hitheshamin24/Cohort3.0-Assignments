import express from 'express'
import router from '../routes/url.routes.js'
import { getLink } from '../controllers/url.controller.js'

const app=express()
app.use(express.json())

app.use("/api/url",router) 
app.use("/:code",getLink)
export default app