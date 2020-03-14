//redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//reducers
import user from "./user";
import task from "./task";
//redux-saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const configureStore = () => {
  const rootReducer = combineReducers({ user, task });
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return {
    ...createStore(
      rootReducer,

      composeEnhancers(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;
