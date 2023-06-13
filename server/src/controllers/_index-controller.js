import ChatController from "./chat-controller.js";
import ChatLineController from "./chatline-controller.js";
import ContactListController from "./contact-list-controller.js";
import UserController from "./user-controller.js";
import { PrismaClient } from "@prisma/client";

// Prisma docs suggest that there should only be one Prisma instance.
const prisma = new PrismaClient();

export const { addToContacts, deleteUserContact, getUserContacts } = ContactListController(prisma);
export const { createUser, authenticateUser, searchUserByEmail, saveUserChatLine } = UserController(prisma);
export const { createOrFindChat, conversationIdFormat, getChatLines } = ChatController(prisma);
export const { createChatLine } = ChatLineController(prisma);