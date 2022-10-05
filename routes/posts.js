import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";
import auth from "../middle/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.post("/update", updatePost);
router.delete("/", deletePost);

export default router;
