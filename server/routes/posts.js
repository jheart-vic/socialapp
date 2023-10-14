import express from "express";
import { getFeedPosts, getUserPosts,createComment , likePost, getPostByPostId } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:postid",  getPostByPostId);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* CREATE comment */
router.post("/:postId/comments", verifyToken, createComment);


/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
