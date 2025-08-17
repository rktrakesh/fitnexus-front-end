import axios from "axios";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (userId) {
    config.headers["X_USER_ID"] = userId;
  }
  return config;
});

export const getActivities = async () => {
  return api.get("api/activity/getActivitiesByUserId");
};

export const addActivity = async (activity) => {
  return api.post("api/activity/addActivities", activity);
};

export const getActivityById = async (id) => {
  return api.get(`api/recommendations/getRecommendationByActivityId/${id}`);
};
