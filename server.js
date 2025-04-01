const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from the public folder

io.on('connection', (socket) => {
    console.log('a user connected');
    
    // When a user joins with a username
    socket.on('user-joined', (username) => {
        console.log(`${username} joined the chat`);
        io.emit('user-joined', username); // Notify all users that someone has joined
    });

    // When a user sends a chat message
    socket.on('chat-message', (data) => {
        io.emit('chat-message', data); // Send the message to all users
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
