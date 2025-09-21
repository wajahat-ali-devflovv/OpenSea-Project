import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../const";

const initialState = {
  items: [] as any[], // NFTs stored here
};

export const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Prevent duplicates
      if (state.items.find((nft) => nft.id === action.payload.id)) return state;
      return { ...state, items: [...state.items, action.payload] };

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((nft) => nft.id !== action.payload),
      };

    case CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
};
