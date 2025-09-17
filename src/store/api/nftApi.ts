import axios from "axios";

const API_BASE = "http://localhost:8000";

export const fetchNFTs = async (collectionId: string) => {
  const response = await axios.get(
    `${API_BASE}/nfts/collections/${collectionId}/nfts`
  );
  return response.data;
};

// Fetch all collections
export const fetchCollections = async () => {
  const response = await axios.get(`${API_BASE}/nfts/collections`);
  return response.data;
};
