/**
 * 사이트의 모든 텍스트·프로젝트·링크를 이 파일 하나에서 관리합니다.
 *
 * - 링크의 href가 빈 문자열('')이면 화면에 버튼이 나타나지 않습니다.
 * - 이미지의 src가 없으면 개발 모드(npm run dev)에서만 '자리표시자'가 보이고,
 *   배포 빌드에서는 해당 영역이 숨겨집니다. replacePath 위치에 파일을 넣고 src를 채우면 됩니다.
 * - 성과 수치·사용자 수·수상 내역처럼 확인되지 않은 내용은 넣지 않습니다.
 */
import type { Principle, Profile, Project, SiteMeta, SkillGroup } from './types'

const DDIRING_DEMO = 'https://drive.google.com/file/d/1cYyqROnWaHZZO1uev67iBQqFZx5VSilf/view?usp=sharing'

export const siteMeta: SiteMeta = {
  /**
   * 배포 주소. 공유 미리보기(og:image 등)의 절대 경로에 사용됩니다. 예: 'https://hyunsoo.dev'
   * 비워 두면 Vercel 빌드에서는 프로젝트의 프로덕션 도메인(*.vercel.app 또는 연결한 도메인)을 자동으로 씁니다.
   */
  url: '',
  title: '김현수 — 불편함을 이해하고, 더 쉬운 경험을 만드는 프론트엔드 개발자',
  description:
    'DRAW&YOU와 띠링에서 UI 설계부터 웹·앱 프론트엔드 개발, API 연동과 배포까지 담당한 개발자 김현수의 포트폴리오입니다.',
  ogImage: '/og/drawandyou.jpg',
  lang: 'ko',
}

export const profile: Profile = {
  name: '김현수',
  nameEn: 'Hyunsoo Kim',
  /** 첫 화면 문구. \n 위치에서 줄을 바꿉니다. */
  headline: '불편함을 이해하고,\n더 쉬운 경험을 만드는\n프론트엔드 개발자',
  /** 흔들리는 애니메이션을 넣을 단어 */
  headlineTrouble: '불편함',
  /** 부드럽게 등장하며 강조색으로 보여 줄 구절 */
  headlineEase: '더 쉬운 경험',
  subline:
    '프론트엔드를 넘어 AI와 백엔드·서버까지 학습하며, AI 시대에 맞는 풀스택 개발자로 성장하고 있습니다.',
  highlights: [
    { label: '웹·모바일 서비스 개발', detail: 'React 웹 서비스와 React Native 앱' },
    { label: 'UI 설계부터 API 연동·배포까지', detail: 'Figma 설계 → 구현 → Vercel·APK 배포' },
    { label: 'AI를 활용한 원인 분석과 직접 검증', detail: '원인 후보는 AI와 좁히고, 확인은 도구로' },
  ],
  links: {
    github: 'https://github.com/kjy5286',
    /** public/files/ 아래의 PDF. 공개용 사본이라 전화번호는 지워 두었습니다. */
    portfolioPdf: '/files/kim-hyunsoo-portfolio.pdf',
    /** 실제 주소를 받은 경우에만 입력합니다. */
    email: 'kjy5662860@naver.com',
  },
  closing: '제가 만든 서비스와 문제 해결 과정을 더 확인해 보세요.',
}

