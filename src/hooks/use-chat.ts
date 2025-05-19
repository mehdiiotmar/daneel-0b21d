import { useChat } from "@/hooks/useChat";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatUI() {
  const { sendMessage, currentChat, chatHistory, clear, cancel, state } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (inputRef.current?.value) {
      sendMessage(inputRef.current.value, chatHistory);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-emerald-200">
        <h1 className="text-2xl font-semibold text-emerald-600 mb-4 text-center">
          MK Smart Assistant 💡
        </h1>

        <div className="h-[400px] overflow-y-auto space-y-4 p-2 bg-white rounded-xl border border-gray-200 shadow-inner">
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-emerald-100 text-right ml-auto"
                  : "bg-gray-100 text-left mr-auto"
              }`}
            >
              <p className="text-sm text-gray-800">{msg.content}</p>
            </div>
          ))}
          {currentChat && (
            <div className="p-3 rounded-lg bg-gray-100 text-left mr-auto max-w-[80%] animate-pulse">
              <p className="text-sm text-gray-500">{currentChat}</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Input
            type="text"
            placeholder="Pose ta question ici..."
            ref={inputRef}
            className="flex-1 bg-white border border-emerald-300 shadow-inner"
            disabled={state === "loading"}
          />
          <Button
            onClick={handleSend}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            disabled={state === "loading"}
          >
            Envoyer
          </Button>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <button onClick={clear} className="hover:text-red-500">🧹 Effacer</button>
          <button onClick={cancel} className="hover:text-yellow-500">⛔ Annuler</button>
        </div>
      </div>
    </div>
  );
}
