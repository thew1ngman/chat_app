import { getCookie } from "@_utils/helper";

const ChatBubble = ({ messageData }) => {
    const userId = getCookie('user.id');

    return (
        <div className={`chat ${messageData.userId == userId ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-bubble">{ messageData.message }</div>
        </div>
    )
}

export default ChatBubble;