import express from "express";
import { signIn, signUp, getUser } from "../controllers/auth.js";
import auth from "../middle/auth.js";
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/profile", auth, getUser);

export default router;
