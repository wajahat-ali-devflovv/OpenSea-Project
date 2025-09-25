import axios from "axios";

const API_BASE = "http://localhost:8000";

// Signup API with JSON
export const signupApi = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API_BASE}/auth/signup`, {
    username,
    email,
    password,
  });
  return response.data;
};

// Login API with JSON
export const loginApi = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE}/auth/login`, {
    email,
    password,
  });
  return response.data;
};
