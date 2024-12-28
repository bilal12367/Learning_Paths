import { Server } from "socket.io"


const setupSocketListeners = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    })
    const socketList = {}
    io.on("connection", (socket) => {
        socket.on("user", (data) => {
            // console.log("User Joins",socket.id);
            // console.log("User Data: ",data)
        })

        socket.on("join_room", (data) => {
            console.log(data)
            const roomId = data.roomId + ":join"
            socket.join(roomId)
            socketList[socket.id] = { userName: data.userId, video: true, audio: true }

            const room = io.sockets.adapter.rooms.get(roomId)
            if (room) {
                console.log({ room })
                try {
                    const users = []
                    room.forEach((err, client) => {
                        console.log({ client })
                        users.push({ userId: client, info: socketList[client] });
                        socket.broadcast.to(roomId).emit(roomId+"fe", users);
                    })
                } catch (error) {
                    
                }
            }
            // forEach((err, clients) => {
            //     try {
            //         const users = []
            //         console.log({clients})
            //         clients.forEach(client => {
            //             users.push({userId: client, info: socketList[client]})
            //         });
            //     } catch (error) {

            //     }
            // })
        })
    })
}

export default setupSocketListeners