import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './rootReducer';
import { socketMiddleware } from './Websocket/socketMiddleware';
import { WS_URL } from '../constants';
import { WS_ACTIONS } from './Websocket/ws-types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk, 
    socketMiddleware(WS_URL, WS_ACTIONS)
  )
);
const store = createStore(rootReducer, enhancer);

export default store;
