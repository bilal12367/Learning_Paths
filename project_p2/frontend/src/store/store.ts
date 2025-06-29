import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createStoreHook } from "react-redux";
import RootReducer from "./RootReducer";
import AuthApi from "./features/AuthFeature/AuthApi";
import ServerApi from "./features/ServerFeature/ServerApi";
import FileApi from "./features/FileFeature/FileApi";


const Store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(AuthApi.middleware)
        .concat(ServerApi.middleware)
        .concat(FileApi.middleware)
})

export type IRootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch;
export default Store