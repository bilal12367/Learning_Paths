import React from 'react'
import Header from '../components/service_components/Header/Header'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRootState } from '../store/store'
import { getGrad } from '../store/features/Theme/Themes'

const Home = () => {
  const theme = useSelector((state: IRootState) => state.theme)
  return (
    <React.Fragment>
      <section style={{width:'100%',height: '100%', background: getGrad(theme.colors.grad1, 120)}} >
        
      </section>
      <section style={{width:'100%',height: '100%', background: theme.colors.b1}} >

      </section>
    </React.Fragment>
  )
}

export default Home