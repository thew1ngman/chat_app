import axios from "axios";
import ThemeChange from "./ThemeChange";
import { useNavigate } from "react-router-dom";


const Topnav = () => {
    const navigate = useNavigate();

    const requestLogout = () => {
        axios.get('/logout').then(() => {
            navigate('/login');
        });
    }
    
    return (
        <nav className="flex w-full justify-between items-center px-6 py-3 border-b border-base-300">
            <div className="flex items-center gap-1">
                <img className="h-8 w-8" src="src\assets\chat-bubble.svg" alt="chat-bubble" />
                <h1 className="uppercase font-bold">Chat App</h1>
            </div>
            <div className="flex items-center gap-2">
                <ThemeChange />
                <button className="btn btn-ghost btn-sm" onClick={() => window.my_modal_2.showModal()} title="Log Out">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.75}
                        stroke="currentColor"
                        className="w-7 h-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                        />
                    </svg>
                </button>
                <dialog id="my_modal_2" className="modal">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg text-error">Logout Confirmation</h3>
                        <p className="pb-4 py-6">Are you sure you want to log out?</p>
                        <button className="btn flex ml-auto" onClick={requestLogout}>Logout</button>
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
