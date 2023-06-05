import Sidenav from "@_components/Sidenav";
import Topnav from "@_components/Topnav";
import { Outlet } from "react-router-dom";

const Chat = () => {
    return ( 
        <>
            <Topnav />
            <main className="w-full h-[calc(100vh-50px)] flex bg-base-300">
                <Sidenav />
                <Outlet />
            </main>
        </>
     );
}
 
export default Chat;