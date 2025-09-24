import React, { useMemo, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import {
  MdOutlineChat,
  MdOutlineNotificationsNone,
  MdChevronRight,
} from "react-icons/md";
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
  FAQWrap,
  FAQCard,
  FAQHeader,
  FAQItemButton,
  LoadingWrap,
  Spinner,
  EmptyWrap,
} from "./styles/App.styles";
import Chat from "./pages/Chat.jsx";
import { fetchQaQuestionsByKeyword } from "./api/chatApi";

function App() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("home");
  const [initialPrompt, setInitialPrompt] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [faqQuestions, setFaqQuestions] = useState([]);
  const [isFaqLoading, setIsFaqLoading] = useState(false);
  const shortcuts = useMemo(
    () => [
      { key: "출결", icon: "✔️" },
      { key: "훈련장려금", icon: "🪙" },
      { key: "공결", icon: "📱" },
      { key: "교육", icon: "🎓" },
    ],
    []
  );
  const keywordFAQs = useMemo(
    () => ({
      훈련장려금: [
        "훈련장려금 수령 계좌는 어떻게 변경하나요?",
        "훈련장려금은 언제 수령할 수 있나요?",
        "실업급여를 받고 있는데 훈련장려금 수령이 가능한가요?",
      ],
      출결: ["지각과 조퇴는 어떻게 처리되나요?", "출결 기준은 무엇인가요?"],
      공결신청: ["공결 신청 방법을 알려주세요."],
      교육: ["교육 일정은 어디서 확인하나요?"],
    }),
    []
  );
  const faqs = useMemo(
    () => (selectedKeyword ? faqQuestions : []),
    [selectedKeyword, faqQuestions]
  );

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      if (!selectedKeyword) return;
      setIsFaqLoading(true);
      setFaqQuestions([]);
      try {
        const questions = await fetchQaQuestionsByKeyword(selectedKeyword);
        if (!ignore) setFaqQuestions(questions);
      } catch (e) {
        if (!ignore) setFaqQuestions(keywordFAQs[selectedKeyword] || []);
      } finally {
        if (!ignore) setIsFaqLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [selectedKeyword, keywordFAQs]);
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
          {/* <NavButton title="공지">
            <MdOutlineNotificationsNone size={NAV_ICON} />
          </NavButton>
          <NavButton title="기록">
            <LuFolderOpen size={NAV_ICON} />
          </NavButton> */}
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
              minHeight: "0",
              alignSelf: "stretch",
              justifySelf: "stretch",
            }}
          >
            <Chat initialPrompt={initialPrompt} />
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
                const clean = (query || "").trim();
                if (!clean) return;
                setInitialPrompt(clean);
                setView("chat");
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
                <ChipButton
                  key={s.key}
                  $active={selectedKeyword === s.key}
                  onClick={() => setSelectedKeyword(s.key)}
                >
                  {s.icon} {s.key}
                </ChipButton>
              ))}
            </QuickWrap>

            {(selectedKeyword || isFaqLoading) && (
              <FAQWrap>
                <FAQCard>
                  <FAQHeader>
                    <h3>{selectedKeyword} 질문</h3>
                    <button
                      type="button"
                      aria-label="FAQ 닫기"
                      onClick={() => {
                        setSelectedKeyword(null);
                        setFaqQuestions([]);
                        setIsFaqLoading(false);
                      }}
                    >
                      ×
                    </button>
                  </FAQHeader>
                  {isFaqLoading ? (
                    <LoadingWrap>
                      <Spinner aria-hidden />
                      <span>연관 질문 불러오는 중…</span>
                    </LoadingWrap>
                  ) : faqs.length === 0 ? (
                    <EmptyWrap>관련 질문이 없어요</EmptyWrap>
                  ) : (
                    <div role="list">
                      {faqs.map((q) => (
                        <FAQItemButton
                          key={q}
                          role="listitem"
                          onClick={() => {
                            setInitialPrompt(q);
                            setView("chat");
                          }}
                        >
                          <span className="left">
                            <span
                              aria-hidden
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: 999,
                                background: "var(--text-muted)",
                                display: "inline-block",
                              }}
                            />
                            <span className="question">{q}</span>
                          </span>
                          <MdChevronRight size={20} className="chev" />
                        </FAQItemButton>
                      ))}
                    </div>
                  )}
                </FAQCard>
              </FAQWrap>
            )}
          </Hero>
        )}
      </Main>
    </AppGrid>
  );
}

export default App;
