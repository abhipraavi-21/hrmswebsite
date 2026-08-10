import { Router } from "express";
import { getMedia, removeMediaItem, updateMediaItem, uploadMedia } from "../../controllers/admin/media.controller.js";
import { upload } from "../../middleware/upload.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { mediaUpdateSchema } from "../../validators/media.validators.js";

const router = Router();

router.get("/", getMedia);
router.post("/upload", upload.single("file"), uploadMedia);
router.put("/:id", validateRequest(mediaUpdateSchema), updateMediaItem);
router.delete("/:id", removeMediaItem);

export default router;
