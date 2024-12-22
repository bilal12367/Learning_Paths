import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createStoreHook } from "react-redux";
import RootReducer from "./RootReducer";


const Store = configureStore({
    reducer: RootReducer,

})

export type IRootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch;
export default Store