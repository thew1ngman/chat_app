import { validateUser } from './src/middlewares/auth.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { createUser } from './src/controllers/user-controller.js';

global.__basedir = path.dirname(fileURLToPath(import.meta.url));

config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const io = new Server(server, {
    cors: {
        origin: `${process.env.CLIENT_HOST}`,
    }
})

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    name: 'session.id',
    secret: process.env.SECRET_TOKEN,
    resave: false,
    saveUninitialized: false,
    sameSite: 'none',
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 7 } // 7 days
}));


app.get("/", async (_, res) => {
    res.json("Nothing to see here.");
});


app.post("/session-check", (req, res) => {
    if (req.session.user) {
        return res.json({ isAuthenticated: true });
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
    res.cookie('user.id', req.user.id, { maxAge: req.session.cookie.maxAge })
        .cookie('user.role', req.user.role, { maxAge: req.session.cookie.maxAge })
        .json({ isAuthenticated: true });
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res
        .clearCookie('user.id')
        .clearCookie('user.role')
        .clearCookie('session.id')
        .json({ isAuthenticated: false });
});

app.post('/create-user', async (req, res) => {
    if (req.session.user.role != 'admin') return res.status(401);
    const data = await createUser(req.body);
    res.json(data);
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ', msg);
        if(msg === '/disconnect') {
            socket.disconnect();
            console.log('Server disconnected!');
        }
        if(msg === '/reconnect') {
            socket.disconnect();
            console.log('Server disconnected!');
        }
    });

    socket.on('disconnect', (reason) => console.log('Disconnected:', reason));
    
    console.log('User connection established! ID:', socket.id);
});


server.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
})