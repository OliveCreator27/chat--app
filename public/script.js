const socket = io();

let username = ''; // Empty username at first

function setUsername() {
    username = document.getElementById('username').value;
    
    if (username) {
        // Hide the username input area and show the chat
        document.getElementById('username-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        
        // Notify the server that the user has joined with their username
        socket.emit('user-joined', username);
    }
}

document.getElementById('send-button').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    if (message.trim()) {
        socket.emit('chat-message', { user: username, message: message });
        document.getElementById('message-input').value = ''; // Clear input field
    }
});

socket.on('chat-message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `${data.user}: ${data.message}`;
    document.getElementById('messages').appendChild(messageElement);
    
    // Scroll to the bottom of the chat
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
});

socket.on('user-joined', (username) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `${username} has joined the chat!`;
    document.getElementById('messages').appendChild(messageElement);
});
