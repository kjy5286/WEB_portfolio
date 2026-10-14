import { Link } from 'react-router-dom'
import type { Project } from '../content/types'
import { CaseSummary } from './CaseSummary'
import { ExternalLink } from './ExternalLink'
import { Figure } from './Figure'
import { TaskList } from './TaskList'

interface ProjectCardProps {
  project: Project
  index: number
}

/**
 * 홈의 대표 프로젝트 요약.
 * ① 누구를 위한 서비스 → ② 담당 범위 → ③ 핵심 문제와 해결 → ④ 상세·결과물 이동 순서로 보여 줍니다.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const headingId = `project-${project.slug}-title`
  const isWide = project.hero.width / project.hero.height > 2.5
  const primaryLink = project.links.find((l) => l.href && (l.kind === 'service' || l.kind === 'github'))

  return (
    <article className="project-card" aria-labelledby={headingId}>
      <header className="project-card__head">
        <p className="project-card__meta">
          <span className="project-card__num">{String(index + 1).padStart(2, '0')}</span>
          {project.platform}
        </p>
        <h3 id={headingId} className="project-card__title">
          {project.name}
        </h3>
        <p className="project-card__oneliner">{project.oneLiner}</p>
      </header>

      <div className={`project-card__media${isWide ? ' project-card__media--wide' : ''}`}>
        <Figure
          media={project.hero}
          sizes="(min-width: 960px) 520px, 100vw"
          contain={isWide}
          showCaption={false}
        />
        {project.implementation && (
          <div className="project-card__impl">
            <p className="project-card__impl-title">주요 구현</p>
            <TaskList tasks={project.implementation} />
          </div>
        )}
      </div>

      <div className="project-card__body">
        <dl className="project-card__facts">
          <div>
            <dt>누구를 위한 서비스</dt>
            <dd>{project.audience}</dd>
          </div>
          <div>
            <dt>내가 담당한 범위</dt>
            <dd>
              <TaskList
                tasks={project.roles.map((r) => ({ ...r, task: r.task.split(' — ')[0] }))}
                className="task-list--compact"
              />
              <span className="project-card__team">
                팀: {project.team.members.join(' · ')} · 기획 공동 참여
              </span>
            </dd>
          </div>
        </dl>

        <section className="project-card__case" aria-label={`${project.name} 핵심 문제와 해결`}>
          <p className="project-card__case-type">{project.caseType}</p>
          <p className="project-card__hook">{project.hook}</p>
          <CaseSummary summary={project.summary} compact />
        </section>

        <div className="btn-row project-card__actions">
          <Link to={`/projects/${project.slug}`} className="btn btn--primary">
            {project.caseType === '트러블슈팅' ? '문제 해결 과정 보기' : '판단 과정 보기'}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
          {primaryLink && (
            <ExternalLink href={primaryLink.href} className="btn btn--quiet">
              {primaryLink.label}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  )
}
