import { Prisma, PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";

const prisma = new PrismaClient();

/**
 * @param {Object} userInputData
 * @param {string} userInputData.email
 * @param {string} userInputData.password
 * @param {string} userInputData.name
 * @param {string} userInputData.role
 */
export async function createUser(userInputData) {
    const { email, password, name, role } = userInputData;
    const hashed = await hash(password, 10);
    let error = null;
    let user = null;

    try {
        // returns null if nothing was found
        const emailUsed = await prisma.user.findFirst({
            where: { ["email"]: email },
        });

        if (!emailUsed) {
            user = await prisma.user.create({
                data: { email: email, password: hashed, name: name, role: role },
            });

            return [user, error];
        } else {
            return [user, { type: "error", message: "Email already in use." }];
        }
    } catch (error) {
        return [user, { type: "error", message: `SERVER: ${error.message}` }];
    }
}

/**
 *
 * @param {Object} loginInput
 * @param {string} loginInput.email
 * @param {string} loginInput.password
 */
export async function authenticateUser(loginInput) {
    const { email, password } = loginInput;

    const user = await prisma.user.findFirst({ where: { ["email"]: email } });
    if (!user) return [user, { type: "error", message: "Invalid credentials" }];

    const match = await compare(password, user.password);
    if (!match) return [user, { type: "error", message: "Invalid credentials" }];
    return [user, { type: "success", message: "Authenticated!" }];
}

/**
 * @param {string} email
 */
export async function searchUserByEmail(email) {
    try {
        const user = await prisma.user.findFirst({ where: { ["email"]: email } });
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
