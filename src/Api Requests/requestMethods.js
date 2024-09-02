import axios from "axios";

const BASE_URL = "https://trendycart-backend-production.up.railway.app/api/";

let cachedToken = null;

const getToken = () => {
  if (cachedToken) return cachedToken;

  try {
    const root = localStorage?.getItem("persist:root");
    if (!root) return null;

    const parsedRoot = JSON.parse(root);
    const user = parsedRoot?.user;
    if (!user) return null;

    const currentUser = JSON.parse(user)?.currentUser;
    cachedToken = currentUser?.accessToken || null;
    return cachedToken;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = () => {
  const token = getToken();
  return axios.create({
    baseURL: BASE_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

// To reset the cached token after login
export const resetTokenCache = () => {
  cachedToken = null;
};