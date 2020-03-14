// react
import { AsyncStorage } from "react-native";
// redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import user from "./user";
import task from "./task";
// redux-saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
// persistor
import { persistStore, persistReducer } from "redux-persist";

// persisit configuration
const persistConfig = {
  key: "taskData",
  storage: AsyncStorage,
  whitelist: ["taskData"]
};

// store
const configureStore = () => {
  const rootReducer = combineReducers({
    user,
    task: persistReducer(persistConfig, task)
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
    persistor: persistStore(store),
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;
