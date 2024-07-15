import { combineReducers } from '@reduxjs/toolkit'
import React from 'react'
import AuthSlice from './slices/AuthSlice'

const RootReducer = combineReducers({
  authReducer: AuthSlice.reducer
})

export default RootReducer