import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { removeFromCart, clearCart } from "../store/actions/cartActions";
import Button from "@mui/material/Button";
import { placeOrder } from "../store/api/orders"; // 👈 import new API

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { token } = useSelector((state: RootState) => state.auth);

  const handleBuy = async () => {
    try {
      if (!token) {
        alert("You must be logged in to place an order.");
        return;
      }

      for (let nft of cartItems) {
        await placeOrder(nft.id, token);
      }

      alert("Purchase successful!");
      dispatch(clearCart());
      window.location.href =
        "/collections/" + cartItems[0].collection_id + "/nfts";
    } catch (err) {
      console.error(err);
      alert("Error buying NFTs");
    }
  };

  if (cartItems.length === 0) {
    return (
      <h2 style={{ color: "white", textAlign: "center" }}>
        Your cart is empty
      </h2>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-white font-bold text-[20px]">Your Cart:</h2>
      {cartItems.map((nft) => (
        <div
          key={nft.id}
          style={{
            margin: "0",
          }}
          className="bg-[#000000] text-white p-[5px] mx-[10px]"
        >
          <h3>{nft.name}</h3>
          <p>{nft.price} ETH</p>
          <Button
            variant="outlined"
            color="error"
            sx={{ marginTop: "10px" }}
            onClick={() => dispatch(removeFromCart(nft.id))}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "10px" }}
        onClick={handleBuy}
      >
        Buy All
      </Button>
    </div>
  );
};

export default CartPage;
