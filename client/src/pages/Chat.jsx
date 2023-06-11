import Sidenav from "@_components/Sidenav";
import Topnav from "@_components/Topnav";
import useChatStore, { socket } from "@_store/chats.js";
import { getCookie } from "@_utils/helper";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const DESTINATION_UNAVAILABLE = "destination-unavailable";
const MESSAGE_SENT = "message-sent";
const MESSAGE_RECEIVED = "message-received";


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
        socket.on(MESSAGE_SENT, (data) => {
            storeChat(data);
            console.log(MESSAGE_SENT);
        });
        socket.on(MESSAGE_RECEIVED, (data) => {
            storeChat(data);
            console.log(MESSAGE_RECEIVED);
        });
        socket.on(DESTINATION_UNAVAILABLE, (data) => {
            storeChat(data);
            console.log(DESTINATION_UNAVAILABLE);
        });

        return () => {
            socket.removeListener(MESSAGE_SENT);
            socket.removeListener(MESSAGE_RECEIVED);
            socket.removeListener(DESTINATION_UNAVAILABLE);
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
