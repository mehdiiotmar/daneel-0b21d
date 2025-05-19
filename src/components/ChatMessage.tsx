import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const CustomTable: React.FC<any> = ({ children, ...props }) => (
  <div className="overflow-x-auto">
    <table {...props} className="w-full text-left border-collapse table-auto">
      {children}
    </table>
  </div>
);

const ChatMessageComponent: React.FC<{ message: ChatMessage }> = ({ message }) =>
  message.role === "user" ? (
    <div className="flex items-end justify-end my-2">
      <div className="flex items-end gap-2">
        <div className="bg-green-500 text-white rounded-2xl px-4 py-2 max-w-xs md:max-w-md shadow-md">
          <p className="break-words">{message.content}</p>
        </div>
        <img
          src="/user-avatar.png"
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>
  ) : (
    <div className="flex items-end justify-start my-2">
      <div className="flex items-end gap-2">
        <img
          src="/bot-avatar.png"
          alt="Assistant"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="bg-white text-gray-800 rounded-2xl px-4 py-2 max-w-xs md:max-w-md shadow border border-gray-300">
          <ReactMarkdown
            children={message.content}
            remarkPlugins={[remarkGfm]}
            components={{
              table: CustomTable,
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  className="max-w-full rounded-md"
                  alt={props.alt}
                />
              ),
            }}
          />
        </div>
      </div>
    </div>
  );

export default function ChatExample() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "user",
      content: "Salut, comment ça va ?",
    },
    {
      role: "assistant",
      content:
        "Salut ! Je vais bien, merci 😄.\n\nVoici une image pour toi:\n\n![Chat mignon](https://placekitten.com/300/200)",
    },
  ]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      {messages.map((msg, i) => (
        <ChatMessageComponent key={i} message={msg} />
      ))}
    </div>
  );
}
