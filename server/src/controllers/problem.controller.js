import Problem from "../models/problem.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createProblem = asyncHandler(async (req, res) => {
  const { title, description, category, visibility, tags, attachments } =
    req.body;

  if (!title || !description || !category) {
    throw new ApiError(400, "Title, description and category are required");
  }

  const problem = await Problem.create({
    title,
    description,
    category,
    visibility: visibility === "private" ? "private" : "public",
    tags,
    attachments,
    postedBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, problem, "Problem created successfully"));
});

export const getPublicProblems = asyncHandler(async (req, res) => {
  const { category, search, status } = req.query;

  const query = {
    visibility: "public",
  };

  if (category) {
    query.category = category;
  }

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  const problems = await Problem.find(query)
    .populate("postedBy", "name email role department year")
    .populate("acceptedSolution")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, problems, "Public problems fetched"));
});

export const getMyProblems = asyncHandler(async (req, res) => {
  const problems = await Problem.find({ postedBy: req.user._id })
    .populate("postedBy", "name email role department year")
    .populate("acceptedSolution")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, problems, "My problems fetched"));
});

export const getAllProblemsForAdmin = asyncHandler(async (req, res) => {
  const { visibility, status, category } = req.query;

  const query = {};

  if (visibility) {
    query.visibility = visibility;
  }

  if (status) {
    query.status = status;
  }

  if (category) {
    query.category = category;
  }

  const problems = await Problem.find(query)
    .populate("postedBy", "name email role department year")
    .populate("assignedTo", "name email role")
    .populate("acceptedSolution")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, problems, "All problems fetched"));
});

export const getSingleProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id)
    .populate("postedBy", "name email role department year")
    .populate("assignedTo", "name email role")
    .populate("acceptedSolution");

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const isOwner = problem.postedBy._id.toString() === req.user._id.toString();
  const isAdminOrModerator =
    req.user.role === "admin" || req.user.role === "moderator";

  if (problem.visibility === "private" && !isOwner && !isAdminOrModerator) {
    throw new ApiError(403, "You are not allowed to view this private problem");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, problem, "Problem fetched successfully"));
});

export const updateProblemStatus = asyncHandler(async (req, res) => {
  const { status, assignedTo } = req.body;

  const allowedStatus = ["open", "in_progress", "resolved", "closed"];

  if (!allowedStatus.includes(status)) {
    throw new ApiError(400, "Invalid problem status");
  }

  const problem = await Problem.findById(req.params.id);

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const isOwner = problem.postedBy.toString() === req.user._id.toString();
  const isAdminOrModerator =
    req.user.role === "admin" || req.user.role === "moderator";

  if (!isOwner && !isAdminOrModerator) {
    throw new ApiError(403, "You are not allowed to update this problem");
  }

  problem.status = status;

  if (assignedTo && isAdminOrModerator) {
    problem.assignedTo = assignedTo;
  }

  await problem.save();

  return res
    .status(200)
    .json(new ApiResponse(200, problem, "Problem status updated"));
});

export const toggleProblemUpvote = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id);

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  if (problem.visibility === "private") {
    throw new ApiError(400, "Private problems cannot be upvoted");
  }

  const userId = req.user._id.toString();

  const alreadyUpvoted = problem.upvotes.some(
    (id) => id.toString() === userId
  );

  if (alreadyUpvoted) {
    problem.upvotes = problem.upvotes.filter(
      (id) => id.toString() !== userId
    );
  } else {
    problem.upvotes.push(req.user._id);
  }

  await problem.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        upvotesCount: problem.upvotes.length,
        upvoted: !alreadyUpvoted,
      },
      alreadyUpvoted ? "Problem upvote removed" : "Problem upvoted"
    )
  );
});