import axios from "axios";

const API_BASE = "http://localhost:8000/nfts";

// ✅ Fetch NFTs by collection
export const fetchNFTs = async (collectionId: string) => {
  const response = await axios.get(
    `${API_BASE}/collections/${collectionId}/nfts`
  );
  return response.data;
};

// ✅ Fetch all collections
export const fetchCollections = async () => {
  const response = await axios.get(`${API_BASE}/collections`);
  return response.data;
};

// ✅ Add new NFT
export const addNFT = async (
  collectionId: string,
  nftData: FormData,
  token: string
) => {
  const response = await axios.post(
    `${API_BASE}/collections/${collectionId}/nfts`,
    nftData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// ✅ Update NFT
export const updateNFT = async (
  nftId: string,
  nftData: FormData,
  token: string
) => {
  const res = await axios.put(`${API_BASE}/${nftId}`, nftData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Delete NFT
export const deleteNFT = async (nftId: string, token: string) => {
  const res = await axios.delete(`${API_BASE}/${nftId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
