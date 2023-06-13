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
        const { chatId, originUser, message } = requestData;
        let userChatLine = null;

        // const user = await prisma.user.findFirst({
        //     where: { id: originUser },
        // });

        // console.log("[user-chatline]", storeAction(), originUser);

        try {
            const userEmail = storeAction("get", `${originUser}_email`);
            userChatLine = await prisma.user.update({
                where: { email: userEmail },
                data: {
                    chatlines: {
                        create: {
                            lineText: message,
                            chat: {
                                connect: {
                                    id: chatId,
                                }
                            }
                        }
                    }
                }
            });

            return responseData(userChatLine, "success", "Message saved.");
        } catch (error) {
            return responseData(userChatLine, "error", error.message);
        }
    }

    return {
        createUser,
        authenticateUser,
        searchUserByEmail,
        saveUserChatLine,
    };
}
