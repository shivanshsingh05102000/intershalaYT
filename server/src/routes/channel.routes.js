// server/src/routes/channel.routes.js
// POST   /api/channels          (protected) create channel
// GET    /api/channels/:id      fetch channel info + its videos
// PUT    /api/channels/:id      (protected) edit channel
// Phase 2 ticket: TICKET-BE-03

import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createChannel, getChannelById, updateChannel } from "../controllers/channel.controller.js";

const router = express.Router();

router.post("/", protect, createChannel);
router.get("/:id", getChannelById);
router.put("/:id", protect, updateChannel);

export default router;