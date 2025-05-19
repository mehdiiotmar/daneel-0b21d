import { fetchEventSource } from "@fortaine/fetch-event-source";
import { useMemo, useState, useCallback } from "react";
import { appConfig } from "../../config.browser";

const API_PATH = "/api/chat";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function streamAsyncIterator(stream: ReadableStream) {
  const reader = stream.getReader();
  return {
    next() {
      return reader.read();
    },
    return() {
      reader.releaseLock();
      return { value: {} };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

export function useChat() {
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<"idle" | "waiting" | "loading">("idle");

  const abortController = useMemo(() => new AbortController(), []);

  const cancel = useCallback(() => {
    setState("idle");
    abortController.abort();

    if (currentChat) {
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: currentChat },
      ]);
      setCurrentChat("");
    }
  }, [abortController, currentChat]);

  const clear = useCallback(() => {
    console.log("clear");
    setChatHistory([]);
  }, []);

  const sendMessage = useCallback(
    async (message: string, chatHistory: ChatMessage[]) => {
      setState("waiting");

      let chatContent = "";
      const updatedHistory = [
        ...chatHistory,
        { role: "user", content: message },
      ];

      setChatHistory(updatedHistory);
      const body = JSON.stringify({
        messages: updatedHistory.slice(-appConfig.historyLength),
      });

      const decoder = new TextDecoder();

      const res = await fetch(API_PATH, {
        body,
        method: "POST",
        signal: abortController.signal,
      });

      setCurrentChat("...");

      if (!res.ok || !res.body) {
        setState("idle");
        return;
      }

      for await (const event of streamAsyncIterator(res.body)) {
        setState("loading");

        const data = decoder.decode(event).split("\n");
        for (const chunk of data) {
          if (!chunk) continue;

          const message = JSON.parse(chunk);
          if (message?.role === "assistant") {
            chatContent = "";
            continue;
          }

          const content = message?.choices?.[0]?.delta?.content;
          if (content) {
            chatContent += content;
            setCurrentChat(chatContent);
          }
        }
      }

      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: chatContent },
      ]);
      setCurrentChat(null);
      setState("idle");
    },
    [abortController]
  );

  return {
    sendMessage,
    currentChat,
    chatHistory,
    cancel,
    clear,
    state,
  };
}
