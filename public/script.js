const socket = io();

let username = ''; // Empty username at first

function setUsername() {
    let usernameInput = document.getElementById('username');
    username = usernameInput.value.trim().substring(0, 15); // Trim input to 15 characters

    if (username) {
        usernameInput.value = username; // Update field if trimmed
        document.getElementById('username-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
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
// This limits the username input to 15 characters
document.addEventListener("DOMContentLoaded", function() {
    let usernameField = document.getElementById("username");
    let warning = document.getElementById("warning");

    if (usernameField && warning) { // Prevents errors if elements are missing
        usernameField.addEventListener("input", function() {
            if (usernameField.value.length > 15) {
                usernameField.value = usernameField.value.substring(0, 15);
                warning.style.display = "block"; // Show warning message
            } else {
                warning.style.display = "none"; // Hide warning message
            }
        });
    }
});