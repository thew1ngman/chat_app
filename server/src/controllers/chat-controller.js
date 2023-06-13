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
    async function createOrFindChat(userId, contactUserId) {
        let chat = null;
        try {
            chat = await prisma.chat.findFirst({
                where: {
                    conversationId: conversationIdFormat(userId, contactUserId),
                },
            });

            if (chat) {
                return responseData(chat, "success", "Chat id retrieved.");
            }

            chat = await prisma.chat.create({
                data: {
                    conversationId: conversationIdFormat(userId, contactUserId),
                },
            });

            return responseData(chat, "success", "Chat id retrieved");
        } catch (err) {
            return responseData(chat, "error", err.message);
        }
    }

    /**
     *
     * @param {BigInt} chatId
     * @returns
     */
    async function getChatLines(chatId) {
        let chat = null;

        try {
            chat = await prisma.chat.findFirst({
                where: { id: parseInt(chatId) },
                include: {
                    chatlines: true
                },
            });

            const mapped = chat.chatlines.map(c => ({
                chatId: chat.id,
                uuid: c.id,
                originUser: c.userId,
                message: c.lineText,
                createdAt: c.createdAt,
            }))

            return responseData(mapped, "success", "Chatlines retrieved.");
        } catch (err) {
            console.log(err);
            return responseData(chat, "error", err.message);
        }
    }

    function conversationIdFormat(userId, contactUserId) {
        return [userId, contactUserId].sort().join("|");
    }

    return {
        createOrFindChat,
        getChatLines,
        conversationIdFormat,
    };

    // async function getChatLines(chatId) {
    //     const chatlines = await prisma.chat.findMany({
    //         where: {
    //             id: chatId,
    //             chatline: {

    //             }
    //         }
    //     })
    // }
}
