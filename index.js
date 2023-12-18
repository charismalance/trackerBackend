const express = require("express")

const app = express() ; 
const http = require('http');
const socketIo = require('socket.io');
const router = require('./router')
const bodyParser = require("body-parser")
const polygon = require("./method/map")
const cors = require('cors')
const {setHeaders} =require("./middleware/auth")

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
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
console.log(45465,polygon.polygon.coordinates.length)
io.on('connection',async socket=>{
    console.log("connect")
    for(let i =0 ; i<polygon.polygon.coordinates.length ; i++){
        socket.emit('sendPolygon', { data:polygon.polygon.coordinates[i]});
        await sleep(2000)
    }
})

server.listen(port,()=>{
    console.log(`this app run on ${port}`)
})