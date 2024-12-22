import React from 'react'
import {Routes, Route, BrowserRouter as MainRouter } from 'react-router-dom'
import Test from './pages/Test'


const Router = () => {
  return (
    <MainRouter>
        <Routes>
            <Route path='home' Component={Test} />
        </Routes>

    </MainRouter>
  )
}

export default Router