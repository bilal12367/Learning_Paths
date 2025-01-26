import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createStoreHook } from "react-redux";
import RootReducer from "./RootReducer";
import AuthApi from "./features/AuthFeature/AuthApi";


const Store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(AuthApi.middleware)
})

export type IRootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch;
export default Store