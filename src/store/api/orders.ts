import axios from "axios";

const API_BASE = "http://localhost:8000/api";

// ✅ Place Order
export const placeOrder = async (nftId: string | number, token: string) => {
  const formData = new FormData();
  formData.append("nft_id", nftId.toString());

  const res = await axios.post(`${API_BASE}/orders`, formData, {
    headers: { Authorization: `Bearer ${token}` }, // no need for content-type, axios sets it
  });

  return res.data;
};

// ✅ Fetch all orders for a user
export const fetchOrders = async (token: string) => {
  const res = await axios.get(`${API_BASE}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
