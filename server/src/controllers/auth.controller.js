import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendToken from "../utils/sendToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, department, year } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const allowedPublicRoles = ["student", "organizer"];
const safeRole = allowedPublicRoles.includes(role) ? role : "student";

const user = await User.create({
  name,
  email,
  password,
  role: safeRole,
  department,
  year,
});

  const createdUser = await User.findById(user._id);

  return sendToken(createdUser, 201, res, "User registered successfully");
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const loggedInUser = await User.findById(user._id);

  return sendToken(loggedInUser, 200, res, "User logged in successfully");
});

export const logoutUser = asyncHandler(async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});