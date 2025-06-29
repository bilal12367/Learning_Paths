
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createServer } from 'node:http'
import setupSocketListeners from './socket/socket_server.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors({ origin: '*' }))


const server = createServer(app)


setupSocketListeners(server)



server.listen(5000, () => {
    console.log("Server Started Running at 5000 ... ")
})
