import React, { CSSProperties, FormEvent, useEffect, useState } from 'react'
import Input from '../../components/ui_components/Input'
import { EmailOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import Selectors from '../../store/Selectors'
import { getGrad } from '../../store/features/Theme/Themes'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Alert, ButtonBase, Collapse } from '@mui/material'
import { useRegisterApiMutation } from '../../store/features/AuthFeature/AuthApi'
import useRegisterHook from './RegisterHook'


const Register = () => {
  const { formState, onFormChange, styles, registerUser } = useRegisterHook()

  return (
    <form className='form d-flex flex-column justify-content-center h-100' onSubmit={registerUser}>
      <Collapse in={formState.alert.show}>
        <Alert severity={formState.alert.type} variant='filled' >
          {formState.alert.message}
        </Alert>
      </Collapse>
      {/* {
        formState.alert.show &&
        <Alert severity={formState.alert.type} >
          {formState.alert.message}
        </Alert>
      } */}
      <Input
        icon={PersonIcon}
        type='text'
        fullWidth={true}
        name='username'
        onChange={onFormChange}
        placeHolder='Enter User Name'
        inputStyle={styles.inputStyle}
      />
      <Input
        icon={EmailRoundedIcon}
        type='email'
        fullWidth={true}
        name='email'
        onChange={onFormChange}
        placeHolder='Enter Email: Eg. xyz@gmail.com'
        inputStyle={styles.inputStyle}
      />
      <Input
        type='password'
        name="password"
        onChange={onFormChange}
        icon={VisibilityRoundedIcon}
        fullWidth={true}
        placeHolder={"Enter Password"}
        inputStyle={styles.inputStyle}
      />
      <Input
        type='password'
        name="confirm_password"
        onChange={onFormChange}
        icon={VisibilityRoundedIcon}
        fullWidth={true}
        placeHolder={"Re-type Password"}
        inputStyle={styles.inputStyle}
      />
      <Input
        type='date'
        name="dob"
        onChange={onFormChange}
        icon={CalendarMonthIcon}
        fullWidth={true}
        placeHolder={"Enter Date of Birth"}
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
  )
}

export default Register