import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { nftSaga } from "./sagas/nftsagas";
import { nftReducer } from "./reducers/reducers";
import { all } from "redux-saga/effects";
import { collectionsSaga } from "./sagas/collectionsSaga";
import { collectionsReducer } from "./reducers/collectionsReducers";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  nfts: nftReducer,
  collections: collectionsReducer,
});

function* rootSaga() {
  yield all([collectionsSaga(), nftSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
