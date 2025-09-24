import {
  FETCH_NFTS_REQUEST,
  FETCH_NFTS_SUCCESS,
  FETCH_NFTS_FAILURE,
  ADD_NFT_SUCCESS,
  ADD_NFT_FAILURE,
  UPDATE_NFT_SUCCESS,
  UPDATE_NFT_FAILURE,
  DELETE_NFT_SUCCESS,
  DELETE_NFT_FAILURE,
} from "../const";

interface NftState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NftState = {
  items: [],
  loading: false,
  error: null,
};

export const nftsReducer = (state = initialState, action: any): NftState => {
  switch (action.type) {
    case FETCH_NFTS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_NFTS_SUCCESS:
      return { ...state, loading: false, items: action.payload };

    case FETCH_NFTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_NFT_SUCCESS:
      return { ...state, items: [...state.items, action.payload] };

    case ADD_NFT_FAILURE:
      return { ...state, error: action.payload };

    case UPDATE_NFT_SUCCESS:
      return {
        ...state,
        items: state.items.map((nft) =>
          nft.id === action.payload.id ? action.payload : nft
        ),
      };

    case UPDATE_NFT_FAILURE:
      return { ...state, error: action.payload };

    case DELETE_NFT_SUCCESS:
      return {
        ...state,
        items: state.items.filter((nft) => nft.id !== action.payload),
      };

    case DELETE_NFT_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
