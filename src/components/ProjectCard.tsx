import { Link } from 'react-router-dom'
import type { Project } from '../content/types'
import { Figure } from './Figure'

interface ProjectCardProps {
  project: Project
}

/**
 * 홈의 프로젝트 카드. 대표 화면, 이름과 기술, 한 줄 설명만 간단히 보여 주고
 * 카드 전체를 누르면 상세 페이지로 이동합니다.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const portrait = project.hero.width / project.hero.height < 1

  return (
    <Link to={`/projects/${project.slug}`} className="project-card">
      <div className={`project-card__thumb${portrait ? ' project-card__thumb--portrait' : ''}`}>
        <Figure
          media={{ ...project.hero, caption: undefined }}
          sizes={portrait ? '200px' : '(min-width: 1024px) 560px, 100vw'}
          showCaption={false}
        />
      </div>
      <div className="project-card__info">
        <h3 className="project-card__title">
          {project.name}
          <span className="project-card__stack"> / {project.stack}</span>
        </h3>
        <p className="project-card__oneliner">{project.oneLiner}</p>
        <p className="project-card__meta">
          <span>{project.platform}</span>
          <span aria-hidden="true">·</span>
          <span>{project.period}</span>
          <span className="project-card__more">
            자세히 보기
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </span>
        </p>
      </div>
    </Link>
  )
}
