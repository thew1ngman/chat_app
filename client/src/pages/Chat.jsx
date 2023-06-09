import Sidenav from "@_components/Sidenav";
import Topnav from "@_components/Topnav";
import { socket } from "@_store/chats.js";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Chat = () => {

    
    useEffect(() => {
        socket.on("disconnect", (reason) => {
            console.log(reason)
        });
        socket.connect();
    }, []);

    return (
        <>
            <main className="w-full h-full bg-base-300 flex flex-col">
                <div>
                    <Topnav />
                </div>
                <div className="flex h-full">
                    <Sidenav />
                    <Outlet />
                </div>
            </main>
        </>
    );
};
export default Chat;
