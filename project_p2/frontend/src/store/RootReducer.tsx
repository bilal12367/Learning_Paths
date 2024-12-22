import { combineReducers } from "@reduxjs/toolkit";
import TestSlice from "./features/TestFeature/TestSlice";


const RootReducer = combineReducers({
    test: TestSlice.reducer
})

export default RootReducer