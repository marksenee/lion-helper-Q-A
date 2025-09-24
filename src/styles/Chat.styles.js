import styled, { keyframes } from "styled-components";

export const ChatLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
`;

export const Messages = styled.div`
  padding: 16px;
  /* padding-top: 32px; */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  flex: 1 1 0;
  overscroll-behavior: contain;
`;

export const MessagesInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Bubble = styled.div`
  max-width: min(90%, 1200px);
  min-height: clamp(44px, 7vh, 72px);
  width: fit-content;
  padding: 16px 22px;
  border-radius: 14px;
  line-height: 1.5;
  font-size: 22px;
  background: ${(p) => (p.$me ? "#ffe6d3" : "#f5f5f7")};
  color: #222;
  align-self: ${(p) => (p.$me ? "flex-end" : "flex-start")};
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const Composer = styled.form`
  padding: 12px 16px;
  border-top: 1px solid var(--border);
  background: #fff;
  flex: 0 0 auto;
`;

export const ComposerInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ComposerBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  height: clamp(56px, 7vh, 72px);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 0 12px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

  input[type="text"] {
    border: none;
    outline: none;
    font-size: 18px;
    padding: 0 6px;
  }

  button[type="submit"] {
    height: 40px;
    align-self: center;
    padding: 0 18px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--brand);
    color: #fff;
    cursor: pointer;
  }
`;

// Typing indicator animation (three bouncing dots)
const typingBounce = keyframes`
  0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
`;

export const TypingIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 1em;

  span {
    width: 6px;
    height: 6px;
    background: #666;
    border-radius: 50%;
    display: inline-block;
    animation: ${typingBounce} 1.4s infinite ease-in-out both;
  }

  span:nth-child(1) {
    animation-delay: -0.32s;
  }
  span:nth-child(2) {
    animation-delay: -0.16s;
  }
  span:nth-child(3) {
    animation-delay: 0s;
  }
`;

// Lion icon subtle float animation
const floatY = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

export const LoadingRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  column-gap: 10px;
  row-gap: 6px;
  /* margin-top: 5px; */
`;

export const LionIcon = styled.img`
  width: 65px;
  height: 65px;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
`;

export const LoadingText = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  align-self: center;
`;

export const DefaultText = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  align-self: center;
`;
