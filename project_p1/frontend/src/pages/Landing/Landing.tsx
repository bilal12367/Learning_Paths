import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { RootActions } from '../../redux/RootActions'
import AuthApi from '../../redux/rtk_query/AuthApi'


const Landing = () => {
  const user = useSelector((state: RootState) => state.authReducer.user)
  const [registerReq, registerResp] = AuthApi.useRegisterApiMutation();
  const AuthActions = RootActions.Auth;
  const dispatch = useDispatch()
  console.log("Rednere")
  const setUser = () => {
    dispatch(AuthActions.setUser({ userName: "Bilal", userId: "123", email: "test@gmail.com" }))
  }

  const removeUser = () => {
    dispatch(AuthActions.removeUser())
  }

  const registerUser = () => {
    registerReq({
      email: "eve.holt@reqres.in",
      password: "pistol"
    })
  }

  return (
    <div>
      <h1>Test User</h1>
      <p>{JSON.stringify(user)}</p>
      <button onClick={setUser}>SET USER</button>
      <button onClick={removeUser}>Remove USER</button>
      <button onClick={registerUser}>Register User</button>

      {
        registerResp.isUninitialized &&
        <p> User is not Registered </p>
      }

      {
        !registerResp.isUninitialized && registerResp.isLoading &&
        <p>Loading ...</p>
      }

      {
        registerResp.isSuccess &&
        <div>
          <p> User Registered </p>
          <p>{JSON.stringify(registerResp.data)}</p>
        </div>
      }

      {
        registerResp.isError &&
        <div>
          <p> Error </p>
          <p>{JSON.stringify(registerResp.error)}</p>
        </div>
      }
    </div>
  )
}

export default Landing