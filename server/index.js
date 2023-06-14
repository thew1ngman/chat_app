import {
    deleteUserContact,
    searchUserByEmail,
    getUserContacts,
    addToContacts,
    createUser,
    getChatLines,
    getContactListRequests,
} from "./src/controllers/_index-controller.js";
import connectionHandler from "./src/connections/socket-io.js";
import { validateUser } from "./src/middlewares/auth.js";
import storeAction from "./src/data/async-storage.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { config } from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import path from "path";

global.__basedir = path.dirname(fileURLToPath(import.meta.url));


config();


const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const io = new Server(server, {
    cors: {
        origin: `${process.env.CLIENT_HOST}`,
    },
});


const sessionMiddleware = session({
    name: "session.id",
    secret: process.env.SECRET_TOKEN,
    resave: false,
    saveUninitialized: false,
    sameSite: "none",
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 7 }, // 7 days
});


app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);


app.get("/", async (_, res) => {
    res.json("Nothing to see here.");
});


app.post("/session-check", (req, res) => {
    if (req.session.user) {
        return res.json({ isAuthenticated: true });
    }
    return res.json({ isAuthenticated: false });
});


app.post("/login", validateUser, async (req, res, next) => {
    req.session.regenerate((err) => {
        if (err) next(err);

        req.session.save(function (err) {
            if (err) return next(err);
        });
    });

    req.session.user = req.user;

    res.cookie("user.id", req.user.id, { maxAge: req.session.cookie.maxAge })
        .cookie("user.role", req.user.role, {
            maxAge: req.session.cookie.maxAge,
        })
        .json({ isAuthenticated: true });
});


app.get("/logout", (req, res) => {
    storeAction("delete", `${req.session.user.id}_sessionData`);
    storeAction("delete", `${req.session.user.id}_socketId`);

    req.session.destroy();

    res.clearCookie("user.id")
        .clearCookie("user.role")
        .clearCookie("session.id")
        .json({ isAuthenticated: false });
});


app.post("/create-user", async (req, res) => {
    console.log(req.session.user);
    if (req.session.user.role.toLowerCase() != "admin") {
        return res
            .status(401)
            .json([null, { type: "error", message: "Unauthorized request." }]);
    }
    const data = await createUser(req.body);
    res.json(data);
});


app.post("/search-user", async (req, res) => {
    const queryData = await searchUserByEmail(req.body.email);
    return res.json(queryData);
});


app.post("/add-user-contact", async (req, res) => {
    const { userId, contactUserId } = req.body;
    const queryData = await addToContacts(
        parseInt(userId),
        parseInt(contactUserId)
    );

    return res.json(queryData);
});


app.delete("/delete-user-contact", async (req, res) => {
    const { contactListId, conversationId } = req.body;
    const deleteQuery = await deleteUserContact(contactListId, conversationId);
    return res.json(deleteQuery);
});


app.post("/get-user-contacts", async (req, res) => {
    const queryData = await getUserContacts(parseInt(req.body.userId));
    return res.json(queryData);
});


app.post("/get-user-contact-list-requests", async (req, res) => {
    const queryData = await getContactListRequests(parseInt(req.body.userId));
    return res.json(queryData);
});


app.post("/get-chatlines", async (req, res) => {
    const queryData = await getChatLines(req.body.chatId);
    return res.json(queryData);
})


io.on("connection", (socket) => connectionHandler(socket));


server.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
});
