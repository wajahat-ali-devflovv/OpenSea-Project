import { call, put, takeLatest } from "redux-saga/effects";
import { fetchNFTs } from "../api/nftApi";
import { FETCH_NFTS_REQUEST } from "../const";
import { fetchNftsSuccess, fetchNftsFailure } from "../actions/nftsActions";
function* fetchNftsSaga(action: any): any {
  try {
    const data = yield call(fetchNFTs, action.payload);
    yield put(fetchNftsSuccess(data));
  } catch (error: any) {
    yield put(fetchNftsFailure(error.message));
  }
}

export function* nftSaga() {
  yield takeLatest(FETCH_NFTS_REQUEST, fetchNftsSaga);
}
