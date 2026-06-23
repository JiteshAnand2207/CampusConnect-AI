import Notification from "../models/notification.model.js";

const createNotification = async ({
  recipient,
  sender,
  title,
  message,
  type = "system",
  link = "",
}) => {
  if (!recipient || !title || !message) {
    return null;
  }

  const notification = await Notification.create({
    recipient,
    sender,
    title,
    message,
    type,
    link,
  });

  return notification;
};

export default createNotification;