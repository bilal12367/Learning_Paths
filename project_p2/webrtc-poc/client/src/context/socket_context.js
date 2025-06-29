import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";

const socketContext = createContext()

const SocketProvider = ({ children }) => {
    const [state, setState] = useState({})
    const userId = v4()
    const socket = io("http://localhost:5000")

    socket.on("connect", () => {
        console.log("Connection Established")
        console.log(socket.id)
        socket.emit("user", { name: userId })
    })

    const joinRoom = (userId, roomId) => {
        socket.emit("join_room", { userId, roomId })
    }

    const getSocket =() => socket

    return (<socketContext.Provider value={{...state, joinRoom, getSocket}}>
        {children}
    </socketContext.Provider>)

}

export const useSocketContext = () => {
    return useContext(socketContext)
}


export default SocketProvider