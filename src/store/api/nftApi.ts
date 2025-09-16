import axios from "axios";

const API_BASE = "http://localhost:8000"; // FastAPI backend

export const fetchNFTs = async () => {
  const response = await axios.get(`${API_BASE}/nfts`);
  return response.data;
};
