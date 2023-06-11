import { authenticateUser } from "../controllers/user-controller.js";
import storeAction from "../data/async-storage.js";
import { readFile } from "../utils/helpers.js";

/**
 * @typedef {string} __basedir
 */

/**
 * Middleware to check if the user is authenticated.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function isAuthenticated(req, res, next) {
    if (req.session.user) return next();
    res.send({ isAuthenticated: false });
}

/**
 * Match check the user input info against the saved user info.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function validateUser(req, res, next) {
    const { email, password } = req.body;
    let userData = null;
    let extra = null;

    if (email == "admin@email.com") {
        // initial user to setup other accounts
        const { users } = await readFile(
            `${__basedir}\\src\\data\\dummy-users.json`
        );
        userData = users.find(
            (user) => user.email === email && user.password === password
        );
        extra = { type: "success", message: "Authenticated!" };
    } else {
        const [user, extraData] = await authenticateUser(req.body);
        userData = user;
        extra = extraData;
    }

    if (!userData || extra.type == "error") return res.send(extra);

    delete userData.password;
    req.user = userData;
    storeAction("set", `${userData.id}_sessionData`, {
        userId: userData.id,
        sessionId: req.session.id,
    });
    next();
}
