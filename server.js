const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const port = 3000

app.use(express.static('public'))


io.on('connection', (socket) => {
    console.log('new connection')
    
    
    socket.on("message", (incoming) => {
        console.log(incoming)
       io.emit('message', incoming)
        
    })
    
    
    
})



http.listen(port, () => console.log('listen port ' + port) )