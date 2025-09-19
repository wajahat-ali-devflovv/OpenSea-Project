import axios from "axios";

const API_BASE = "http://localhost:8000";

// Signup API
export const signupApi = async (
  username: string,
  email: string,
  password: string
) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  const response = await axios.post(`${API_BASE}/auth/signup`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Login API
export const loginApi = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const response = await axios.post(`${API_BASE}/auth/login`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
