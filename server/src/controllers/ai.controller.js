import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { askCampusAI } from "../services/ai.service.js";

const getMockAIResponse = (question, user) => {
  return {
    answer: `CampusConnect AI mock response:

You asked: "${question}"

I am currently running in mock mode, so I can confirm that the AI route, authentication, frontend connection, and dashboard flow are working.

Current user:
Name: ${user?.name}
Role: ${user?.role}

When OPENAI_API_KEY is added and AI_MODE is changed to "openai", I will answer using real campus data like events, problems, and solutions.`,
    sources: [],
  };
};

export const askAI = asyncHandler(async (req, res) => {
  const { question } = req.body;

  if (!question || question.trim().length < 3) {
    throw new ApiError(400, "Question must be at least 3 characters long");
  }

  if (process.env.AI_MODE !== "openai") {
    const mockResult = getMockAIResponse(question, req.user);

    return res
      .status(200)
      .json(new ApiResponse(200, mockResult, "Mock AI response generated"));
  }

  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
    throw new ApiError(
      500,
      "AI service is not configured. Please add OPENAI_API_KEY and OPENAI_MODEL."
    );
  }

  const result = await askCampusAI({
    question,
    user: req.user,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "AI response generated"));
});