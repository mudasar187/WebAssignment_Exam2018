import thunk    from 'redux-thunk';
import promise  from 'redux-promise';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';

const middleware = [thunk, promise];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
