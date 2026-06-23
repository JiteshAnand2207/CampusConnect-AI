import { createClient } from "redis";

let redisClient = null;
let redisConnected = false;

export const connectRedis = async () => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
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
    console.error(`Redis connection failed: ${error.message}`);
    console.log("Continuing without Redis cache");
  }
};

export const getRedisClient = () => redisClient;

export const isRedisConnected = () => redisConnected;