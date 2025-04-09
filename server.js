const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const users = {}; // Track users by their socket ID

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('user-joined', (username) => {
        users[socket.id] = username; // Save username linked to socket
        console.log(`${username} joined the chat`);
        io.emit('user-joined', username);
    });

    // When a user sends a chat message
    socket.on('chat-message', (data) => {
        io.emit('chat-message', data);
    });

    socket.on('disconnect', () => {
        const username = users[socket.id];
        if (username) {
            console.log(`${username} disconnected`);
            socket.broadcast.emit('user-left', username); // Let others know
            delete users[socket.id]; // Clean up
        } else {
            console.log('a user disconnected (username not set)');
        }
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
