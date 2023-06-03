import ThemeChange from "@_components/ThemeChange";

const Chat = () => {
    return ( 
        <>
            <nav className="flex w-full justify-between items-center px-6 py-3 border-b border-base-300">
                <div className="flex items-center gap-1">
                    <img className="h-8 w-8" src="src\assets\chat-bubble.svg" alt="chat-bubble" />
                    <h1 className="uppercase font-bold">Chat App</h1>
                </div>
                <ThemeChange />
            </nav>
        </>
     );
}
 
export default Chat;