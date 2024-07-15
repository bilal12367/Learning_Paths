import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { RootActions } from '../../redux/RootActions'

const Landing = () => {
  const user = useSelector((state: RootState) => state.authReducer.user)
  const AuthActions = RootActions.Auth;
  const dispatch = useDispatch()
  console.log("Rednere")
  const setUser = () => {
    dispatch(AuthActions.setUser({ userName: "Bilal", userId: "123", email: "test@gmail.com" }))
  }

  const removeUser = () => {
    dispatch(AuthActions.removeUser())
  }
  return (
    <div>
      <h1>Test User</h1>
      <p>{JSON.stringify(user)}</p>
      <button onClick={setUser}>SET USER</button>
      <button onClick={removeUser}>Remove USER</button>
    </div>
  )
}

export default Landing