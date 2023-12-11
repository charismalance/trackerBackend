const express = require("express")
const app = express()
const io = require('socket.io')(app)


io.on('connection',socket=>{
    socket.emit('sendPolygon', { description: 'A custom event named testerEvent!'});
 
    socket.on('disconnect', () => { /* … */ });
})