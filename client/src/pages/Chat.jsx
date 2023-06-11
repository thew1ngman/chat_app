import Sidenav from "@_components/Sidenav";
import Topnav from "@_components/Topnav";
import useChatStore, { socket } from "@_store/chats.js";
import { getCookie } from "@_utils/helper";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Chat = () => {
    const { chats, storeChat } = useChatStore((state) => state);

    useEffect(() => {
        socket.connect();

        socket.on("disconnect", (reason) => console.log(reason, "@client"));
        socket.on("connect", () => {
            socket.emit("emit-user-id", { userId: parseInt(getCookie("user.id")) });
        });

        return () => {
            socket.removeListener("disconnect");
            socket.removeListener("connect");
        };
    }, []);

    useEffect(() => {
        socket.on("message-sent", (data) => {
            storeChat(data);
            console.log("message-sent");
        });
        socket.on("message-received", (data) => {
            storeChat(data);
            console.log("message-received");
        });

        return () => {
            socket.removeListener("message-sent");
            socket.removeListener("message-received");
        };
    }, [chats.length]);

    return (
        <>
            <main className="w-full h-full bg-base-300 flex flex-col">
                <div className="h-full relative">
                    <Topnav />
                    <div className="flex h-screen pt-14">
                        <Sidenav />
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
};
export default Chat;
