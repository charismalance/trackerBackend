const express = require("express")

const app = express() ; 
const http = require('http');
const socketIo = require('socket.io');
const router = require('./router')
const bodyParser = require("body-parser")
const polygon = require("./method/map")
const cors = require('cors')
const {setHeaders} =require("./middleware/auth")
const {insertNewMessage} = require("./controller/soket")
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*',
    }
});
require("dotenv").config()
let port = process.env.port
app.use(setHeaders)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(router)

io.on('connection',socket=>{
    console.log("connect")
    socket.emit('sendPolygon', { data:polygon.polygon});
    socket.on("newMessage",(data)=>{insertNewMessage(data)})
    socket.on('disconnect', () => {console.log("user Disconnected") });
})

server.listen(port,()=>{
    console.log(`this app run on ${port}`)
})