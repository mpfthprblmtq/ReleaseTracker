import {configureStore} from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import {combineReducers} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import artistSlice from "./slices/artistSlice.ts";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const reducer = combineReducers({
  artistStore: artistSlice
});
const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});