# 김현수 포트폴리오

채용 담당자가 첫 화면과 프로젝트 요약만으로 **어떤 개발자인지, 무엇을 어디까지 만들었는지, 어떤 문제를 어떻게 해결했는지** 알 수 있도록 만든 반응형 포트폴리오 사이트입니다.

- React 19 · TypeScript · Vite · React Router
- 폰트: Pretendard (npm 패키지로 자체 호스팅, 필요한 글자만 내려받는 dynamic subset)

## 실행

```bash
npm install
npm run dev       # 개발 서버 (http://localhost:5173) — 자리표시자·미연결 링크 안내가 보입니다
npm run build     # 타입 검사 + 배포용 빌드(dist/) + 프로젝트별 공유 메타데이터 HTML 생성
npm run preview   # 빌드 결과 확인 (http://localhost:4173) — 실제 배포 화면과 같습니다
```

Node.js 22.18 이상이 필요합니다. (빌드 후 스크립트가 `src/content/site.ts`를 직접 읽습니다.)

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 첫 화면 → 대표 프로젝트 2개 → 개인 제작 → 개발자로서의 기준 → GitHub·PDF |
| `/projects/drawandyou` | DRAW&YOU 캔버스 성능 문제 해결 과정 |
| `/projects/ddiring` | 띠링 음성 안내 기능 설계 판단 과정 |

프로젝트 상세 URL은 각각 공유할 수 있고, 빌드 시 `dist/projects/<slug>.html`·`dist/projects/<slug>/index.html`에 프로젝트별 제목·설명·미리보기 이미지가 들어갑니다.

## 내용 수정

모든 문구·프로젝트·링크는 **`src/content/site.ts` 한 파일**에서 수정합니다.

- 링크 `href`가 `''`이면 버튼이 화면에 나타나지 않습니다. (개발 모드에서만 "미연결" 안내 표시)
- 이미지 `src`가 없으면 개발 모드에서만 "자리표시자 · 실제 자료 아님" 상자가 보이고, 배포 빌드에서는 숨겨집니다.
- `siteMeta.url`에 배포 주소를 넣으면 공유 이미지가 절대 경로로 바뀌고 canonical·sitemap.xml이 생성됩니다.

## 사용한 실제 자료

- DRAW&YOU 화면 4장: [DRAW-AND-YOU/WEB-Frontend](https://github.com/DRAW-AND-YOU/WEB-Frontend) `docs/images/`의 서비스 캡처를 WebP로 변환
- 띠링 앱 시작 화면: 본인 제공 캡처 (`public/images/ddiring/start-*.webp`), 공유 이미지에는 [ddiring-team/FRONT](https://github.com/ddiring-team/FRONT) 배너 사용
- 포트폴리오 PDF: `public/files/kim-hyunsoo-portfolio.pdf` — 공개용 사본으로 **전화번호를 지운** 버전
- 시연 영상·Figma·사용자 매뉴얼 링크: 포트폴리오 PDF에 연결된 주소와 동일

## 교체·추가할 자료

| 자료 | 넣을 위치 | 현재 상태 |
| --- | --- | --- |
| 이 포트폴리오 사이트의 배포 주소 | `siteMeta.url` | 없음 → 공유 이미지가 상대 경로 |
| 띠링 테스트용 APK 공개 링크 (선택) | `projects[1].links` 의 `apk` | 없음 → 버튼 숨김 |
| DRAW&YOU 시연 영상 URL (선택) | `projects[0].links` 의 `demo` | 없음 → 버튼 숨김 |
| DRAW&YOU 성능 측정 캡처 (Performance 탭·DevTools) | `public/images/drawandyou/performance.webp` 후 `detail.result.evidence.src` | 없음 → 숨김 |
| 띠링 앱 내부 화면 추가 캡처 (선택) | `public/images/ddiring/` 후 `projects[1].detail.gallery` | 시작 화면 1장 |
| 에임 연습 프로그램 화면 (선택) | `sideProject`에 이미지 필드 추가 | 없음 → 텍스트 카드 |

## 배포

정적 파일(`dist/`)만 있으면 됩니다. Vercel은 `vercel.json`이 포함되어 있어 그대로 배포됩니다. 다른 정적 호스팅도 `404.html`로 클라이언트 라우팅을 처리합니다.
