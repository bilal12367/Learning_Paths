import { combineReducers } from "@reduxjs/toolkit";
import TestSlice from "./features/TestFeature/TestSlice";
import ThemeSlice from "./features/Theme/ThemeSlice";


const RootReducer = combineReducers({
    test: TestSlice.reducer,
    theme: ThemeSlice.reducer
})

export default RootReducer