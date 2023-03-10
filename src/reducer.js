import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import addsubReducer from './reducers/addsub'
import countingReducer from './reducers/counting'
import userReducer from './reducers/user'

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"]
};

const rootReducer = combineReducers({
    value: addsubReducer,
    count: countingReducer,
    user: userReducer
})

export default persistReducer(persistConfig, rootReducer)