export const projects: Project[] = [
  {
    slug: 'drawandyou',
    name: 'DRAW&YOU',
    platform: '웹 서비스',
    period: '2025.07 – 2025.12',
    oneLiner: '그림과 일기를 입력하면 AI 감정 분석 결과와 치유 콘텐츠를 확인할 수 있는 웹 서비스',
    audience: '그림과 일기로 감정을 기록하고, AI 감정 분석 결과와 치유 콘텐츠를 확인하려는 사용자',
    team: {
      members: ['프론트엔드 1명 (본인)', '백엔드 1명', 'AI 1명'],
      note: '기획은 팀 전체가 함께 참여했습니다. 백엔드와 AI 감정 분석은 각 담당 팀원이 개발했습니다.',
    },
    roleSummary: 'UI 설계 · 프론트엔드 · 캔버스 · API 연동 · 배포',
    roles: [
      { task: '서비스 전체 UI 설계', tools: 'Figma' },
      { task: '웹 프론트엔드 개발', tools: 'React · Vite' },
      { task: '드로잉 캔버스 — 그리기, 지우개, 실행 취소·다시 실행, 초기화', tools: 'react-konva' },
      { task: '백엔드·AI 분석 API 연동' },
      { task: '서비스 배포', tools: 'Vercel' },
      { task: '사용자 매뉴얼 제작' },
    ],
    caseType: '트러블슈팅',
    hook: '그림이 쌓일수록 느려지는 캔버스, 렌더링 흐름부터 점검했습니다.',
    summary: {
      problem: '그림 획이 누적될수록 캔버스 반응이 느려지고 프레임이 떨어졌습니다.',
      action:
        'React 상태 흐름과 Konva 렌더링 구조를 단계별로 나눠 원인을 분석하고, 재렌더링 범위·레이어 분리·메모이제이션 위치를 점검했습니다.',
      result: '캔버스 반응 속도를 개선하고, React DevTools와 Performance 탭으로 변화를 확인했습니다.',
    },
    hero: {
      src: '/images/drawandyou/canvas-1600.webp',
      srcSet: '/images/drawandyou/canvas-800.webp 800w, /images/drawandyou/canvas-1600.webp 1600w',
      width: 1600,
      height: 874,
      alt: 'DRAW&YOU 드로잉 화면. 왼쪽에 색상·브러시 크기·투명도 설정, 가운데 스케치북 모양 캔버스에 “집을 그려주세요” 과제, 오른쪽에 레이어 패널이 있다.',
      caption: '드로잉 화면 — 색상·크기·투명도 설정, 실행 취소·다시 실행, 레이어 패널',
    },
    detail: {
      problem: {
        title: '문제 상황',
        body: [
          '사용자가 그림을 그리며 획이 쌓일수록 펜 입력에 대한 캔버스 반응이 늦어지고, 그리는 도중 프레임이 끊기는 현상이 나타났습니다.',
          '그림은 AI 감정 분석으로 넘어가는 입력이기 때문에, 그리는 과정이 불편하면 서비스의 첫 단계부터 사용 흐름이 막힙니다.',
        ],
      },
      analysis: {
        title: '원인 분석',
        intro:
          'ChatGPT에 React 상태 관리 흐름과 Konva 렌더링 구조를 한 단계씩 나누어 공유하며 원인 후보를 좁혔습니다. 후보마다 아래 질문으로 점검했습니다.',
        points: [
          { label: '재렌더링 범위', text: '획 하나가 추가될 때 어떤 컴포넌트까지 다시 렌더링되는가?' },
          { label: '레이어 구성', text: '변하지 않는 배경과 계속 바뀌는 드로잉이 함께 다시 그려지고 있지 않은가?' },
          { label: '메모이제이션 위치', text: 'useMemo·useCallback이 실제로 비용이 큰 지점에 적용되어 있는가?' },
        ],
      },
      actions: {
        title: '나의 행동',
        steps: [
          {
            text: '입력 이벤트 → 상태 업데이트 → 캔버스 렌더링으로 이어지는 흐름을 단계별로 정리해 ChatGPT와 원인 후보를 검토했습니다.',
            tools: 'ChatGPT',
          },
          {
            text: '획이 추가될 때 다시 렌더링되는 범위를 확인했습니다.',
            tools: 'React DevTools',
          },
          {
            text: '배경과 드로잉을 레이어로 분리하는 구성을 점검했습니다.',
            tools: 'react-konva Layer',
          },
          {
            text: 'useMemo·useCallback을 어디에 적용해야 효과가 있는지 검토했습니다.',
            tools: 'useMemo · useCallback',
          },
          {
            text: 'AI가 제안한 원인을 그대로 적용하지 않고, 프레임 변화와 렌더링 타임라인을 직접 확인한 뒤 반영했습니다.',
            tools: 'Performance 탭',
          },
        ],
      },
      result: {
        title: '결과와 검증',
        body: ['획이 쌓인 상태에서도 캔버스 반응 속도가 개선되었습니다.'],
        verification: [
          { label: 'React DevTools', text: '획 추가 시 다시 렌더링되는 컴포넌트 범위 확인' },
          { label: '브라우저 Performance 탭', text: '그리는 동안의 프레임 변화와 렌더링 타임라인 확인' },
        ],
        evidence: {
          width: 1600,
          height: 900,
          alt: 'DRAW&YOU 캔버스 개선 전후 Performance 탭 측정 화면',
          placeholder: {
            label: 'Performance 탭 또는 React DevTools 측정 캡처',
            replacePath: 'public/images/drawandyou/performance.webp',
          },
        },
      },
      extraTitle: '함께 구현한 화면',
      gallery: [
        {
          src: '/images/drawandyou/dashboard-1600.webp',
          srcSet: '/images/drawandyou/dashboard-800.webp 800w, /images/drawandyou/dashboard-1600.webp 1600w',
          width: 1600,
          height: 874,
          alt: 'DRAW&YOU 홈 대시보드. 환영 메시지, 작품 수·게시글 수·코스 완주 횟수, 빠른 시작 메뉴, 오늘의 힐링 문구와 미션이 보인다.',
          caption: '홈 대시보드',
        },
        {
          src: '/images/drawandyou/gallery-1600.webp',
          srcSet: '/images/drawandyou/gallery-800.webp 800w, /images/drawandyou/gallery-1600.webp 1600w',
          width: 1600,
          height: 873,
          alt: 'DRAW&YOU 갤러리 메인 화면. 사용자들이 공유한 그림 작품 목록이 카드 형태로 보인다.',
          caption: '갤러리',
        },
        {
          src: '/images/drawandyou/diary-1600.webp',
          srcSet: '/images/drawandyou/diary-800.webp 800w, /images/drawandyou/diary-1600.webp 1600w',
          width: 1600,
          height: 872,
          alt: 'DRAW&YOU 일기 달력 화면. 달력에서 날짜를 선택해 일기를 작성하고 확인한다.',
          caption: '일기 달력',
        },
      ],
    },
    links: [
      { kind: 'service', label: '서비스 방문', href: 'https://drawandyou.com' },
      { kind: 'github', label: 'GitHub 저장소', href: 'https://github.com/DRAW-AND-YOU/WEB-Frontend' },
      {
        kind: 'figma',
        label: 'Figma 와이어프레임',
        href: 'https://www.figma.com/design/7lUGQerIAtWZMi0L9U51pp/%EA%B7%B8%EB%A6%AC%EA%B3%A0%EB%84%88-drawAndYou--wireFrame?node-id=0-1',
      },
      {
        kind: 'manual',
        label: '사용자 매뉴얼',
        href: 'https://drive.google.com/file/d/1oPQ5g2f_OLTjCHdVcd4QcEUM3i2m2m1E/view?usp=sharing',
      },
      /** 시연 영상 URL (YouTube 등)이 생기면 입력하세요. */
      { kind: 'demo', label: '시연 영상', href: '' },
    ],
    meta: {
      title: 'DRAW&YOU — 캔버스 성능 문제 분석과 개선 | 김현수',
      description:
        '그림 획이 쌓일수록 느려지는 react-konva 캔버스를 렌더링 흐름부터 점검하고, React DevTools와 Performance 탭으로 개선을 확인한 과정입니다.',
      ogImage: '/og/drawandyou.jpg',
    },
  },
  {
    slug: 'ddiring',
    name: '띠링',
    platform: '모바일 앱 (Android)',
    period: '2026.02 – 2026.06',
    oneLiner: '어르신과 보호자를 연결하는 AI 일상 돌봄 모바일 앱',
    audience: '어르신의 안부와 일상을 확인하려는 보호자, 그리고 간단한 흐름으로 안부 확인과 설문에 응답하는 어르신',
    team: {
      members: ['프론트엔드 1명 (본인)', '백엔드 1명', 'AI 1명'],
      note: '기획은 팀 전체가 함께 참여했습니다. 백엔드와 AI 기능은 각 담당 팀원이 개발했습니다.',
    },
    roleSummary: 'UI 설계 · 앱 프론트엔드 · API 연동 · APK 배포',
    roles: [
      { task: '앱 전체 UI 설계', tools: 'Figma' },
      { task: '모바일 앱 프론트엔드 개발', tools: 'React Native · TypeScript' },
      { task: '백엔드 REST API 연동' },
      { task: 'Android 테스트용 APK 빌드·배포' },
    ],
    implementation: [
      { task: '보호자·어르신 역할별 화면 분기' },
      { task: '가족방 생성과 초대 코드로 참여' },
      { task: '안부 확인과 설문 응답·관리' },
      { task: '일상 사진 피드와 주간 리포트' },
      { task: '로그인 토큰(JWT) 안전 저장', tools: 'Expo SecureStore' },
      { task: '푸시 알림용 FCM 토큰을 서버로 전달', tools: 'Firebase Cloud Messaging' },
      { task: '이미지를 S3에 직접 업로드', tools: 'Presigned URL' },
    ],
    caseType: '기능 설계와 협업의 판단',
    hook: '친숙한 음성 안내를 제안하고, 악용 가능성까지 고려해 기능을 조정했습니다.',
    summary: {
      problem: '가족 목소리를 재현한 음성 안내는 친숙하지만, 보이스피싱 등에 악용될 수 있었습니다.',
      action: '가족 목소리 TTS를 제안한 뒤, 팀에서 제기된 악용 가능성을 함께 검토해 기능 범위를 다시 정했습니다.',
      result: '음성 안내 기능은 유지하고, 실제 가족 목소리를 재현하는 방식은 제외했습니다.',
    },
    hero: {
      src: '/images/ddiring/start-720.webp',
      srcSet: '/images/ddiring/start-360.webp 360w, /images/ddiring/start-720.webp 720w',
      width: 360,
      height: 800,
      alt: '띠링 앱 시작 화면. 웃는 주황색 종 캐릭터와 띠링 로고 아래에 “전화번호로 로그인” 버튼과 “처음이신가요?” 링크가 있다.',
      caption: 'Android 앱 시작 화면',
    },
    detail: {
      problem: {
        title: '상황',
        body: [
          '어르신이 앱의 안내를 더 친숙하게 받아들일 수 있도록, 가족의 목소리를 재현한 TTS 음성 안내를 제안했습니다.',
          '팀 논의에서 실제 가족의 목소리를 합성할 수 있다는 점이 보이스피싱 등 악용으로 이어질 수 있다는 우려가 나왔습니다. 기술 오류가 아니라, 기능을 어디까지 만들지 정하는 문제였습니다.',
        ],
      },
      analysis: {
        title: '판단 기준',
        intro: '제안을 고집하거나 기능을 통째로 버리기보다, 세 가지 기준으로 기능을 나누어 보았습니다.',
        points: [
          { label: '사용자 편의', text: '어르신이 안내를 쉽게 듣고 따라올 수 있는가?' },
          { label: '악용 가능성', text: '이 기능이 가족을 사칭하는 수단이 될 수 있는가?' },
          { label: '기능의 목적', text: '필요한 것은 ‘가족의 목소리’인가, ‘음성 안내’ 자체인가?' },
        ],
      },
      actions: {
        title: '나의 행동',
        steps: [
          { text: '어르신이 친숙하게 받아들일 수 있는 방향으로 가족 목소리 TTS 음성 안내를 제안했습니다.' },
          { text: '팀에서 제기된 보이스피싱 등 악용 가능성을 제안자로서 함께 검토했습니다.' },
          { text: '음성 안내라는 목적은 남기고, 위험이 큰 가족 목소리 재현만 제외하도록 기능 범위를 정리했습니다.' },
          {
            text: '정리된 기획에 맞춰 보호자·어르신 화면과 설문 흐름을 구현하고, Android 테스트용 APK로 빌드했습니다.',
            tools: 'React Native · TypeScript',
          },
        ],
      },
      result: {
        title: '결과',
        body: [
          '음성 안내 기능은 유지하고, 실제 가족 목소리를 재현하는 방식은 제외했습니다.',
          '결과물은 Android 테스트용 APK와 시연 영상으로 정리했습니다. 앱스토어 정식 출시 단계는 아닙니다.',
        ],
        /** 결과 설명 바로 아래에 보여 줄 자료 */
        links: [{ kind: 'demo', label: '시연 영상 보기', href: DDIRING_DEMO }],
      },
      extraTitle: '주요 구현',
      gallery: [],
    },
    links: [
      { kind: 'demo', label: '시연 영상', href: DDIRING_DEMO },
      { kind: 'github', label: 'GitHub 저장소', href: 'https://github.com/ddiring-team/FRONT' },
      {
        kind: 'figma',
        label: 'Figma 와이어프레임',
        href: 'https://www.figma.com/design/djRijsyJIo9uOndvldJHoW/%EB%9D%A0%EB%A7%81-application-wireframe?node-id=695-2932',
      },
      /** 공개 가능한 테스트용 APK 다운로드 경로가 있으면 입력하세요. */
      { kind: 'apk', label: 'Android 테스트용 APK', href: '' },
    ],
    meta: {
      title: '띠링 — 음성 안내 기능 설계와 판단 | 김현수',
      description:
        '어르신과 보호자를 연결하는 돌봄 앱 띠링에서 가족 목소리 TTS를 제안하고, 악용 가능성을 고려해 음성 안내 기능의 범위를 조정한 과정입니다.',
      ogImage: '/og/ddiring.jpg',
    },
  },
]

