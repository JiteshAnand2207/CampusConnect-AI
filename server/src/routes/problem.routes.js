import { Router } from "express";
import {
  createProblem,
  getAllProblemsForAdmin,
  getMyProblems,
  getPublicProblems,
  getSingleProblem,
  toggleProblemUpvote,
  updateProblemStatus,
} from "../controllers/problem.controller.js";
import { authorizeRoles, protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protect, createProblem);

router.get("/", protect, getPublicProblems);

router.get("/my", protect, getMyProblems);

router.get(
  "/admin/all",
  protect,
  authorizeRoles("admin", "moderator"),
  getAllProblemsForAdmin
);

router.get("/:id", protect, getSingleProblem);

router.patch("/:id/status", protect, updateProblemStatus);

router.patch("/:id/upvote", protect, toggleProblemUpvote);

export default router;