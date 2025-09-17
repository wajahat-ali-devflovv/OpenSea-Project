import {
  FETCH_COLLECTIONS_REQUEST,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
} from "../const";

interface CollectionsState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CollectionsState = {
  items: [],
  loading: false,
  error: null,
};

export const collectionsReducer = (
  state = initialState,
  action: any
): CollectionsState => {
  switch (action.type) {
    case FETCH_COLLECTIONS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COLLECTIONS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_COLLECTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
