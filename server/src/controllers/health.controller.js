import mongoose from "mongoose";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const healthCheck = asyncHandler(async (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        server: "running",
        database: dbStatus,
      },
      "Health check passed"
    )
  );
});