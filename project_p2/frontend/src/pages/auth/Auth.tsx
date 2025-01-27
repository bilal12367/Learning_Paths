import React, { CSSProperties, FormEvent, FormEventHandler, HTMLInputTypeAttribute, useCallback, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import loginIllus from '../../assets/images/login_illus_1.png'
import LoginRect from '../../assets/images/login_rect.png'
import './Auth.css'
import Selectors from '../../store/Selectors';
import Login from './Login';
import Register from './Register';
import Link_Selector from '../../components/service_components/Header/Link_Selector';


const Auth = () => {
  const theme = useSelector(Selectors.selectTheme)
  const parentRef = useRef<any>(null)
  const [page, setPage] = useState(0)

  return (
    <React.Fragment>
      <div className='vh-100 w-100 d-flex flex-row align-items-center'>
        <div className='imgCont d-flex justify-content-center align-items-center w-100 h-100' >
          <img height={'40%'} src={loginIllus} />
        </div>
        <div className='formCont w-100 h-100 position-relative' style={{ overflow: 'hidden' }}>
          <img className='position-absolute' style={{ zIndex: -3, objectFit: 'cover' }} height={'100%'} src={LoginRect} />
          <div className='h-100 w-100 d-flex justify-content-center' style={{ padding: '10rem 0' }}>

            <div className='d-flex flex-column z-3' style={{ width: '40%', overflowX: 'hidden' }}>
              <div className='d-flex justify-content-center'><span className='head1'>
                <Link_Selector linkStyle={{ fontSize: 28, sliderOffset: 42, sliderWidth: 200 }} links={[{ path: './login', title: 'Login' }, { path: './register', title: 'Register' }]} />
              </span></div>
              <div style={{ overflow: 'hidden' }} className='d-flex position-relative h-100'>
                <div className='page-slider position-absolute d-flex h-100 w-100' style={{ left: "-" + page * 100 + "%" }}>
                  <div className='page'>
                    <Login />
                  </div>
                  <div className='page'>
                    <Register />
                  </div>
                </div>
              </div>
              <button onClick={() => { setPage(page + 1) }}>Next</button>
              <button onClick={() => { setPage(page - 1) }}>Previous</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Auth