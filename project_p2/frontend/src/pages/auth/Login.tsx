import React, { CSSProperties, HTMLInputTypeAttribute } from 'react'
import { useSelector } from 'react-redux';
import loginIllus from '../../assets/images/login_illus_1.png'
import LoginRect from '../../assets/images/login_rect.png'
import LockIcon from '../../assets/icons/Lock.png'
import EmailIcon from '../../assets/icons/Email.png'
import './Login.css'
import { IRootState } from '../../store/store';
import Selectors from '../../store/Selectors';

interface InputProps {
  icon?: string,
  containerStyle?: CSSProperties,
  type: HTMLInputTypeAttribute,
  inputStyle?: CSSProperties,
  onChange?: () => void,
  fullWidth?: boolean,
  placeHolder?: string
}

const Input = (props: InputProps) => {
  return (
    <div className='position-relative' style={{ ...props.containerStyle }}>
      <div className='position-absolute h-100 d-flex flex-column justify-content-center' style={{ paddingLeft: 10 }} >
        <img height={20} src={props.icon} />
      </div>
      <input
        onChange={props.onChange}
        placeholder={props.placeHolder}
        style={{ ...props.inputStyle }}
        className={'input_field ' + (props.fullWidth ? 'w-100' : '')}
        type={props.type}
      />
    </div>
  )
}

const Login = () => {
  const theme = useSelector(Selectors.selectTheme)
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
              <form className='d-flex flex-column mt-5'>
                <Input
                  containerStyle={{ marginTop: 20 }}
                  type='email'
                  icon={EmailIcon}
                  fullWidth={true}
                  placeHolder={"Enter Email: Eg. xyz@gmail.com"}
                  inputStyle={{
                    background: theme.colors.grad1(300),
                    boxShadow: theme.shadows.heavy,
                    borderRadius: '8px',
                    padding: '8px 0px 8px 45px'
                  }}
                />
                <Input
                  containerStyle={{ marginTop: 20 }}
                  type='password'
                  icon={LockIcon}
                  fullWidth={true}
                  placeHolder={"Enter Password"}
                  inputStyle={{
                    background: theme.colors.grad1(300),
                    boxShadow: theme.shadows.heavy,
                    borderRadius: '8px',
                    padding: '8px 0px 8px 45px'
                  }}
                />
                <div className='d-flex flex-row justify-content-end mt-5'>
                  <input title='Submit' type='submit' />
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