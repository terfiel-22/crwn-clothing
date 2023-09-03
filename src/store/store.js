import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

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

export const store = createStore(rootReducer, undefined, composedEnhancers);
