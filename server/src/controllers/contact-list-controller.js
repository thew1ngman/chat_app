import { PrismaClient } from "@prisma/client";
import { responseData } from "../utils/helpers.js";

/**
 * @param {PrismaClient} prisma
 */
export default function ContactListController(prisma) {
    /**
     * @param {number} userId
     * @param {number} contactUserId
     */
    async function addToContacts(userId, contactUserId) {
        try {
            const exist = await prisma.contactlist.findFirst({
                where: { userId: userId, contactUserId: contactUserId },
            });

            if (exist)
                return responseData(null, "error", "User already in contacts.");

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
                return responseData(
                    userContact,
                    "success",
                    "Contact added successfully."
                );
            }
            return responseData(null, "error", "SERVER: Unable to add!");
        } catch (error) {
            console.log(error);
            return responseData(null, "error", `SERVER: ${error.message}`);
        }
    }

    async function deleteUserContact(id) {
        try {
            const contact = await prisma.contactlist.delete({
                where: { id: id },
            });

            return responseData(contact, "success", `Contact deleted.`);
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
                where: { userId: userId },
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

            if (!userContacts)
                return responseData(
                    userContacts,
                    "error",
                    "No contacts found."
                );
            return responseData(userContacts, "success", "Contacts fetched.");
        } catch (error) {
            console.log(error);
            responseData(null, "error", `SERVER: ${error.message}`);
        }
    }

    return {
        addToContacts,
        deleteUserContact,
        getUserContacts
    }
}
