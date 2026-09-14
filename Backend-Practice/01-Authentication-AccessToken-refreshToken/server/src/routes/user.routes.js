import express from "express";
import { authRegister } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", authRegister);

export default router;
