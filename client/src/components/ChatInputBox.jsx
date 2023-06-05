import { useState } from "react";

const ChatInputBox = () => {
    const [message, setMessage] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={sendMessage}>
            <textarea 
                name="message" 
                id="message" 
                className="w-full textarea textarea-ghost h-max">
            </textarea>
        </form>
    );
};

export default ChatInputBox;
