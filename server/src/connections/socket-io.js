import { Socket } from "socket.io";
import storeAction from "../data/async-storage.js";
import { nanoid } from "nanoid";
import { saveUserChatLine } from "../controllers/_index-controller.js";

// Socket user events
const SEND_MESSAGE = "send-message";
const DESTINATION_UNAVAILABLE = "destination-unavailable";
const MESSAGE_SENT = "message-sent";
const MESSAGE_RECEIVED = "message-received";

/**
 * @param {Socket} socket
 */
export default async function connectionHandler(socket) {
    socket.on("emit-user-id", (data) => {
        storeAction("set", `${data.userId}_socketId`, socket.id);
        socket.user = data;
    });

    socket.on(SEND_MESSAGE, async (data) => {
        const userSessionData = storeAction(
            "get",
            `${data.originUser}_sessionData`
        );

        if (!userSessionData?.sessionId) return socket.disconnect();

        const destinationSocketId = storeAction(
            "get",
            `${data.destinationId}_socketId`
        );

        // console.log("[0]", storeAction());

        const chatlineQueryData = await saveUserChatLine(data);

        console.log("[1]", chatlineQueryData, destinationSocketId);

        data.uuid = nanoid(); // to avoid duplicates in the client, remove this once DB is set

        // TODO: save chatline in DB
        if (!destinationSocketId) {
            socket.emit(DESTINATION_UNAVAILABLE, data);
        } else {
            socket.to(destinationSocketId).emit(MESSAGE_RECEIVED, data);
            socket.emit(MESSAGE_SENT, data);
        }

        console.log("[2]", "message-data: ", data);
        // console.log("[3]", userSessionData, socket.id, destinationSocketId);
    });

    socket.on("disconnect", (reason) => {
        console.log("Disconnected:", reason, "@server", socket.user?.id);
    });

    console.log("User connection established!");
}
