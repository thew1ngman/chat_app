import useChatStore from "@_store/chats";
import { getCookie } from "@_utils/helper";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const ChatHistory = () => {
    const { chats, currentDestination, storeChat } = useChatStore((state) => state);
    const [filteredChats, setFilteredChats] = useState(chats);

    const list = useRef(null);
    const listItem = useRef(null);

    const userId = parseInt(getCookie("user.id"));

    function getChatlines() {
        axios.post("/get-chatlines", { chatId: currentDestination.chatId })
            .then(res => {
                const [chatlines, _] = res.data;
                storeChat(chatlines, true)
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    useEffect(() => {
            if (listItem?.current) {
            list.current.scroll({
                behavior: "instant",
                top: listItem.current.clientHeight * chats.length,
            });
        }
    }, [chats.length]);

    useEffect(() => {
        if (currentDestination.chatId == null) return;
        getChatlines();
    }, [currentDestination.chatId]);

    return (
        <ul className="overflow-auto h-full flex flex-col justify-end" ref={list}>
            {chats
                .filter((c) => c.chatId == currentDestination.chatId)
                .map((chat) => (
                    <li
                        key={chat.uuid}
                        ref={listItem}
                        className={`chat ${chat.originUser === userId ? "chat-end" : "chat-start"}`}
                    >
                        <pre
                            className={`chat-bubble font-sans ${
                                chat.originUser === userId ? "chat-bubble-primary" : ""
                            }`}
                        >
                            {chat.message}
                        </pre>
                    </li>
                ))}
        </ul>
    );
};

export default ChatHistory;
