import fs from 'fs'
import express from 'express'
import Router from 'express-promise-router'
import { createServer } from 'vite'
import viteConfig from './vite.config.js'
import { Server } from 'socket.io'
// import "./develop.css";
// Create router
const router = Router()

// Create vite front end dev server
const vite = await createServer({
    configFile: false,
    server: {
        middlewareMode: 'html',
    },
    ...viteConfig,
})

// Main route serves the index HTML
router.get('/', async (req, res, next) => {
    let html = fs.readFileSync('index.html', 'utf-8')
    html = await vite.transformIndexHtml(req.url, html)
    res.send(html)
})

// Use vite middleware so it rebuilds frontend
router.use(vite.middlewares)

// Everything else that's not index 404s
router.use('*', (req, res) => {
    res.status(404).send({ message: 'Not Found' })
})

// Create express app and listen on port 3000
const app = express()
app.use(router)
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port http://localhost:3000...`)
})

const ioServer = new Server(server)

let clients = {}

let counter = 0;
// Socket app msgs
ioServer.on('connection', (client) => {
    counter++;
    if (counter % 2 == 1)
    return;
    console.log(
        `User ${client.id} connected, there are currently ${ioServer.engine.clientsCount} users connected`
    )
    const x = Math.floor(10*Math.random());
    const y = 0.5;
    const z = Math.floor(10*Math.random())
    console.log("x, y, z", x, y, z)
    clients[client.id] = {
        position: [ x, y, z]
    }
    ioServer.sockets.emit("move", clients);
    
    client.on("move", ({id, position}) => {
        clients[id].position = position;
        ioServer.sockets.emit("move", clients);
    })
    client.on('mouseDown', ({id, mouseDown}) =>{
        clients[id].mouseDown = mouseDown;
        ioServer.sockets.emit("mouseDown", clients);
    })
    client.on('disconnect', () => {
        console.log(
            `User ${client.id} disconnected, there are currently ${ioServer.engine.clientsCount} users connected`
        )

        //Delete this client from the object
        delete clients[client.id]

        ioServer.sockets.emit('move', clients)
    })
})
