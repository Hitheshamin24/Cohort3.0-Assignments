import express from 'express'
import { createShortURL, deleteUrl, getAllLink} from '../controllers/url.controller.js'

const router=express.Router()


router.post("/",createShortURL)
router.get("/",getAllLink)
router.delete("/:id",deleteUrl)

export default router