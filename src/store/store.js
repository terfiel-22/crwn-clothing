import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

function logger(store) {
  return function (next) {
    return function (action) {
      if (!action.type) {
        return next(action);
      }
      console.log("type: ", action.type);
      console.log("payload: ", action.payload);
      console.log("currentState: ", store.getState());

      next(action);
      console.log("next state: ", store.getState());
    };
  };
}

const middlewares = [logger];

const composedEnhancers = compose(applyMiddleware(...middlewares));

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
export const persistor = persistStore(store);
