import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [!import.meta.env.PROD && logger, sagaMiddleware].filter(
  Boolean
);

const composerEnhancer =
  (!import.meta.env.PROD &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composerEnhancer(applyMiddleware(...middlewares));
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
