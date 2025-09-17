import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { FETCH_COLLECTIONS_REQUEST } from "../const";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "../actions/collectionsActions";

function* fetchCollectionsSaga(): any {
  try {
    const res = yield call(axios.get, "http://localhost:8000/nfts/collections");
    yield put(fetchCollectionsSuccess(res.data));
  } catch (error: any) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* collectionsSaga() {
  yield takeLatest(FETCH_COLLECTIONS_REQUEST, fetchCollectionsSaga);
}
