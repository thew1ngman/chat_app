import { Socket } from "socket.io";

/**
 * @param {Socket} socket
 */
export default function ioHandler(socket) {
    if (__sessionID == null) socket.disconnect();

    socket.on("chat message", (data) => {
        console.log("message-data: ", data);
    });

    socket.on("disconnect", (reason) => console.log("Disconnected:", reason));
    console.log("User connection established!");
}
