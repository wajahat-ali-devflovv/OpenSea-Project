import {
  FETCH_NFTS_REQUEST,
  FETCH_NFTS_SUCCESS,
  FETCH_NFTS_FAILURE,
} from "../const";

interface NFTState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NFTState = {
  items: [],
  loading: false,
  error: null,
};

export const nftReducer = (state = initialState, action: any): NFTState => {
  switch (action.type) {
    case FETCH_NFTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_NFTS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_NFTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
