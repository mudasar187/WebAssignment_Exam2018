import thunk from "redux-thunk";
import promise from "redux-promise";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";

const middleware = [thunk, promise];

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
