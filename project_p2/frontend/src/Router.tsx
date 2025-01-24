import React, { useEffect } from 'react'
import { Routes, Route, BrowserRouter as MainRouter, Navigate } from 'react-router-dom'
import Test from './pages/Test'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Auth from './pages/auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import Actions from './store/RootAction'
import { IRootState } from './store/store'
import Home from './pages/Home'
import Download from './pages/Download'
import Servers from './pages/Servers'
import AboutUs from './pages/AboutUs'
import Starter from './pages/Starter'
import Selectors from './store/Selectors'


const Router = () => {
  return (
    <MainRouter>
      <Routes>
        <Route path="/auth" Component={Auth}>
          <Route path="register" Component={Register} />
          <Route path="login" Component={Login} />
        </Route>
        <Route path="" Component={Starter}>
          <Route path="register" Component={Register} />
          <Route path="login" Component={Login} />
          <Route index path='home' Component={Home} />
          <Route path='download' Component={Download} />
          <Route path='servers' Component={Servers} />
          <Route path='aboutus' Component={AboutUs} />
        </Route>
      </Routes>

    </MainRouter>
  )
}

export default Router