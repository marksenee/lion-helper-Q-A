# Lion Helper Q/A (라이언헬퍼)

교육생의 자주 묻는 질문을 빠르게 찾고, AI 챗봇과 대화하며 문제를 해결할 수 있도록 돕는 웹 애플리케이션입니다. 홈 화면에서 키워드(출결, 훈련장려금, 공결, 교육) 기반으로 연관 FAQ를 조회하고, 채팅 화면에서 자연어로 질문을 입력하여 답변을 받을 수 있습니다.

백엔드는 Render에 배포된 API(`https://lionhelper.onrender.com`)를 사용하며, 프론트엔드는 React로 구현되어 있으며 (`https://lion-helper-qa.vercel.app/`) 확인하실 수 있습니다.

---

## 주요 기능

- 홈 검색 및 단축키워드
  - 검색창에서 질문을 입력하여 바로 채팅으로 이동
  - 빠른 키워드(출결/훈련장려금/공결/교육) 클릭 시 연관 FAQ 목록 조회
- FAQ 연동
  - `GET /qa-list?keyword=키워드`로 연관 질문 로딩 표시/빈 상태 처리 포함
- AI 챗봇
  - `POST /chat`으로 프롬프트 전송 후 응답 표시
  - 요청 중 상태 표기 및 오류 메시지 처리
- 접근성/UX
  - 주요 인터랙션에 ARIA 라벨 적용, 키보드 전송 지원

---

## 기술 스택

- React 18 (CRA, `react-scripts`)
- styled-components 6
- axios
- react-icons

---

## 빠른 시작

사전 준비물:

- Node.js 18 이상 권장
- npm 9 이상 권장

설치 및 실행:

```bash
npm install
npm start
```

- 기본 포트: 3000 (스크립트에서 `PORT=3000` 설정)
- 기본 브라우저: Google Chrome (스크립트에서 자동 오픈)

프로덕션 빌드:

```bash
npm run build
```

테스트 실행:

```bash
npm test
```

---

## 실행 스크립트

`package.json`의 주요 스크립트:

- `start`: 개발 서버 실행 (Chrome 자동 오픈, Fast Refresh 비활성)
- `build`: 프로덕션 빌드 생성
- `test`: 테스트 러너 실행
- `eject`: CRA 설정 추출 (되돌릴 수 없음)

---

## 프로젝트 구조

```text
lion-helper-qa/
├─ public/
│  ├─ images/
│  │  ├─ favicon.ico
│  │  ├─ logo.png
│  │  └─ logo2.png
│  └─ index.html
├─ src/
│  ├─ api/
│  │  ├─ client.js            # axios 인스턴스 및 에러 인터셉터
│  │  └─ chatApi.js           # /chat, /qa-list API 래퍼
│  ├─ pages/
│  │  └─ Chat.jsx             # 채팅 화면
│  ├─ styles/
│  │  ├─ App.styles.js
│  │  └─ Chat.styles.js
│  ├─ App.jsx                  # 홈/네비/FAQ/채팅 라우팅 뷰
│  ├─ index.jsx
│  └─ ...
├─ package.json
└─ README.md
```

--

## 동작 방식 요약

1. 홈에서 질문 입력 또는 키워드 클릭
2. 키워드 선택 시 연관 FAQ를 API로부터 조회 후 리스트 렌더링
3. 질문 제출 시 채팅 화면으로 이동하여 `/chat` 호출, 봇 응답 표시
4. 로딩/빈 상태/에러를 각각 UI로 안내

---

## 트러블슈팅

- 백엔드 연결 실패: "서버 응답 없음" 또는 "Request failed" 메시지가 표시될 수 있습니다. API 서버 상태를 확인하세요.
- 포트 충돌: `npm start`가 실패하면 `PORT` 값을 변경해 실행하세요.
- CORS 문제: API 서버의 CORS 설정을 확인해야 합니다.

---

## 라이선스

프로젝트 라이선스는 미정입니다. 필요 시 조직 정책에 따라 명시하세요.

---

## 기여

이슈/개선 제안은 PR 또는 Issue로 환영합니다. 코드 스타일은 프로젝트에 이미 적용된 포맷을 따르세요.
