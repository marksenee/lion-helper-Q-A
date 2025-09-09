import styled from "styled-components";

export const AppGrid = styled.div`
  display: grid;
  grid-template-columns: ${(p) => p.$sidebar || 80}px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  height: 100vh;
`;

export const Sidebar = styled.aside`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  background: var(--sidebar);
  border-right: 1px solid var(--border);
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.$box || 46}px;
  height: ${(p) => p.$box || 46}px;
  border-radius: 10px;
  background: transparent;
  border-color: transparent;
  color: var(--brand);
  font-weight: 700;
  margin-bottom: 20%;
  border: none;
`;

export const Nav = styled.nav`
  margin-top: 24px;
  display: grid;
  gap: 16px;
`;

export const NavButton = styled.button`
  width: 60px;
  height: 60px;
  margin-top: 5px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--brand);
  display: grid;
  place-items: center;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    /* border-color: var(--brand-500); */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    background: #ffdbbf;
    outline: none;
  }
`;

export const HeaderBar = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid var(--border);
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: var(--brand);
`;

export const Main = styled.main`
  grid-area: main;
  display: grid;
  place-items: center;
`;

export const Hero = styled.section`
  text-align: center;
  max-width: 960px;
  width: 100%;
  padding: 24px;
  transform: translateY(clamp(-100px, -8vh, -32px));
`;

export const LionImg = styled.img`
  width: ${(p) => p.$size || 64}px;
  height: ${(p) => p.$size || 64}px;
  object-fit: contain;
  display: block;
`;

export const LionFallback = styled.div`
  font-size: ${(p) => Math.round((p.$size || 64) * 0.75)}px;
  line-height: 1;
`;

export const Title = styled.h1`
  padding: 5%;
  font-size: 60px;
  font-weight: 700;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: min(900px, 92vw);
  height: clamp(56px, 8.5vh, 80px);
  margin: 0 auto;
  gap: 20px;
  border: 1px solid var(--border);
  border-radius: 36px;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover,
  &:focus-within {
    /* border-color: var(--brand-500); */
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    height: 100%;
    font-size: 20px;
    margin-left: 10px;
    color: #565656;
  }

  .icon {
    color: #565656;
    margin-right: 10px;
    flex: 0 0 auto;
  }
`;

export const QuickWrap = styled.div`
  margin-top: clamp(16px, 2.5vh, 32px);
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ChipButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  padding: 15px 20px;
  margin-top: 15px;
  font-size: 20px;
  border-radius: 12px;
  background: #fff;
  color: #333;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease, background-color 0.18s ease, color 0.18s ease;
  will-change: transform;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: var(--brand-500);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    background: #fff8f0;
    outline: none;
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover,
    &:focus-visible {
      transform: none;
    }
  }
`;

export const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: var(--text-muted);
  border-radius: 50%;
`;
