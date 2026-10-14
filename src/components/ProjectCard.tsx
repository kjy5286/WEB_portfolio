import { Link } from 'react-router-dom'
import type { Project } from '../content/types'
import { CaseSummary } from './CaseSummary'
import { ExternalLink } from './ExternalLink'
import { Figure } from './Figure'
import { Reveal } from './Reveal'
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
  const ratio = project.hero.width / project.hero.height
  const frameClass = ratio > 2.5 ? ' project-card__frame--wide' : ratio < 1 ? ' project-card__frame--portrait' : ''
  // 결과물을 바로 볼 수 있는 링크를 우선합니다: 서비스 → 시연 영상 → GitHub
  const primaryLink = (['service', 'demo', 'github'] as const)
    .map((kind) => project.links.find((l) => l.kind === kind && l.href))
    .find(Boolean)

  return (
    <article className="project-card" aria-labelledby={headingId}>
      <Reveal as="header" className="project-card__head">
        <p className="project-card__meta">
          <span className="project-card__num">{String(index + 1).padStart(2, '0')}</span>
          <span>{project.platform}</span>
          <span aria-hidden="true">·</span>
          <span>{project.period}</span>
        </p>
        <h3 id={headingId} className="project-card__title">
          {project.name}
        </h3>
        <p className="project-card__oneliner">{project.oneLiner}</p>
      </Reveal>

      <div className="project-card__grid">
        <Reveal className="project-card__media" delay={1}>
          <Link to={`/projects/${project.slug}`} className={`project-card__frame${frameClass}`} tabIndex={-1} aria-hidden="true">
            <Figure
              media={project.hero}
              sizes={ratio < 1 ? '220px' : '(min-width: 1024px) 560px, 100vw'}
              contain={ratio > 2.5}
              showCaption={false}
            />
          </Link>
          {project.implementation && (
            <div className="project-card__impl">
              <p className="label">주요 구현</p>
              <TaskList tasks={project.implementation} />
            </div>
          )}
        </Reveal>

        <div className="project-card__body">
          <Reveal as="dl" className="project-card__facts" delay={2}>
            <div>
              <dt className="label">누구를 위한 서비스</dt>
              <dd>{project.audience}</dd>
            </div>
            <div>
              <dt className="label">내가 담당한 범위</dt>
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
          </Reveal>

          <Reveal as="section" className="project-card__case" delay={3} aria-label={`${project.name} 핵심 문제와 해결`}>
            <p className="project-card__case-type">{project.caseType}</p>
            <p className="project-card__hook">{project.hook}</p>
            <CaseSummary summary={project.summary} compact />
          </Reveal>

          <Reveal className="btn-row project-card__actions" delay={4}>
            <Link to={`/projects/${project.slug}`} className="btn btn--primary">
              {project.caseType === '트러블슈팅' ? '문제 해결 과정 보기' : '판단 과정 보기'}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
            {primaryLink && (
              <ExternalLink href={primaryLink.href} className="btn">
                {primaryLink.label}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </ExternalLink>
            )}
          </Reveal>
        </div>
      </div>
    </article>
  )
}
