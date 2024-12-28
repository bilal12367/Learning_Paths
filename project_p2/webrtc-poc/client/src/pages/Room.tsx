import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSocketContext } from '../context/socket_context'
import Peer from 'simple-peer'

const Room = () => {
    const params = useParams()
    const {joinRoom, getSocket} = useSocketContext()
    const socket = getSocket()
    const roomId = params.roomId;
    useEffect(() => {
        joinRoom(params.userId, params.roomId)
        socket.on(params.roomId+":join",(data: any) => {
            console.log("Data: ",data)
            const peer = new Peer()
        })
    },[])
    return (
        <div>Room</div>
    )
}

export default Room