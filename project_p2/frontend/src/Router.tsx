import React from 'react'
import {Routes, Route, BrowserRouter as MainRouter, Navigate } from 'react-router-dom'
import Test from './pages/Test'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Auth from './pages/auth/Auth'


const Router = () => {
  return (
    <MainRouter>
        <Routes>
          <Route path="/auth" Component={Auth}>
            <Route path="register" Component={Register}/>
            <Route path="login" Component={Login}/>
          </Route>
            <Route path="" element={<Navigate to="/home" />} />
            <Route index path='home' Component={Test} />
        </Routes>

    </MainRouter>
  )
}

export default Router