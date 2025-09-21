import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../const";

export const addToCart = (nft: any) => ({
  type: ADD_TO_CART,
  payload: nft,
});

export const removeFromCart = (nftId: number) => ({
  type: REMOVE_FROM_CART,
  payload: nftId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
