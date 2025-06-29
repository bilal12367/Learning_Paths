import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Test = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({userId: '', roomId: ''})
  useEffect(() => {
  },[])

  const joinRoom = () => {
    navigate("user/"+user.userId+"/room/"+user.roomId)
  }
  return (
    <div>
      <h1>Testing Page</h1>
      <input type="text" onChange={(e) => setUser({...user, userId: e.target.value})} placeholder='Enter User Id'/><br/>
      <input type="text" onChange={(e) => setUser({...user, roomId: e.target.value})} placeholder='Enter Room Id'/><br/>
      <button onClick={joinRoom}>Join</button>
    </div>
  )
}

export default Test