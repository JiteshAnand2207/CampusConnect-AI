import { createClient } from "redis";

let redisClient = null;
let redisConnected = false;

export const connectRedis = async () => {
  const redisEnabled = process.env.REDIS_ENABLED === "true";

  if (!redisEnabled) {
    redisConnected = false;
    redisClient = null;
    console.log("Redis disabled. Continuing without cache and queue.");
    return;
  }

  try {
    redisClient = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
      socket: {
        reconnectStrategy: false,
      },
    });

    redisClient.on("error", (error) => {
      redisConnected = false;
      console.error(`Redis error: ${error.message}`);
    });

    redisClient.on("connect", () => {
      console.log("Redis connecting...");
    });

    redisClient.on("ready", () => {
      redisConnected = true;
      console.log("Redis connected");
    });

    redisClient.on("end", () => {
      redisConnected = false;
      console.log("Redis connection closed");
    });

    await redisClient.connect();
  } catch (error) {
    redisConnected = false;
    redisClient = null;

    console.error(`Redis connection failed: ${error.message}`);
    console.log("Continuing without Redis cache and queue.");
  }
};

export const getRedisClient = () => redisClient;

export const isRedisConnected = () => redisConnected;