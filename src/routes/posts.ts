import { Router, Request, Response } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
} from "../controllers/posts-controller";
import {
  createComment,
  getCommentsByPost,
} from "../controllers/comments-controller";
import authorize from "../middleware/auth";

const router: Router = Router();

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", authorize, createPost);

router.get("/:id/comments", getCommentsByPost);

router.post("/:id", authorize, createComment);

export default router;
