import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./index";
import rootSaga from "../sagas/root";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
