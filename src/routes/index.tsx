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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, currentChat]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [state]);

  return (
    <App title="MK SMART Home Assistant">
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <section className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col space-y-8">
          {chatHistory.length === 0 ? (
            <>
              <Welcome />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {appConfig.samplePhrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(phrase, chatHistory)}
                    className="flex items-center justify-center gap-3 bg-white/20 border border-white/30 text-white font-semibold p-4 rounded-2xl hover:bg-white/30 transition"
                    aria-label={`Envoyer la phrase exemple: ${phrase}`}
                  >
                    <Lightbulb size={20} className="text-yellow-300" />
                    {phrase}
                  </button>
                ))}
              </div>

              <p className="text-center text-xs text-gray-400 mt-6 select-none">
                Créé avec <span className="text-red-500">❤️</span> par Mehdi |{" "}
                <a
                  href="https://api.whatsapp.com/message/TPX5EL6KJMDNP1?autoload=1&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-400 transition"
                >
                  Contact
                </a>
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-col space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {chatHistory.map((msg, idx) => (
                  <ChatMessage key={idx} message={msg} />
                ))}
                {currentChat && <ChatMessage message={currentMessage} />}
                <div ref={bottomRef} />
              </div>
            </>
          )}

          <form
            className="mt-4 w-full flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
            onSubmit={(e) => {
              e.preventDefault();
              if (!message.trim()) return;
              sendMessage(message.trim(), chatHistory);
              setMessage("");
            }}
          >
            {chatHistory.length > 1 && (
              <button
                type="button"
                onClick={clear}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-l-xl font-semibold transition"
                title="Effacer l'historique"
                aria-label="Effacer l'historique"
              >
                <Lock size={20} />
              </button>
            )}

            <input
              ref={inputRef}
              className="flex-grow p-4 text-white bg-transparent placeholder-gray-400 outline-none text-lg"
              type="text"
              value={message}
              placeholder="Parlez à votre maison..."
              onChange={(e) => setMessage(e.target.value)}
              disabled={state !== "idle"}
              aria-label="Entrer votre message"
              autoComplete="off"
            />

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-r-xl font-bold transition"
              disabled={state !== "idle"}
              aria-label="Envoyer le message"
            >
              Envoyer
            </button>
          </form>
        </section>
      </main>
    </App>
  );
}
