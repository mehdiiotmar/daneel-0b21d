import { useState, useEffect, useRef, useMemo } from "react";
import { App } from "../App";
import { useChat } from "../hooks/use-chat";
import { ChatMessage } from "../components/ChatMessage";
import { Welcome } from "../components/Welcome";
import { appConfig } from "../../config.browser";
import { Wand2, Lightbulb, Thermometer, Lock } from "lucide-react";

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
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 flex flex-col items-center justify-center">
        <section className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col space-y-6">
          {chatHistory.length === 0 ? (
            <>
              <Welcome />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {appConfig.samplePhrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(phrase, chatHistory)}
                    className="bg-white/10 border border-white/20 text-white p-4 rounded-xl hover:bg-white/20 transition"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                Créé avec ❤️ par Mehdi |{" "}
                <a className="underline" href="https://api.whatsapp.com/message/TPX5EL6KJMDNP1?autoload=1&app_absent=0">
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
          className="mt-6 w-full max-w-4xl flex bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(message, chatHistory);
            setMessage("");
          }}
        >
          {chatHistory.length > 1 && (
            <button
              type="button"
              onClick={clear}
              className="bg-red-600 hover:bg-red-700 text-white px-4"
            >
              Clear
            </button>
          )}
          <input
            ref={inputRef}
            className="flex-grow p-3 text-white bg-transparent placeholder-gray-400 outline-none"
            type="text"
            value={message}
            placeholder="Parlez à votre maison..."
            onChange={(e) => setMessage(e.target.value)}
            disabled={state !== "idle"}
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6"
          >
            Envoyer
          </button>
        </form>
      </main>
    </App>
  );
}
