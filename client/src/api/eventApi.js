import api from "./axios";

export const getEvents = async (params = {}) => {
  const response = await api.get("/events", { params });
  return response.data;
};

export const getEventById = async (eventId) => {
  const response = await api.get(`/events/${eventId}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post("/events", eventData);
  return response.data;
};

export const getMyEvents = async () => {
  const response = await api.get("/events/my");
  return response.data;
};

export const approveEvent = async (eventId) => {
  const response = await api.patch(`/events/${eventId}/approve`);
  return response.data;
};

export const rejectEvent = async (eventId, rejectionReason) => {
  const response = await api.patch(`/events/${eventId}/reject`, {
    rejectionReason,
  });
  return response.data;
};