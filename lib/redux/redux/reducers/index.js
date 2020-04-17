import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

import reqResReducer from './restApi';


const AppName = 'MyApp'
export const REDUX_STATE_KEY = `${AppName}:rxState`;

const rootReducer = (history = null) => combineReducers({
    "reqRes" : reqResReducer,
    "hello" : (state,action) => {
        return "hello world"
    }
});

const persistConfig = {
    key: REDUX_STATE_KEY,
    storage: AsyncStorage,
    blacklist: ['navigation']
}

export default function genRootReducer(history){
    return persistReducer(persistConfig, rootReducer(history))
}