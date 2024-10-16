import { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu";
import Title from "../components/common/Title";
import {
  get_personal_address,
  try_create_message,
  try_query_all_messages,
} from "../util/secretClient";

const Chat = () => {
  const [addr, setAddr] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setAddress = async () => {
      let personal_addr = await get_personal_address();
      setAddr(personal_addr);
    };

    setAddress();

    try_query_all_messages().then((messages) => {
      setMessages(messages);
      console.log(messages);
    });
  }, []);

  const addMessage = (text: string) => {
    let msg = { message: text, sender: addr };
    try_create_message(msg.message).then(() => setMessages([...messages, msg]));
  };

  const messageDisplay = () => {
    return messages.map((message, index) => (
      <div
        key={index}
        className={`flex flex-col items-${
          message.sender == addr ? "end" : "start"
        } mb-2`}
      >
        <p className="text-gray-500 mb-1">
          {message.sender == addr ? "You" : "Anonymous"}
        </p>
        <div className="bg-white rounded-xl px-3 py-1 w-max">
          {message.message}
        </div>
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
    <div className="flex flex-col h-screen items-center">
      <Title title="Chat" description="Organise a Trade" />

      {/* Main content */}
      <div className="flex flex-col flex-grow w-[75vw] lg:w-[50vw] bottom-animation">
        <div
          ref={chatContainerRef}
          className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-275px)]"
        >
          {messageDisplay()}
        </div>

        <input
          placeholder="Type a message..."
          className="fixed bottom-1 w-[75vw] lg:w-[50vw] rounded-lg py-3 mb-24 text-sm bg-neutral-900 border-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 text-white placeholder:text-slate-600"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              addMessage(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>

      <Menu page="chat" />
    </div>
  );
};

export default Chat;
