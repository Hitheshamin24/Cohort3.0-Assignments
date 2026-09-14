import express from "express";
import { authRegister, getMe, refreshUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", authRegister);
router.get("/me",getMe)
router.post("/refresh",refreshUser)
export default router;
