import React, { CSSProperties, FormEvent, FormEventHandler, HTMLInputTypeAttribute, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import loginIllus from '../../assets/images/login_illus_1.png'
import LoginRect from '../../assets/images/login_rect.png'
import LockIcon from '../../assets/icons/Lock.png'
import EmailIcon from '../../assets/icons/Email.png'
import './Login.css'
import { IRootState } from '../../store/store';
import Selectors from '../../store/Selectors';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { ButtonBase, IconButton, IconTypeMap, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Input from '../../components/ui_components/Input';
import { useLoginApiMutation } from '../../store/features/AuthFeature/AuthApi';
import { getGrad } from '../../store/features/Theme/Themes';

interface ILoginFormState {
  email: string,
  password: string
}

const Login = () => {
  const theme = useSelector(Selectors.selectTheme)
  const authInfo = useSelector(Selectors.selectAuth)
  const styles: { [key: string]: CSSProperties } = {
    inputStyle: {
      background: getGrad(theme.colors.grad1, 300),
      boxShadow: theme.shadows.heavy,
      borderRadius: '8px',
      padding: '8px 0px 8px 55px'
    },
    submitBtnStyle: { borderRadius: 100, padding: '10px 46px', backgroundColor: theme.colors.secondary }
  }

  const [loginApi, loginApiState] = useLoginApiMutation();

  const [formState, setFormState] = useState<ILoginFormState | {}>({
    email: 'test1@gmail.com',
    password: 'Test@1234'
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }


  const submitLogin = (e: FormEvent) => {
    e.preventDefault()
    console.log("Triggered")
    loginApi(formState)
  }

  return (
    <React.Fragment>
      <div className='vh-100 w-100 d-flex flex-row align-items-center'>
        <div className='imgCont d-flex justify-content-center align-items-center w-100 h-100' >
          <img height={'40%'} src={loginIllus} />
        </div>
        <div className='formCont w-100 h-100 position-relative' style={{ overflow: 'hidden' }}>
          <img className='position-absolute' style={{ zIndex: -3, objectFit: 'cover' }} height={'100%'} src={LoginRect} />
          <div className='h-100 w-100 d-flex justify-content-center' style={{ padding: '10rem 0' }}>
          
            <div className='d-flex flex-column z-3' style={{ width: '40%' }}>
              <div className='d-flex justify-content-center'><span className='head1'>Login / Register</span></div>

              <form className='d-flex flex-column mt-5' onSubmit={submitLogin} >
                <Input
                  containerStyle={{ marginTop: 20 }}
                  type='email'
                  onChange={handleChange}
                  icon={EmailRoundedIcon}
                  name="email"
                  fullWidth={true}
                  placeHolder={"Enter Email: Eg. xyz@gmail.com"}
                  inputStyle={styles.inputStyle}
                />
                <Input
                  containerStyle={{ marginTop: 20 }}
                  type='password'
                  name="password"
                  onChange={handleChange}
                  icon={VisibilityRoundedIcon}
                  fullWidth={true}
                  placeHolder={"Enter Password"}
                  inputStyle={styles.inputStyle}
                />
                <div className='d-flex flex-row justify-content-end mt-5'>
                  <div className='submit-btn'>
                    <ButtonBase type='submit' style={styles.submitBtnStyle}>
                      <span>Submit</span>
                    </ButtonBase>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login