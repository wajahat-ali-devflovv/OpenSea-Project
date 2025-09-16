import {
  FETCH_NFTS_REQUEST,
  FETCH_NFTS_SUCCESS,
  FETCH_NFTS_FAILURE,
} from "../const";
export const fetchNftsRequest = () => ({ type: FETCH_NFTS_REQUEST });
export const fetchNftsSuccess = (nfts: any[]) => ({
  type: FETCH_NFTS_SUCCESS,
  payload: nfts,
});
export const fetchNftsFailure = (error: string) => ({
  type: FETCH_NFTS_FAILURE,
  payload: error,
});
