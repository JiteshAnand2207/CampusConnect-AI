import api from "./axios";

export const createSolution = async (problemId, solutionData) => {
  const response = await api.post(`/solutions/${problemId}`, solutionData);
  return response.data;
};

export const getSolutionsForProblem = async (problemId) => {
  const response = await api.get(`/solutions/${problemId}`);
  return response.data;
};

export const acceptSolution = async (solutionId) => {
  const response = await api.patch(`/solutions/${solutionId}/accept`);
  return response.data;
};

export const toggleSolutionUpvote = async (solutionId) => {
  const response = await api.patch(`/solutions/${solutionId}/upvote`);
  return response.data;
};