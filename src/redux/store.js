import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './root-reducer'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware();

// dev only!
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware, logger)
);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store