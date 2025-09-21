import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { FETCH_COLLECTIONS_REQUEST, ADD_COLLECTION_REQUEST } from "../const";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
  addCollectionSuccess,
  addCollectionFailure,
} from "../actions/collectionsActions";
import { addCollectionApi } from "../api/collectionsApi";

function* fetchCollectionsSaga(): any {
  try {
    const res = yield call(axios.get, "http://localhost:8000/nfts/collections");
    yield put(fetchCollectionsSuccess(res.data));
  } catch (error: any) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

function* addCollectionSaga(action: any): any {
  try {
    const data = yield call(addCollectionApi, action.payload);
    yield put(addCollectionSuccess(data));
  } catch (error: any) {
    yield put(
      addCollectionFailure(
        error.response?.data?.detail || "Add collection failed"
      )
    );
  }
}

export function* collectionsSaga() {
  yield takeLatest(FETCH_COLLECTIONS_REQUEST, fetchCollectionsSaga);
  yield takeLatest(ADD_COLLECTION_REQUEST, addCollectionSaga);
}
