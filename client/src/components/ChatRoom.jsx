import ChatHistory from "./ChatHistory";
import ChatInputBox from "./ChatInputBox";

const ChatRoom = () => {
    return (
        <div className="w-full py-2.5 px-3 flex flex-col justify-between gap-4">
            <ChatHistory />
            <ChatInputBox />
        </div>
    );
};

export default ChatRoom;
