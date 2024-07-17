import { combineReducers } from '@reduxjs/toolkit'
import React from 'react'
import AuthSlice from './slices/AuthSlice'
import AuthApi from './rtk_query/AuthApi'

const RootReducer = combineReducers({
  authReducer: AuthSlice.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer
})

export default RootReducer