import {
  FETCH_NFTS_REQUEST,
  FETCH_NFTS_SUCCESS,
  FETCH_NFTS_FAILURE,
  ADD_NFT_REQUEST,
  UPDATE_NFT_REQUEST,
  DELETE_NFT_REQUEST,
} from "../const";
export const fetchNftsRequest = (collection: string) => ({
  type: FETCH_NFTS_REQUEST,
  payload: collection,
});
export const fetchNftsSuccess = (nfts: any[]) => ({
  type: FETCH_NFTS_SUCCESS,
  payload: nfts,
});
export const fetchNftsFailure = (error: string) => ({
  type: FETCH_NFTS_FAILURE,
  payload: error,
});

export const addNftRequest = (
  collectionId: string,
  nftData: FormData,
  token: string
) => ({
  type: ADD_NFT_REQUEST,
  payload: { collectionId, nftData, token },
});
export const updateNftRequest = (
  nftId: string,
  nftData: FormData,
  token: string
) => ({
  type: UPDATE_NFT_REQUEST,
  payload: { nftId, nftData, token },
});
export const deleteNftRequest = (nftId: string, token: string) => ({
  type: DELETE_NFT_REQUEST,
  payload: { nftId, token },
});
