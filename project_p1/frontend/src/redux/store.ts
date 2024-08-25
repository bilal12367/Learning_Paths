import { configureStore } from "@reduxjs/toolkit"
import RootReducer from "./RootReducer"
import AuthApi from "./rtk_query/AuthApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import AirportSearchApi from "./rtk_query/AirportApi";


export const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(AuthApi.middleware)
            .concat(AirportSearchApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;