/**
 * 기술 스택. 포트폴리오 PDF의 Skills 항목과 같고, 실제로 쓴 프로젝트를 함께 표시합니다.
 * 숙련도(퍼센트·별점)는 표시하지 않습니다.
 */
export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'Vite'],
    usedIn: ['drawandyou', 'ddiring'],
  },
  {
    category: 'API · Auth',
    items: ['Axios', 'REST API', 'JWT', 'Secure Store'],
    usedIn: ['drawandyou', 'ddiring'],
  },
  {
    category: 'Mobile',
    items: ['React Native', 'Expo', 'FCM', 'EAS Build'],
    usedIn: ['ddiring'],
  },
  {
    category: 'UI · UX',
    items: ['Figma', 'User Flow', 'Responsive UI'],
    usedIn: ['drawandyou', 'ddiring'],
  },
  {
    category: 'Deploy',
    items: ['Vercel', 'Git', 'Android Test Build'],
    usedIn: ['drawandyou', 'ddiring'],
  },
]

export const principles: Principle[] = [
  {
    text: '사용자에게 필요한 기능부터 생각합니다.',
    evidence: '띠링에서는 보호자와 어르신이 하는 일이 달라, 역할별로 화면과 흐름을 나눠 설계했습니다.',
    projectSlug: 'ddiring',
    anchor: 'scope',
  },
  {
    text: 'AI의 제안은 직접 확인하고 적용합니다.',
    evidence: 'DRAW&YOU 캔버스 문제의 원인 후보는 ChatGPT와 좁히고, 적용 여부는 DevTools와 Performance 탭으로 확인했습니다.',
    projectSlug: 'drawandyou',
    anchor: 'analysis',
  },
  {
    text: '다른 관점을 반영해 더 나은 구현 방향을 찾습니다.',
    evidence: '띠링에서 제가 제안한 가족 목소리 TTS에 대한 악용 우려를 받아들여, 음성 안내만 남기도록 조정했습니다.',
    projectSlug: 'ddiring',
    anchor: 'analysis',
  },
]
