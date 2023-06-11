import useChatStore from "@_store/chats";
import { getCookie } from "@_utils/helper";
import { useEffect, useRef } from "react";

const ChatHistory = () => {
    const { chats, currentDestination } = useChatStore((state) => state);

    const list = useRef(null);
    const listItem = useRef(null);

    const userId = parseInt(getCookie("user.id"));

    useEffect(() => {
        if (listItem?.current) {
            list.current.scroll({
                behavior: "instant",
                top: listItem.current.clientHeight * chats.length,
            });
        }

        console.log(chats);
    }, [chats.length]);

    return (
        <ul className="overflow-auto h-full flex flex-col justify-end" ref={list}>
            {chats
                .filter((c) => c.destinationId == currentDestination.id || c.originUser == currentDestination.id)
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
