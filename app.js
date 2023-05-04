const express = require ('express')
const app = express()

const http = require('http')
const { disconnect } = require('process')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    //Procedimiento 1:
    console.log('Un usuario se ha conectado')
})

io.on('connection', (socket) => {
    //Procedimiento 2:
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado')
    })
})

io.on('connection', (socket) => {
    //Procesimientos 4:
    socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })
})

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, resp) => {
    resp.sendFile(`${__dirname}/index.html`)
})

app.get('/chat', (req, resp) => {
    resp.sendFile(`${__dirname}/chat_view.html`)
})

server.listen(3000,() => {
    console.log('Servidor corriendo en http://localhost:3000')
})