import ChatHistory from "@_components/ChatHistory";
import ChatInputBox from "@_components/ChatInputBox";
import SideList from "@_components/SideList"

const SingleConversation = () => {
    return ( 
        <div className="w-full flex">
            <SideList name="Chats" />
            <div className="w-full h-full py-2 px-3 flex flex-col justify-between gap-4">
                <ChatHistory />
                <ChatInputBox />
            </div>
        </div>
     );
}
 
export default SingleConversation;