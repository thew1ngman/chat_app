import { PrismaClient } from "@prisma/client";
import { responseData } from "../utils/helpers.js";

/**
 *
 * @param {PrismaClient} prisma
 */
export default function ChatController(prisma) {
    /**
     *
     * @param {String|Number} userId
     * @param {String|Number} contactUserId
     */
    async function createChat(userId, contactUserId) {
        let chat = null;
        try {
            chat = await prisma.chat.create({
                data: {
                    conversationId: conversationIdFormat(userId, contactUserId),
                },
            });
            return responseData(chat, "success", "Chat created.");
        } catch (err) {
            return responseData(chat, "error", err.message);
        }
    }

    function conversationIdFormat(userId, contactUserId) {
        return [userId, contactUserId].sort().join("|");
    }

    return {
        createChat,
        conversationIdFormat,
    };
}
