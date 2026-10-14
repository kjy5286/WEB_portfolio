import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadProps {
  index: string
  id: string
  title: ReactNode
  lead?: ReactNode
}

/** 큰 번호와 큰 제목으로 섹션을 시작합니다. */
export function SectionHead({ index, id, title, lead }: SectionHeadProps) {
  return (
    <Reveal className="section-head">
      <p className="section-head__index" aria-hidden="true">
        {index}
      </p>
      <h2 id={id} className="section-head__title">
        {title}
      </h2>
      {lead && <p className="section-head__lead">{lead}</p>}
    </Reveal>
  )
}
