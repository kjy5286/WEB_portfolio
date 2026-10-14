import type { Project } from '../content/types'

interface CaseSummaryProps {
  summary: Project['summary']
  compact?: boolean
}

const LABELS = [
  ['problem', '문제'],
  ['action', '나의 행동'],
  ['result', '결과'],
] as const

/** “문제 / 나의 행동 / 결과” 세 줄 요약 */
export function CaseSummary({ summary, compact }: CaseSummaryProps) {
  return (
    <dl className={`case-summary${compact ? ' case-summary--compact' : ''}`}>
      {LABELS.map(([key, label]) => (
        <div key={key} className="case-summary__item">
          <dt>{label}</dt>
          <dd>{summary[key]}</dd>
        </div>
      ))}
    </dl>
  )
}
