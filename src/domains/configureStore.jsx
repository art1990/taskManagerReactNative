//redux
import { createStore, combineReducers, applyMiddleware } from "redux";
//reducers
import user from "./user";
//redux-saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const configureStore = () => {
  const rootReducer = combineReducers({ user });
  const sagaMiddleware = createSagaMiddleware();

  return {
    ...createStore(
      rootReducer,

      applyMiddleware(sagaMiddleware)
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;
