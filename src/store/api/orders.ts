import axios from "axios";

const API_BASE = "http://localhost:8000/api";

// ✅ Place Order with JSON
export const placeOrder = async (nftId: string | number, token: string) => {
  const res = await axios.post(
    `${API_BASE}/orders`,
    { nft_id: nftId }, // plain JSON
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};

// ✅ Fetch all orders for a user
export const fetchOrders = async (token: string) => {
  const res = await axios.get(`${API_BASE}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
