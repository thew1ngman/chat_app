import { validateUser } from './src/middlewares/auth.js';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { nanoid } from 'nanoid';
import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';

global.__basedir = path.dirname(fileURLToPath(import.meta.url));

config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const sessionSecret = nanoid();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: 'session.id',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    sameSite: 'none',
    cookie: { secure: false, maxAge: null } // 7 days
}));


app.get("/", async (_, res) => {
    res.json("Nothing to see here.");
});


app.post("/session-check", (req, res) => {
    if (req.session.user) {
        return res.json({ isAuthenticated: true })
    };
    return res.json({ isAuthenticated: false });
});


app.post('/login', validateUser, async (req, res, next) => {
    req.session.regenerate((err) => {
        if (err) next(err);

        req.session.save(function (err) {
            if (err) return next(err)
        })
    })
    req.session.user = req.user;
    res.json({ isAuthenticated: true });
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('sessionId').json({ isAuthenticated: false });
});


server.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
})