import Notification from "../models/notification.model.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    recipient: req.user._id,
  })
    .populate("sender", "name email role")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        notifications,
        "Notifications fetched successfully"
      )
    );
});

export const getUnreadNotificationCount = asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({
    recipient: req.user._id,
    isRead: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { count }, "Unread count fetched"));
});

export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    {
      _id: req.params.id,
      recipient: req.user._id,
    },
    {
      isRead: true,
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, notification, "Notification marked as read"));
});

export const markAllNotificationsAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    {
      recipient: req.user._id,
      isRead: false,
    },
    {
      isRead: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "All notifications marked as read"));
});