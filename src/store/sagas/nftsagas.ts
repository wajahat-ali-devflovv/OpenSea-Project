import { call, put, takeLatest } from "redux-saga/effects";
import { fetchNFTs, addNFT, updateNFT, deleteNFT } from "../api/nftApi";
import {
  FETCH_NFTS_REQUEST,
  ADD_NFT_REQUEST,
  ADD_NFT_SUCCESS,
  ADD_NFT_FAILURE,
  UPDATE_NFT_REQUEST,
  UPDATE_NFT_SUCCESS,
  UPDATE_NFT_FAILURE,
  DELETE_NFT_REQUEST,
  DELETE_NFT_SUCCESS,
  DELETE_NFT_FAILURE,
} from "../const";
import { fetchNftsSuccess, fetchNftsFailure } from "../actions/nftsActions";
function* fetchNftsSaga(action: any): any {
  try {
    const data = yield call(fetchNFTs, action.payload);
    yield put(fetchNftsSuccess(data));
  } catch (error: any) {
    yield put(fetchNftsFailure(error.message));
  }
}

function* addNftSaga(action: any): any {
  try {
    const { collectionId, nftData, token } = action.payload;
    const newNFT = yield call(addNFT, collectionId, nftData, token);
    yield put({ type: ADD_NFT_SUCCESS, payload: newNFT });
  } catch (error: any) {
    yield put({ type: ADD_NFT_FAILURE, payload: error.message });
  }
}

function* updateNftSaga(action: any): any {
  try {
    const { nftId, nftData, token } = action.payload;
    const updatedNFT = yield call(updateNFT, nftId, nftData, token);
    yield put({ type: UPDATE_NFT_SUCCESS, payload: updatedNFT });
  } catch (error: any) {
    yield put({ type: UPDATE_NFT_FAILURE, payload: error.message });
  }
}

function* deleteNftSaga(action: any): any {
  try {
    const { nftId, token } = action.payload;
    yield call(deleteNFT, nftId, token);
    yield put({ type: DELETE_NFT_SUCCESS, payload: nftId });
  } catch (error: any) {
    yield put({ type: DELETE_NFT_FAILURE, payload: error.message });
  }
}

export function* nftSaga() {
  yield takeLatest(FETCH_NFTS_REQUEST, fetchNftsSaga);
  yield takeLatest(ADD_NFT_REQUEST, addNftSaga);
  yield takeLatest(UPDATE_NFT_REQUEST, updateNftSaga);
  yield takeLatest(DELETE_NFT_REQUEST, deleteNftSaga);
}
