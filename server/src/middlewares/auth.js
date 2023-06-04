import { readFile } from '../utils/helpers.js';

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
 * Match check the user input info agains the saved user info.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function validateUser(req, res, next) {
    const { email, password } = req.body;
    const { users } = await readFile(`${__basedir}\\src\\data\\dummy-users.json`);
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) return res.send({ error: 'Invalid credentials!' });

    delete user.password;
    req.user = user;
    next();
}