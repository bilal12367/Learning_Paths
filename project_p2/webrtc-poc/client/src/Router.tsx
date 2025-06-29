import React from 'react'
import {Routes, Route, BrowserRouter as MainRouter } from 'react-router-dom'
import Test from './pages/Test'
import Room from './pages/Room'



const Router = () => {
  return (
    <MainRouter>
        <Routes>
            <Route path='/' Component={Test} />
            <Route path='user/:userId/room/:roomId' Component={Room} />
        </Routes>

    </MainRouter>
  )
}

export default Router