import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { nftSaga } from "./sagas/nftsagas";
import { nftReducer } from "./reducers/reducers";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  nfts: nftReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(nftSaga);
