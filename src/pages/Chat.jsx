import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  ChatLayout,
  Messages,
  MessagesInner,
  Bubble,
  Composer,
  ComposerInner,
  ComposerBar,
} from "../styles/Chat.styles";
import { MdArrowForward } from "react-icons/md";
import { sendChatPrompt } from "../api/chatApi";

function Chat({ initialPrompt = "" }) {
  const [messages, setMessages] = useState(() => [
    { id: 1, author: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" },
  ]);
  const [text, setText] = useState("");
  const endRef = useRef(null);
  const messagesWrapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const lastInitialPromptRef = useRef("");

  const canSend = useMemo(
    () => text.trim().length > 0 && !isLoading,
    [text, isLoading]
  );

  useEffect(() => {
    const el = messagesWrapRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const sendPrompt = async (prompt) => {
    const clean = (prompt || "").trim();
    if (!clean || isLoading) return;
    const userMsg = { id: Date.now(), author: "me", text: clean };
    setMessages((prev) => [...prev, userMsg]);
    setText("");
    setError("");
    setIsLoading(true);

    const placeholderId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      {
        id: placeholderId,
        author: "bot",
        text: "AI가 응답을 생성하고 있습니다...",
      },
    ]);

    try {
      const data = await sendChatPrompt(clean);
      const botText = data?.response || "응답을 가져오지 못했습니다.";
      setMessages((prev) =>
        prev.map((m) => (m.id === placeholderId ? { ...m, text: botText } : m))
      );
    } catch (err) {
      const fallback = "오류가 발생했어요. 잠시 후 다시 시도해주세요.";
      setMessages((prev) =>
        prev.map((m) => (m.id === placeholderId ? { ...m, text: fallback } : m))
      );
      setError(
        typeof err?.message === "string" ? err.message : "Request failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend) return;
    await sendPrompt(text);
  };

  useEffect(() => {
    const fromHome = (initialPrompt || "").trim();
    if (!fromHome) return;
    if (lastInitialPromptRef.current === fromHome) return;
    lastInitialPromptRef.current = fromHome;
    sendPrompt(fromHome);
  }, [initialPrompt]);

  return (
    <ChatLayout>
      <Messages ref={messagesWrapRef}>
        <MessagesInner>
          {messages.map((m) => (
            <Bubble key={m.id} $me={m.author === "me"}>
              {m.text}
            </Bubble>
          ))}
          <div ref={endRef} />
        </MessagesInner>
      </Messages>

      <Composer onSubmit={handleSubmit}>
        <ComposerInner>
          <ComposerBar>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="메시지를 입력하세요"
              aria-label="메시지 입력"
              disabled={isLoading}
            />
            <button type="submit" disabled={!canSend} aria-label="전송">
              <MdArrowForward size={20} />
            </button>
          </ComposerBar>
          {error && (
            <div
              role="alert"
              style={{ color: "#c00", marginTop: 8, fontSize: 14 }}
            >
              {error}
            </div>
          )}
        </ComposerInner>
      </Composer>
    </ChatLayout>
  );
}

export default Chat;
