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

function Chat() {
  const [messages, setMessages] = useState(() => [
    { id: 1, author: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" },
  ]);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  const canSend = useMemo(() => text.trim().length > 0, [text]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSend) return;
    const userMsg = { id: Date.now(), author: "me", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setText("");
    // 간단한 봇 응답 (예시)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          author: "bot",
          text: "좋은 질문이에요! 곧 더 똑똑해질 예정입니다.",
        },
      ]);
    }, 400);
  };

  return (
    <ChatLayout>
      <Messages>
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
            />
            <button type="submit" disabled={!canSend} aria-label="전송">
              <MdArrowForward size={20} />
            </button>
          </ComposerBar>
        </ComposerInner>
      </Composer>
    </ChatLayout>
  );
}

export default Chat;
