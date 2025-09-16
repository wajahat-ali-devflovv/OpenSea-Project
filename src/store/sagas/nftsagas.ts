import { call, put, takeLatest } from "redux-saga/effects";
import { fetchNFTs } from "../api/nftApi";
import { FETCH_NFTS_REQUEST } from "../const";
import { fetchNftsSuccess, fetchNftsFailure } from "../actions/nftsActions";
function* fetchNftsSaga(): any {
  try {
    const nfts = yield call(fetchNFTs);
    yield put(fetchNftsSuccess(nfts));
  } catch (error: any) {
    yield put(fetchNftsFailure(error.message));
  }
}

export function* nftSaga() {
  yield takeLatest(FETCH_NFTS_REQUEST, fetchNftsSaga);
}
