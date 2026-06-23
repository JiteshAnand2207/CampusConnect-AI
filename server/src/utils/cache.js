import { getRedisClient, isRedisConnected } from "../config/redis.js";

const DEFAULT_TTL_SECONDS = Number(process.env.CACHE_TTL_SECONDS) || 300;

export const getCache = async (key) => {
  try {
    if (!isRedisConnected()) return null;

    const redisClient = getRedisClient();
    const cachedData = await redisClient.get(key);

    if (!cachedData) return null;

    return JSON.parse(cachedData);
  } catch (error) {
    console.error(`Cache get failed: ${error.message}`);
    return null;
  }
};

export const setCache = async (key, value, ttl = DEFAULT_TTL_SECONDS) => {
  try {
    if (!isRedisConnected()) return;

    const redisClient = getRedisClient();

    await redisClient.set(key, JSON.stringify(value), {
      EX: ttl,
    });
  } catch (error) {
    console.error(`Cache set failed: ${error.message}`);
  }
};

export const deleteCache = async (key) => {
  try {
    if (!isRedisConnected()) return;

    const redisClient = getRedisClient();
    await redisClient.del(key);
  } catch (error) {
    console.error(`Cache delete failed: ${error.message}`);
  }
};

export const deleteCacheByPattern = async (pattern) => {
  try {
    if (!isRedisConnected()) return;

    const redisClient = getRedisClient();

    const keys = await redisClient.keys(pattern);

    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error(`Cache pattern delete failed: ${error.message}`);
  }
};