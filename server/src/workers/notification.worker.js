import dotenv from "dotenv";
import connectDB from "../config/db.js";
import { connectRedis, isRedisConnected } from "../config/redis.js";
import { processNotificationQueue } from "../utils/notificationQueue.js";

dotenv.config();

const startWorker = async () => {
  if (process.env.REDIS_ENABLED !== "true") {
    console.log("Redis is disabled. Notification worker is not required.");
    console.log("Run only npm run dev for now.");
    process.exit(0);
  }

  await connectDB();
  await connectRedis();

  if (!isRedisConnected()) {
    console.log("Redis is not running. Worker stopped safely.");
    console.log("Start Redis first, then run: npm run worker");
    process.exit(0);
  }

  await processNotificationQueue();
};

startWorker();