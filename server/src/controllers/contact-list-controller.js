import { conversationIdFormat, createOrFindChat, newContactListRequest } from "./_index-controller.js";
import { responseData } from "../utils/helpers.js";
import { PrismaClient } from "@prisma/client";

/**
 * @param {PrismaClient} prisma
 */
export default function ContactListController(prisma) {
    /**
     * @param {Number} userId
     * @param {Number} contactUserId
     */
    async function addToContacts(userId, contactUserId) {
        try {
            const exist = await prisma.contactlist.findFirst({
                where: { userId: userId, contactUserId: contactUserId },
            });

            if (exist) {
                return responseData(null, "error", "User already in contacts.");
            }

            const contact = await prisma.contactlist.create({
                data: {
                    userId: userId,
                    user: {
                        connect: {
                            id: contactUserId,
                        },
                    },
                },
            });

            if (contact) {
                const userContact = await prisma.contactlist.findFirst({
                    where: {
                        userId: contact.userId,
                        contactUserId: contact.contactUserId,
                    },
                    select: {
                        id: true,
                        userId: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                role: true,
                            },
                        },
                    },
                });

                await newContactListRequest(userId, contactUserId);

                const chat = await createOrFindChat(userId, contactUserId);
                userContact.user.chatId = chat[0].id;

                return responseData(
                    userContact,
                    "success",
                    "Contact added successfully."
                );
            }
            return responseData(
                null,
                "error",
                "SERVER: Unable to add contact."
            );
        } catch (error) {
            console.log(error);
            return responseData(null, "error", `SERVER: ${error.message}`);
        }
    }

    /**
     * @param {string|number} id
     * @param {string} conversationId
     */
    async function deleteUserContact(id, conversationId) {
        try {
            const contact = await prisma.contactlist.delete({
                where: { id: id },
            });

            // const chat = await prisma.chat.delete({
            //     where: { conversationId: conversationId },
            // });

            return responseData(contact, "success", `Contact|Chat deleted.`);
        } catch (error) {
            return responseData(null, "error", `SERVER: ${error.message}`);
        }
    }

    /**
     *
     * @param {number} userId
     */
    async function getUserContacts(userId) {
        try {
            const userContacts = await prisma.contactlist.findMany({
                where: {
                    userId: userId,
                    // OR: [{ userId: userId }, { contactUserId: userId }],
                },
                select: {
                    id: true,
                    userId: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                        },
                    },
                },
            });

            if (!userContacts) {
                return responseData(
                    userContacts,
                    "error",
                    "No contacts found."
                );
            }

            for (let i = 0; i < userContacts.length; i++) {
                const contactId = userContacts[i].user.id;
                const chatId = await getChatId(userId, contactId);
                userContacts[i].chatId = chatId;
            }

            return responseData(userContacts, "success", "Contacts fetched.");
        } catch (error) {
            console.log(error);
            responseData(null, "error", `SERVER: ${error.message}`);
        }
    }

    async function getChatId(userId, contactUserId) {
        try {
            const chat = await prisma.chat.findFirst({
                where: {
                    conversationId: conversationIdFormat(userId, contactUserId),
                },
            });

            return chat.id;
        } catch (error) {
            return null;
        }
    }


    async function getContactListRequests(currentUserId) {
        try {
            const contactListRequests = await prisma.contactlist_requests.findMany({
                where: { target_user_id: currentUserId },
                include: {
                    origin_user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                        }
                    },
                }
            });

            return responseData(contactListRequests, 'success', 'Contact List requests retrieved.')
        } catch (error) {
            responseData(null, "error", error.message)
        }
    }
    

    return {
        addToContacts,
        deleteUserContact,
        getUserContacts,
        getContactListRequests, 
    };
}
