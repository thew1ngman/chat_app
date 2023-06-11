import ChatRoom from "@_components/ChatRoom";
import useChatStore from "@_store/chats";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleChatRoom = () => {
    const { setCurrentDestinationData } = useChatStore((state) => state);
    const { contactName } = useParams(); //value is encoded. looks weird in URL if it isn't. haha

    useEffect(() => {
        setCurrentDestinationData({
            id: atob(contactName).split("_")[0],
            isGroupChat: false,
        });
    }, [contactName]);

    return <ChatRoom />;
};

export default SingleChatRoom;
