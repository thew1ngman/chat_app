import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

/**
 * 
 * @param {number} userId 
 * @param {number} contactUserId 
 */
export async function addToContacts(userId, contactUserId) {
    try {
        const exist = await prisma.contactlist.findFirst({
            where: { userId: userId, contactUserId: contactUserId}
        });

        if (exist) return [null, { type: 'error', message: 'User already in contacts.' }]
        
        const contact = await prisma.contactlist.create({
            data: {
                userId: userId,
                user: {
                    connect: {
                        id: contactUserId
                    }
                }
            }
        });

        if (contact) return [contact, { type: 'success', message: 'Contact added successfully!' }];
        return [null, { type: 'error', message: 'SERVER: Unable to add!' }];
    }
    catch(error) {
        console.log(error)
        return [null, { type: 'error', message: `SERVER: ${error.message}` }];
    }
}