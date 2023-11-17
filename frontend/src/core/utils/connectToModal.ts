import io from "socket.io-client";

export const socket = io('ws://localhost:5000', {
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10,
    extraHeaders: {
        "ngrok-skip-browser-warning": "true"
    }
});
