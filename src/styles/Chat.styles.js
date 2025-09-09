import styled from "styled-components";

export const ChatLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  width: 100%;
  height: 100%;
`;

export const Messages = styled.div`
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MessagesInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Bubble = styled.div`
  max-width: min(90%, 1200px);
  height: 5vh;
  width: fit-content;
  padding: 12px 16px;
  border-radius: 14px;
  line-height: 1.5;
  font-size: 20px;
  background: ${(p) => (p.$me ? "#ffe6d3" : "#f5f5f7")};
  color: #222;
  align-self: ${(p) => (p.$me ? "flex-end" : "flex-start")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const Composer = styled.form`
  padding: 12px 16px;
  border-top: 1px solid var(--border);
  background: #fff;
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
