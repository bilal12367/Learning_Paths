import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../store/store'
import { testActions } from '../store/features/TestFeature/TestSlice';

const Test = () => {
  const count = useSelector<IRootState, number>(state => state.test.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    const pc = new RTCPeerConnection();
  },[])

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button className='btn btn-primary' onClick={() => {dispatch(testActions.increment())}}>Increment</button>
      <button onClick={() => {dispatch(testActions.decrement())}}>Decrement</button>

    </div>
  )
}

export default Test