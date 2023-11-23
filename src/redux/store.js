import {
  combineReducers, // import the function to combine multiple reducers into one
  configureStore, // import the function to create a Redux store
  getDefaultMiddleware, // import the function to get the default middleware for Redux Toolkit
} from "@reduxjs/toolkit"; // import these functions from the Redux Toolkit library

import { persistReducer } from "redux-persist"; // import the function to create a persisting reducer
import storage from "redux-persist/lib/storage"; // import the default storage engine for redux-persist
import persistStore from "redux-persist/es/persistStore"; // import the function to create a persistor for the store

import userReducer from "./user/userSlice"; // import the user reducer from the user slice file

const rootReducer = combineReducers({ user: userReducer }); // create a root reducer by combining the user reducer

const persistConfig = {
  key: "root", // specify the key for the persisting reducer
  storage, //using localstorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer with the config and the root reducer

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // specify the middleware for the store, disabling the serializable check
});
export const persistor = persistStore(store); // create a persistor for the store and export it
