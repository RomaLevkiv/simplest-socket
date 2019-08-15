const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
const smallMess = 'Admin';
let connections = [];

io.sockets.on('connection', socket => {
    console.log('Успешное соединение');
    connections.push(socket);

    socket.on('disconnect', data => {
        connections.splice(connections.indexOf(socket), 1);
        //console.log(data);
        console.log('Отключение');
    });

    socket.on('send message', data => {
        console.log(data.message);
        io.sockets.emit('add message', { newMessage: data.message + smallMess });
    });

});