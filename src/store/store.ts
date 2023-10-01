import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
  Middleware,
} from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const sagaMiddleware = createSagaMiddleware();
const middlewares = [!import.meta.env.PROD && logger, sagaMiddleware].filter(
  (middleware): middleware is Middleware => Boolean(middleware)
);

const composerEnhancer =
  (!import.meta.env.PROD &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composerEnhancer(applyMiddleware(...middlewares));

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};
const persistConfig: ExtendedPersistConfig = {
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
