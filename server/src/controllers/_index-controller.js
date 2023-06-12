import ChatController from "./chat-controller.js";
import ContactListController from "./contact-list-controller.js";
import UserController from "./user-controller.js";
import { PrismaClient } from "@prisma/client";

// Prisma docs suggest that there should only be one Prisma instance.
const prisma = new PrismaClient();

export const { addToContacts, deleteUserContact, getUserContacts } = ContactListController(prisma);
export const { createUser, authenticateUser, searchUserByEmail } = UserController(prisma);
export const { createChat } = ChatController(prisma);