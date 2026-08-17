import { Router } from "express";
import {
  createPost,
  getPost,
  listPosts,
  removePost,
  updatePost,
} from "../../controllers/admin/blog.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { blogPostSchema } from "../../validators/blog.validators.js";

const router = Router();

router.get("/", listPosts);
router.post("/", validateRequest(blogPostSchema), createPost);
router.get("/:id", getPost);
router.put("/:id", validateRequest(blogPostSchema), updatePost);
router.delete("/:id", removePost);

export default router;
