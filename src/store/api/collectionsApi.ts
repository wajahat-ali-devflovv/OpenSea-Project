import axios from "axios";

const API_BASE = "http://localhost:8000";

export const addCollectionApi = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_BASE}/nfts/collections`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
