import express from "express";
import { authLogin, authRegister, getMe, refreshUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.get("/me",getMe)
router.post("/refresh",refreshUser)
export default router;
