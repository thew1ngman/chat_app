import { Socket } from "socket.io";
import storeAction from "../data/async-storage.js";
import { nanoid } from "nanoid";

// Socket user events
const SEND_MESSAGE = "send-message"
const DESTINATION_UNAVAILABLE = "destination-unavailable"
const MESSAGE_SENT = "message-sent"
const MESSAGE_RECEIVED = "message-received"

/**
 * @param {Socket} socket
 */
export default async function connectionHandler(socket) {
    socket.on("emit-user-id", (data) => {
        storeAction("set", `${data.userId}_socketId`, socket.id);
        socket.user = data;
    });


    socket.on(SEND_MESSAGE, (data) => {
        const sessionId = storeAction("get", `${data.originUser}_sessionData`);
        if (!sessionId.sessionId) return socket.disconnect();

        const destinationId = storeAction(
            "get",
            `${data.destinationId}_socketId`
        );

        data.uuid = nanoid(); // to avoid duplicates in the client

        // TODO: save chatline in DB
        if (!destinationId) {
            socket.emit(DESTINATION_UNAVAILABLE, data);
            console.log(`USER:${data.destinationId} unavailable. ${destinationId}`)
        } else {
            console.log("Message sent!", Date.now().toLocaleString());
            socket.to(destinationId).emit(MESSAGE_RECEIVED, data);
            socket.emit(MESSAGE_SENT, data);
        }

        console.log("message-data: ", data);
        console.log(sessionId, socket.id, destinationId);
    });


    socket.on("disconnect", (reason) => {
        console.log("Disconnected:", reason, '@server', socket.user?.id);
    });


    console.log("User connection established!");
}