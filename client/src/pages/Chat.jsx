import Sidenav from "@_components/Sidenav";
import Topnav from "@_components/Topnav";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import { Toaster } from 'react-hot-toast';

const Chat = () => {
    // establish connection;
    window.socket = io(import.meta.env.VITE_AXIOS_BASE_URL, {
        autoConnect: false,
    });

    useEffect(() => {
        window.socket.connect();
    }, []);

    return ( 
        <>
            <Toaster />
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
}
export default Chat;