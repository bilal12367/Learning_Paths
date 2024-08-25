import { combineReducers } from '@reduxjs/toolkit'
import React from 'react'
import AuthSlice from './slices/AuthSlice'
import AuthApi from './rtk_query/AuthApi'
import AirportSearchApi from './rtk_query/AirportApi'

const RootReducer = combineReducers({
  authReducer: AuthSlice.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [AirportSearchApi.reducerPath]: AirportSearchApi.reducer
})

export default RootReducer