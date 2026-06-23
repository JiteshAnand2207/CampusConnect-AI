import { getRedisClient, isRedisConnected } from "../config/redis.js";
import createNotification from "./createNotification.js";

const NOTIFICATION_QUEUE = "queue:notifications";

export const enqueueNotification = async (notificationData) => {
  try {
    if (!isRedisConnected()) {
      return await createNotification(notificationData);
    }

    const redisClient = getRedisClient();

    await redisClient.lPush(
      NOTIFICATION_QUEUE,
      JSON.stringify(notificationData)
    );

    return true;
  } catch (error) {
    console.error(`Notification enqueue failed: ${error.message}`);
    return await createNotification(notificationData);
  }
};

export const processNotificationQueue = async () => {
  const redisClient = getRedisClient();

  if (!isRedisConnected()) {
    console.log("Redis not connected. Notification worker stopped.");
    return;
  }

  console.log("Notification worker started");

  while (true) {
    try {
      const result = await redisClient.brPop(NOTIFICATION_QUEUE, 0);

      if (!result?.element) {
        continue;
      }

      const notificationData = JSON.parse(result.element);

      await createNotification(notificationData);

      console.log(`Notification processed: ${notificationData.title}`);
    } catch (error) {
      console.error(`Notification worker error: ${error.message}`);
    }
  }
};