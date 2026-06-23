import { Router } from "express";
import {
  acceptSolution,
  createSolution,
  getSolutionsForProblem,
  toggleSolutionUpvote,
} from "../controllers/solution.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:problemId", protect, createSolution);

router.get("/:problemId", protect, getSolutionsForProblem);

router.patch("/:solutionId/accept", protect, acceptSolution);

router.patch("/:solutionId/upvote", protect, toggleSolutionUpvote);

export default router;