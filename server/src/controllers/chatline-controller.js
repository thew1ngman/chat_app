import { PrismaClient } from "@prisma/client";
import { responseData } from "../utils/helpers.js";
import storeAction from "../data/async-storage.js";

/**
 * @param {PrismaClient} prisma
 */
export default function ChatLineController(prisma) {
    /**
     * Create and save chatline to DB.
     * @param {Object} requestData
     * @param {Number} requestData.chatId
     * @param {Number} requestData.userId
     * @param {String} requestData.lineText
     * @returns
     */
    async function createChatLine(requestData) {
        const { chatId, userId, message } = requestData;

        const email = storeAction("get", `${userId}_email`);

        try {
            const chatline = await prisma.chatline.create({
                data: {
                    lineText: message,
                    user: {
                        connect: {
                            id: userId,
                            email: email,
                        },
                    },
                    chat: {
                        connect: {
                            id: chatId,
                        },
                    },
                },
            });

            if (chatline) {
                return responseData(chatline, "success", "Chatline saved.");
            } else {
                return responseData(
                    chatline,
                    "error",
                    "SERVER: Error in saving chat data. @try"
                );
            }
        } catch (err) {
            return responseData(null, "error", err.message);
        }
    }

    return {
        createChatLine,
    };
}
