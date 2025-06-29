import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/service_components/Header/Header'
import './pages.css'
const Starter = () => {
    const nav = useNavigate()
    useEffect(() => { nav('./home') }, [])
    return (
        <React.Fragment>
            <div className='hidden-scroll' style={{ height: '100vh', position: 'relative',overflow:'hidden' }}>
                <Header styles={{ position: 'absolute', top: 0 }} />
                <div className='hidden-scroll' style={{ height: '100%', overflowY: 'scroll' }}>
                    <Outlet />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Starter