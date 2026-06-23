import dotenv from "dotenv";
import connectDB from "../config/db.js";
import { connectRedis } from "../config/redis.js";
import { processNotificationQueue } from "../utils/notificationQueue.js";

dotenv.config();

const startWorker = async () => {
  await connectDB();
  await connectRedis();

  await processNotificationQueue();
};

startWorker();