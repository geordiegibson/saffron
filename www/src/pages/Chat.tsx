import { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu";
import Title from "../components/common/Title";

const Chat = () => {

    const [messages, setMessages] = useState([{message: "sup", sender: "me"}, {message: "hello", sender: "you"}])
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const addMessage = (text: string) => {
        setMessages(prevMessages => [...prevMessages, { message: text, sender: "me" }]);
    }

    const messageDisplay = () => {
        return messages.map((message, index) => (
            <div 
                key={index} 
                className={`flex flex-col items-${message.sender === 'me' ? 'end' : 'start'} mb-2`}
            >   
                <p className="text-gray-500 mb-1">Anon</p>
                <div className="bg-white rounded-xl px-3 py-1 w-max">{message.message}</div>
            </div>
        ));
    };

    useEffect(() => {
        const container = chatContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight; // Scroll to the bottom
        }
    }, [messages]);

    return (

        <div className="flex flex-col h-screen w-screen items-center">

            <Title title="Chat" description="Organise a Trade" />

            {/* Main content */}
            <div className="flex flex-col flex-grow bottom-animation w-[75vw] lg:w-[50vw]">

                <div className="flex flex-col gap-1 overflow-scroll h-[650px]" ref={chatContainerRef}>
                    {messageDisplay()}
                </div>

                <input 
                    placeholder="Type a message..." 
                    className="fixed bottom-1 w-full rounded-lg py-3 mb-24 text-sm bg-neutral-900 border-none placeholder:text-slate-400 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 text-white placeholder:text-slate-600"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            addMessage(e.currentTarget.value);
                            e.currentTarget.value = '';
                        }
                    }}
                />

            </div>

            <Menu page="chat" />
        </div>
    );
};

export default Chat;
