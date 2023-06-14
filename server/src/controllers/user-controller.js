import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import storeAction from "../data/async-storage.js";
import { responseData } from "../utils/helpers.js";

/**
 * @param {PrismaClient} prisma
 */
export default function UserController(prisma) {
    /**
     * @param {Object} userInputData
     * @param {string} userInputData.email
     * @param {string} userInputData.password
     * @param {string} userInputData.name
     * @param {string} userInputData.role
     */
    async function createUser(userInputData) {
        const { email, password, name, role } = userInputData;
        const hashed = await hash(password, 10);
        let error = null;
        let user = null;

        try {
            const emailUsed = await prisma.user.findFirst({
                where: { ["email"]: email },
            });

            if (!emailUsed) {
                user = await prisma.user.create({
                    data: {
                        email: email,
                        password: hashed,
                        name: name,
                        role: role,
                    },
                });

                return [user, error];
            } else {
                return [
                    user,
                    { type: "error", message: "Email already in use." },
                ];
            }
        } catch (error) {
            return [
                user,
                { type: "error", message: `SERVER: ${error.message}` },
            ];
        }
    }

    /**
     *
     * @param {Object} loginInput
     * @param {string} loginInput.email
     * @param {string} loginInput.password
     */
    async function authenticateUser(loginInput) {
        const { email, password } = loginInput;

        const user = await prisma.user.findFirst({
            where: { ["email"]: email },
        });

        if (!user) {
            return [user, { type: "error", message: "Invalid credentials" }];
        }

        const match = await compare(password, user.password);

        if (!match) {
            return [user, { type: "error", message: "Invalid credentials" }];
        }

        storeAction("set", `${user.id}_email`, user.email);

        return [user, { type: "success", message: "Authenticated!" }];
    }

    /**
     * @param {string} email
     */
    async function searchUserByEmail(email) {
        try {
            const user = await prisma.user.findFirst({
                where: { ["email"]: email },
            });
            let type = "error";
            let message = "User not found!";

            if (user) {
                type = "success";
                message = "User found!";

                delete user.password;
            }

            return [user, { type: type, message: message }];
        } catch (error) {
            return [null, { type: "error", message: error.message }];
        }
    }

    async function saveUserChatLine(requestData) {
        const { chatId, originUser, message, destinationId } = requestData;
        let userChatLine = null;

        try {
            const userEmail = storeAction("get", `${originUser}_email`);
            userChatLine = await prisma.user.update({
                where: { email: userEmail },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    chatlines: {
                        where: {
                            chat: {
                                id: chatId,
                            },
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                        take: 1,
                    },
                },
                data: {
                    chatlines: {
                        create: {
                            lineText: message,
                            chat: {
                                connect: {
                                    id: chatId,
                                },
                            },
                        },
                    },
                },
            });

            const mappedChatline = {
                chatId: chatId,
                uuid: userChatLine.chatlines[0].id,
                originUser: userChatLine.id,
                // destinationId: destinationId,
                message: userChatLine.chatlines[0].lineText,
                createdAt: userChatLine.chatlines[0].createdAt,
            };

            return responseData(mappedChatline, "success", "Message saved.");
        } catch (error) {
            return responseData(userChatLine, "error", error.message);
        }
    }


    async function newContactListRequest(currentUserId, targetUserId) {
        try {
            const contactListRequest = await prisma.user.update({
                where: { id: currentUserId },
                data: {
                    contactlist_requests: {
                        create: {
                            target_user_id: parseInt(targetUserId)
                        }
                    }
                }
            })

            responseData(contactListRequest, "success", "Requests retrieved.")
        } catch (error) {
            responseData(null, "error", error.message)
        }
    }


    // async function deleteContactListRequest(currentUserId, targetUserId) {
    //     try {
    //         const contactListRequest = await prisma.user.update({
    //             where: { id: currentUserId },
    //             data: {
    //                 contactlist_requests: {
    //                     delete: {
                            
    //                     }
    //                 }
    //             }
    //         });
    //     } catch (error) {
    //         responseData(null, "error", error.message)
    //     }
    // }
    

    return {
        createUser,
        authenticateUser,
        searchUserByEmail,
        saveUserChatLine,
        newContactListRequest
    };
}
