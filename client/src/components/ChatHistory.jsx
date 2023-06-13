import { getCookie } from "@_utils/helper";
import { useEffect, useRef } from "react";
import useChatStore from "@_store/chats";
import axios from "axios";

const ChatHistory = () => {
    const { chats, currentDestination, storeChat } = useChatStore((state) => state);

    const list = useRef(null);
    const listItem = useRef(null);

    const userId = parseInt(getCookie("user.id"));

    function getChatlines() {
        axios
            .post("/get-chatlines", { chatId: currentDestination.chatId })
            .then((res) => {
                const [chatlines, _] = res.data;
                storeChat(chatlines, true);
            })
            .catch((err) => {
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
    }, [chats.length, currentDestination.chatId]);

    useEffect(() => {
        if (currentDestination.chatId == null) return;
        getChatlines();
    }, [currentDestination.chatId]);

    return (
        <div className="overflow-auto h-full flex" ref={list}>
            <ul className="flex flex-col justify-end w-full mt-auto">
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
        </div>
    );
};

export default ChatHistory;
