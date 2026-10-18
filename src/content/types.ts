export interface SiteMeta {
  url: string
  title: string
  description: string
  ogImage: string
  lang: string
}

export interface Profile {
  name: string
  nameEn: string
  headline: string
  headlineTrouble?: string
  headlineEase?: string
  subline: string
  links: { github: string; portfolioPdf: string; email: string }
  closing: string
}

/** 실제 이미지가 없으면 src를 비우고 placeholder를 채웁니다. */
export interface Media {
  src?: string
  srcSet?: string
  width: number
  height: number
  alt: string
  caption?: string
  placeholder?: { label: string; replacePath: string }
}

export interface Task {
  task: string
  /** 이 작업에 사용한 기술. 본문보다 작게, 작업 옆에 표시됩니다. */
  tools?: string
}

export type LinkKind = 'service' | 'github' | 'demo' | 'apk' | 'figma' | 'manual'

export interface ProjectLink {
  kind: LinkKind
  label: string
  /** 빈 문자열이면 화면에 표시하지 않습니다. */
  href: string
}

export interface CasePoint {
  label: string
  text: string
}

export interface Project {
  slug: string
  name: string
  platform: string
  /** 진행 기간. 예: '2025.07 – 2025.12' */
  period: string
  /** 카드에 짧게 보여 줄 주요 기술 */
  stack: string
  oneLiner: string
  audience: string
  team: { members: string[]; note: string }
  roleSummary: string
  roles: Task[]
  implementation?: Task[]
  caseType: '트러블슈팅' | '기능 설계와 협업의 판단'
  hook: string
  summary: { problem: string; action: string; result: string }
  hero: Media
  detail: {
    problem: { title: string; body: string[] }
    analysis: { title: string; intro: string; points: CasePoint[] }
    actions: { title: string; steps: { text: string; tools?: string }[] }
    result: {
      title: string
      body: string[]
      verification?: CasePoint[]
      evidence?: Media
      /** 결과 설명 가까이에 둘 시연 영상 등 */
      links?: ProjectLink[]
    }
    extraTitle: string
    gallery: Media[]
  }
  links: ProjectLink[]
  meta: { title: string; description: string; ogImage: string }
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Principle {
  text: string
  /** 이 가치관과 연결된 주요 경험 */
  experience: string
  /** 근거 문장 (프로젝트 이름은 쓰지 않음) */
  evidence: string
  projectSlug: string
  /** 상세 페이지 안의 섹션 id */
  anchor: 'summary' | 'scope' | 'problem' | 'analysis' | 'actions' | 'result' | 'resources'
}
