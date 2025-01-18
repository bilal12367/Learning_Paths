import React from 'react'
import LoginIllus from '../../assets/images/login_illus_1.png';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import Header from '../../components/service_components/Header';
const Login = () => {
  const theme = useSelector((state: IRootState) => state.theme)
  return (
    <React.Fragment>
      <section>
      </section>
    </React.Fragment>
  )
}

export default Login