import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore } from 'redux-persist'

import genRootReducer from '../reducers';

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
});

const middlewares = [ 
    thunkMiddleware, 
    logger,
];

export const store = createStore(genRootReducer(), {},  composeEnhancers(
    applyMiddleware(...middlewares)
));

export const persistor = persistStore(store);
