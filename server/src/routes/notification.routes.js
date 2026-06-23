import { Router } from "express";
import {
  getMyNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protect, getMyNotifications);
router.get("/unread-count", protect, getUnreadNotificationCount);
router.patch("/:id/read", protect, markNotificationAsRead);
router.patch("/mark-all/read", protect, markAllNotificationsAsRead);

export default router;