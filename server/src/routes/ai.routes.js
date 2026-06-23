import { Router } from "express";
import { askAI } from "../controllers/ai.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/ask", protect, askAI);

export default router;