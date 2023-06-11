import useChatStore, { socket } from "@_store/chats";
import { getCookie } from "@_utils/helper";
import { useEffect, useRef, useState } from "react";

const ChatHistory = () => {
    const chats = useChatStore((state) => state.chats);
    const list = useRef(null);
    const listItem = useRef(null);

    const userId = parseInt(getCookie("user.id"));

    useEffect(() => {
        if (listItem?.current) {
            list.current.scroll({ 
                behavior: "instant", 
                top: listItem.current.clientHeight * chats.length 
            });
        }
    }, [chats.length]);

    return (
        <ul className="overflow-auto h-full space-y-1" ref={list}>
            {chats.map((chat) => (
                <li
                    key={chat.uuid}
                    ref={listItem}
                    className={`chat ${chat.originUser === userId ? "chat-end" : "chat-start"}`}
                >
                    <pre className={`chat-bubble ${chat.originUser === userId ? "chat-bubble-primary" : ""}`}>
                        {chat.message}
                    </pre>
                </li>
            ))}
        </ul>
    );
};

export default ChatHistory;
