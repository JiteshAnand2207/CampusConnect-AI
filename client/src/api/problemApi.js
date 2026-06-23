import api from "./axios";

export const createProblem = async (problemData) => {
  const response = await api.post("/problems", problemData);
  return response.data;
};

export const getPublicProblems = async (params = {}) => {
  const response = await api.get("/problems", { params });
  return response.data;
};

export const getMyProblems = async () => {
  const response = await api.get("/problems/my");
  return response.data;
};

export const getAllProblemsForAdmin = async (params = {}) => {
  const response = await api.get("/problems/admin/all", { params });
  return response.data;
};

export const getProblemById = async (problemId) => {
  const response = await api.get(`/problems/${problemId}`);
  return response.data;
};

export const updateProblemStatus = async (problemId, statusData) => {
  const response = await api.patch(`/problems/${problemId}/status`, statusData);
  return response.data;
};

export const toggleProblemUpvote = async (problemId) => {
  const response = await api.patch(`/problems/${problemId}/upvote`);
  return response.data;
};
