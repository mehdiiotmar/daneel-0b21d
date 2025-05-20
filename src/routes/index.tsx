import { useState, useEffect, useRef, useMemo } from "react"; 
import { App } from "../App";
import { useChat } from "../hooks/use-chat";
import { ChatMessage } from "../components/ChatMessage";
import { Welcome } from "../components/Welcome";
import { appConfig } from "../../config.browser";
import { Wand2, Lightbulb, Thermometer, Lock, Send, Trash2 } from "lucide-react";

export default function Index() {
  const [message, setMessage] = useState("");
  const { currentChat, chatHistory, sendMessage, cancel, state, clear } = useChat();
  const currentMessage = useMemo(() => ({ content: currentChat ?? "", role: "assistant" }), [currentChat]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, currentChat]);
  useEffect(() => { inputRef.current?.focus(); }, [state]);

  return (
    <App title="MK SMART Home Assistant">
      <main className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 text-white p-6 flex flex-col items-center justify-center font-sans">
        <section className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col space-y-8 max-h-[75vh] overflow-y-auto">
          {chatHistory.length === 0 ? (
            <>
              <Welcome />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {appConfig.samplePhrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(phrase, chatHistory)}
                    className="bg-white/20 border border-white/30 text-white py-3 px-5 rounded-xl font-medium hover:bg-white/30 transition shadow-md"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-300 text-center mt-8 select-none">
                Créé avec ❤️ par Mehdi |{" "}
                <a 
                  className="underline hover:text-emerald-300 transition" 
                  href="https://api.whatsapp.com/message/TPX5EL6KJMDNP1?autoload=1&app_absent=0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Contact
                </a>
              </p>
            </>
          ) : (
            <>
              {chatHistory.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))}
              {currentChat && <ChatMessage message={currentMessage} />}
            </>
          )}
          <div ref={bottomRef} />
        </section>

        <form
          className="mt-6 w-full max-w-4xl flex items-center bg-white/20 backdrop-blur-lg rounded-2xl shadow-inner overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            if (message.trim() === "") return;
            sendMessage(message, chatHistory);
            setMessage("");
          }}
        >
          {chatHistory.length > 1 && (
            <button
              type="button"
              onClick={clear}
              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-3 transition"
              aria-label="Clear chat"
              title="Effacer la conversation"
            >
              <Trash2 size={18} />
            </button>
          )}
          <input
            ref={inputRef}
            className="flex-grow bg-transparent text-white placeholder-white/70 py-3 px-4 outline-none text-lg"
            type="text"
            value={message}
            placeholder="Parlez à votre maison..."
            onChange={(e) => setMessage(e.target.value)}
            disabled={state !== "idle"}
            autoComplete="off"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 transition"
            aria-label="Send message"
            title="Envoyer"
          >
            <Send size={20} />
          </button>
        </form>
      </main>
    </App>
  );
}
