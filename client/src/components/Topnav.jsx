import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import useUserContactStore from "@_store/user-contacts";
import { useNavigate } from "react-router-dom";
import useChatStore, { socket } from "@_store/chats";
import ThemeChange from "./ThemeChange";
import axios from "axios";

const Topnav = () => {
    const navigate = useNavigate();
    const clearChats = useChatStore((state) => state.clearChats);
    const clearContacts = useUserContactStore((state) => state.clearContacts);

    const requestLogout = () => {
        axios.get("/logout").then(() => {
            clearChats();
            clearContacts();
            socket.disconnect();
            navigate("/login");
        });
    };

    return (
        <nav className="flex w-full justify-between items-center px-6 py-3 border-b border-base-300 bg-base-100">
            <div className="flex items-center gap-1">
                <img className="h-8 w-8" src="/src/assets/chat-bubble.svg" alt="chat-bubble" />
                <h1 className="uppercase font-bold">Chat App</h1>
            </div>
            <div className="flex items-center gap-2">
                <ThemeChange />
                <button className="btn btn-ghost btn-sm" onClick={() => window.my_modal_2.showModal()} title="Log Out">
                    <ArrowLeftOnRectangleIcon className="h-7 w-7" aria-hidden="true" />
                </button>
                <dialog id="my_modal_2" className="modal">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg text-error">Logout Confirmation</h3>
                        <p className="pb-4 py-6">Are you sure you want to log out?</p>
                        <button className="btn flex ml-auto" onClick={requestLogout}>
                            Logout
                        </button>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </nav>
    );
};

export default Topnav;
