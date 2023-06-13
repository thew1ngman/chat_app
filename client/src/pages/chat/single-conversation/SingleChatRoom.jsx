import ChatRoom from "@_components/ChatRoom";
import useChatStore from "@_store/chats";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleChatRoom = () => {
    const { setCurrentDestinationData } = useChatStore((state) => state);
    const { pathName } = useParams(); //value is encoded. looks weird in URL if it isn't. haha

    useEffect(() => {
        const param = atob(pathName).split("_"); // idx 0 is contactUserId; last idx is chatId

        setCurrentDestinationData({
            id: param[0],
            isGroupChat: false,
            chatId: param[param.length - 1],
        });
    }, [pathName]);

    return <ChatRoom />;
};

export default SingleChatRoom;
