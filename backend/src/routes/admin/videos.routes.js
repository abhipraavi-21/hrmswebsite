import { Router } from "express";
import {
  createVideoItem,
  getVideoItem,
  listVideoItems,
  removeVideoItem,
  updateVideoItem,
} from "../../controllers/admin/videos.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { videoSchema } from "../../validators/video.validators.js";

const router = Router();

router.get("/", listVideoItems);
router.post("/", validateRequest(videoSchema), createVideoItem);
router.get("/:id", getVideoItem);
router.put("/:id", validateRequest(videoSchema), updateVideoItem);
router.delete("/:id", removeVideoItem);

export default router;
