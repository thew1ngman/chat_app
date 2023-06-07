import ChatInputBox from "@_components/ChatInputBox";
import ChatHistory from "@_components/ChatHistory";
import SideList from "@_components/SideList"
import SearchPeople from "@_components/SearchPeople";


const SingleConversation = () => {
    return (
        <div className="w-full flex">
            <SideList name="Chats">
                <SearchPeople />
            </SideList>
            <div className="w-full py-2.5 px-3 flex flex-col justify-between gap-4">
                <ChatHistory />
                <ChatInputBox />
            </div>
        </div>
    );
}

export default SingleConversation;