import { combineReducers } from '@reduxjs/toolkit'
import React from 'react'
import AuthSlice from './slices/AuthSlice'
import AuthApi from './rtk_query/AuthApi'
import SearchSlice from './slices/SearchSlice';
import AirportSearchApi from './rtk_query/AirportApi'

const RootReducer = combineReducers({
  authReducer: AuthSlice.reducer,
  searchState: SearchSlice.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [AirportSearchApi.reducerPath]: AirportSearchApi.reducer
})

export default RootReducer