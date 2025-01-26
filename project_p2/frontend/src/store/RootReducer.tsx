import { combineReducers } from "@reduxjs/toolkit";
import TestSlice from "./features/TestFeature/TestSlice";
import ThemeSlice from "./features/Theme/ThemeSlice";
import authSlice from "./features/AuthFeature/AuthSlice";
import AuthApi from "./features/AuthFeature/AuthApi";


const RootReducer = combineReducers({
    test: TestSlice.reducer,
    theme: ThemeSlice.reducer,
    auth: authSlice.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer
})

export default RootReducer