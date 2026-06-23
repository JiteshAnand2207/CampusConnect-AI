import Problem from "../models/problem.model.js";
import Solution from "../models/solution.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { enqueueNotification } from "../utils/notificationQueue.js";
export const createSolution = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const { description, attachments } = req.body;

  if (!description) {
    throw new ApiError(400, "Solution description is required");
  }

  const problem = await Problem.findById(problemId);

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  if (problem.visibility !== "public") {
    throw new ApiError(400, "Solutions can be posted only on public problems");
  }

  if (problem.status === "closed") {
    throw new ApiError(400, "Cannot post solution on a closed problem");
  }

  const solution = await Solution.create({
    problem: problemId,
    postedBy: req.user._id,
    description,
    attachments,
  });

  const populatedSolution = await Solution.findById(solution._id).populate(
    "postedBy",
    "name email role department year"
  );
await enqueueNotification({
  recipient: problem.postedBy,
  sender: req.user._id,
  title: "New solution posted",
  message: `${req.user.name} posted a solution on your problem "${problem.title}".`,
  type: "solution",
  link: `/problems/${problem._id}`,
});
  return res
    .status(201)
    .json(new ApiResponse(201, populatedSolution, "Solution posted"));
});

export const getSolutionsForProblem = asyncHandler(async (req, res) => {
  const { problemId } = req.params;

  const problem = await Problem.findById(problemId);

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  if (problem.visibility !== "public") {
    throw new ApiError(400, "Solutions are available only for public problems");
  }

  const solutions = await Solution.find({ problem: problemId })
    .populate("postedBy", "name email role department year")
    .sort({ isAccepted: -1, createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, solutions, "Solutions fetched"));
});

export const acceptSolution = asyncHandler(async (req, res) => {
  const { solutionId } = req.params;

  const solution = await Solution.findById(solutionId);

  if (!solution) {
    throw new ApiError(404, "Solution not found");
  }

  const problem = await Problem.findById(solution.problem);

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const isProblemOwner = problem.postedBy.toString() === req.user._id.toString();
  const isAdminOrModerator =
    req.user.role === "admin" || req.user.role === "moderator";

  if (!isProblemOwner && !isAdminOrModerator) {
    throw new ApiError(403, "You are not allowed to accept this solution");
  }

  await Solution.updateMany(
    { problem: problem._id },
    { $set: { isAccepted: false } }
  );

  solution.isAccepted = true;
  await solution.save();

  problem.acceptedSolution = solution._id;
  problem.status = "resolved";
  await problem.save();
await enqueueNotification({
  recipient: solution.postedBy,
  sender: req.user._id,
  title: "Solution accepted",
  message: `Your solution was accepted for the problem "${problem.title}".`,
  type: "solution",
  link: `/problems/${problem._id}`,
});
  const populatedSolution = await Solution.findById(solution._id).populate(
    "postedBy",
    "name email role department year"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, populatedSolution, "Solution accepted"));
});

export const toggleSolutionUpvote = asyncHandler(async (req, res) => {
  const { solutionId } = req.params;

  const solution = await Solution.findById(solutionId);

  if (!solution) {
    throw new ApiError(404, "Solution not found");
  }

  const userId = req.user._id.toString();

  const alreadyUpvoted = solution.upvotes.some(
    (id) => id.toString() === userId
  );

  if (alreadyUpvoted) {
    solution.upvotes = solution.upvotes.filter(
      (id) => id.toString() !== userId
    );
  } else {
    solution.upvotes.push(req.user._id);
  }

  await solution.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        upvotesCount: solution.upvotes.length,
        upvoted: !alreadyUpvoted,
      },
      alreadyUpvoted ? "Solution upvote removed" : "Solution upvoted"
    )
  );
});