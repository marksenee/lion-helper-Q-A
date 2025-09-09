import React, { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineChat, MdOutlineNotificationsNone } from "react-icons/md";
import { LuFolderOpen } from "react-icons/lu";
import {
  AppGrid,
  Sidebar,
  Logo,
  Nav,
  NavButton,
  HeaderBar,
  Brand,
  Main,
  Hero,
  LionImg,
  LionFallback,
  Title,
  SearchForm,
  QuickWrap,
  ChipButton,
} from "./styles/App.styles";
import Chat from "./pages/Chat.jsx";

function App() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("home");
  const shortcuts = useMemo(
    () => [
      { key: "출결", icon: "✔️" },
      { key: "훈련장려금", icon: "🪙" },
      { key: "공결신청", icon: "📱" },
      { key: "교육", icon: "🎓" },
    ],
    []
  );
  const [logoError, setLogoError] = useState(false);
  const [heroError, setHeroError] = useState(false);
  const LOGO_BOX = 60; // 로고 컨테이너 박스 크기(px)
  const LOGO_ICON = 60; // 사자 로고 아이콘 이미지 크기(px)
  const HERO_ICON = 100; // 히어로 사자 아이콘 크기(px)
  const LOGO_SRC = `${process.env.PUBLIC_URL || ""}/images/logo2.png`;
  const NAV_ICON = 40; // 사이드바 네비게이션 아이콘 크기(px)
  const SIDEBAR_WIDTH = 100; // 사이드바 너비(px)

  return (
    <AppGrid $sidebar={SIDEBAR_WIDTH}>
      <Sidebar>
        <Logo $box={LOGO_BOX}>
          {logoError ? (
            <LionFallback $size={LOGO_ICON}>🦁</LionFallback>
          ) : (
            <LionImg
              src={LOGO_SRC}
              alt="라이언 로고"
              $size={LOGO_ICON}
              onError={() => setLogoError(true)}
              onClick={() => setView("/")}
            />
          )}
        </Logo>
        <Nav>
          <NavButton
            title="채팅"
            onClick={() => setView("chat")}
            $active={view === "chat"}
            aria-pressed={view === "chat"}
          >
            <MdOutlineChat size={NAV_ICON} />
          </NavButton>
          <NavButton title="공지">
            <MdOutlineNotificationsNone size={NAV_ICON} />
          </NavButton>
          <NavButton title="기록">
            <LuFolderOpen size={NAV_ICON} />
          </NavButton>
        </Nav>
      </Sidebar>

      {/* <HeaderBar>
        <Brand>라이언헬퍼</Brand>
      </HeaderBar> */}

      <Main>
        {view === "chat" ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              alignSelf: "stretch",
              justifySelf: "stretch",
            }}
          >
            <Chat />
          </div>
        ) : (
          <Hero>
            {/* {heroError ? (
            <LionFallback $size={HERO_ICON}>🦁</LionFallback>
          ) : (
            <LionImg
              src={LOGO_SRC}
              alt="라이언 아이콘"
              $size={HERO_ICON}
              onError={() => setHeroError(true)}
            />
          )} */}
            <Title>무엇이 궁금하세요?</Title>

            <SearchForm
              onSubmit={(e) => {
                e.preventDefault();
                alert(`검색: ${query}`);
              }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="질문을 입력하세요"
                aria-label="검색어"
              />
              <button
                type="submit"
                style={{ all: "unset", cursor: "pointer" }}
                aria-label="검색"
              >
                <CiSearch className="icon" size={22} />
              </button>
            </SearchForm>

            <QuickWrap>
              {shortcuts.map((s) => (
                <ChipButton key={s.key} onClick={() => setQuery(s.key)}>
                  {s.icon} {s.key}
                </ChipButton>
              ))}
            </QuickWrap>
          </Hero>
        )}
      </Main>
    </AppGrid>
  );
}

export default App;
