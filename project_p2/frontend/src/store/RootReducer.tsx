import { combineReducers } from "@reduxjs/toolkit";
import TestSlice from "./features/TestFeature/TestSlice";
import ThemeSlice from "./features/Theme/ThemeSlice";
import authSlice from "./features/AuthFeature/AuthSlice";
import AuthApi from "./features/AuthFeature/AuthApi";
import ServerApi from "./features/ServerFeature/ServerApi";
import serverSlice from "./features/ServerFeature/ServerSlice";
import FileApi from "./features/FileFeature/FileApi";
import dialogManagerSlice from "./ui_features/DialogManager/DialogManagerSlice";


const RootReducer = combineReducers({
    test: TestSlice.reducer,
    theme: ThemeSlice.reducer,
    auth: authSlice.reducer,
    server: serverSlice.reducer,
    dialogManager: dialogManagerSlice.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [ServerApi.reducerPath]: ServerApi.reducer,
    [FileApi.reducerPath]: FileApi.reducer
})

export default RootReducer