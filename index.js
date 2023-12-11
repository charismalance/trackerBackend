const express = require("express")

const app = express() ; 
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const router = require('./router')
const bodyParser = require("body-parser")
const polygon = require("./method/map")



require("dotenv").config()
let port = process.env.port
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(router)

io.on('connection',socket=>{
    socket.emit('sendPolygon', { data:polygon.polygon});
 
    socket.on('disconnect', () => {console.log("user Disconnected") });
})

server.listen(port,()=>{
    console.log(`this app run on ${port}`)
})