// redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import user from "./user";
import task from "./task";
// redux-saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

// store
const configureStore = () => {
  const rootReducer = combineReducers({
    user,
    task
  });

  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,

    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  return {
    store,
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;
