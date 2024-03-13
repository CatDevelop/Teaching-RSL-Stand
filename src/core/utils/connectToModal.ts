import io from "socket.io-client";

const serverSource = {
    LOCAL: "ws://localhost:5000",
    SERVER: 'wss://pincode-dev.ru'
}
export const socket = io(serverSource.LOCAL, {
    autoConnect: false,
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10,
    extraHeaders: {
        "ngrok-skip-browser-warning": "true"
    }
});
