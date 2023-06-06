import { useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { getCookie } from "@_utils/helper";

const ChatInputBox = () => {
    const editable = useRef(null);
    const [placeholder, setPlaceholder] = useState('Type here...');

    const sendMessage = (e) => {
        e.preventDefault();
        const text = editable.current.innerText;

        if (!text) return editable.current.focus();

        window.socket.emit('chat message', {
            fromUser: getCookie('user.id'),
            message: text
        }); //window.socket initialized at Chat.jsx

        editable.current.innerText = "";
        editable.current.focus();
    };

    const blurHandler = () => {
        console.log('test')
        if (!editable.current.innerText.length) return setPlaceholder('Type here...');
        setPlaceholder('');
    }

    return (
        <div className="w-full bg-base-100 pl-3 pr-2 py-1.5 rounded-xl flex items-center gap-2">
            <div
                tabIndex={0}
                contentEditable={true}
                ref={editable}
                placeholder={placeholder}
                onBlur={blurHandler}
                className="relative w-full h-max rounded-md outline-none grow-0 break-all whitespace-break-spaces before:block before:absolute before:text-base-content/60 before:content-[attr(placeholder)] focus:before:content-['']">
            </div>
            <button className="rounded-full hover:bg-primary hover:text-white p-1.5 mt-auto" onClick={sendMessage}>
                <PaperAirplaneIcon className="w-7 h-7" />
            </button>
        </div>
    );
};

export default ChatInputBox;
