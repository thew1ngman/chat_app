import Sidenav from "@_components/Sidenav";
import Topnav from "@_components/Topnav";
import { Outlet } from "react-router-dom";

const Chat = () => {
    return ( 
        <>
            <Topnav />
            <main className="w-full h-full flex bg-base-300">
                <Sidenav />
                <Outlet />
            </main>
        </>
     );
}
 
export default Chat;