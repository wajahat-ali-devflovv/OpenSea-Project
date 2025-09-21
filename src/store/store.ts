import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { nftSaga } from "./sagas/nftsagas";
import { nftReducer } from "./reducers/reducers";
import { all } from "redux-saga/effects";
import { collectionsSaga } from "./sagas/collectionsSaga";
import { collectionsReducer } from "./reducers/collectionsReducers";
import { authSaga } from "./sagas/authSaga";
import { authReducer } from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  nfts: nftReducer,
  collections: collectionsReducer,
  auth: authReducer,
  cart: cartReducer,
});

function* rootSaga() {
  yield all([collectionsSaga(), nftSaga(), authSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
