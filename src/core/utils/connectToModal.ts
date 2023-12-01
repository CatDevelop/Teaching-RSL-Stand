import io from "socket.io-client";

export const socket = io('wss://pincode-dev.ru', {
    autoConnect: false,
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10,
    extraHeaders: {
        "ngrok-skip-browser-warning": "true"
    }
});
