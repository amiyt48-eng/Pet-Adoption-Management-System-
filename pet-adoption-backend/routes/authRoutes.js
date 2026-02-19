import express from "express";
const router = express.Router();

import { register, login } from "../controllers/authController.js";

// Register
router.post("/register", register);

// Login
router.post("/login", login);

export default router;
