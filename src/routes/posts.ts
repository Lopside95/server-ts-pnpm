import { Router, Request, Response } from "express";
import { createPost, getAllPosts } from "../controllers/posts-controller.ts";

const router: Router = Router();

router.get("/", getAllPosts);

router.post("/", createPost);

export default router;
