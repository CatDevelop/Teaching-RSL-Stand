import io from "socket.io-client";

export function getSocket(recognitionSource: "local" | "server") {
    return io(
        recognitionSource === "local" ? 'ws://localhost:5000' : "wss://pincode-dev.ru",
        {
            autoConnect: false,
            reconnection: true,
            reconnectionDelay: 500,
            reconnectionAttempts: 10,
            extraHeaders: {
                "ngrok-skip-browser-warning": "true"
            }
        }
    );
}
