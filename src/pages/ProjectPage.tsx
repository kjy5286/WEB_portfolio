import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CaseSummary } from '../components/CaseSummary'
import { Figure } from '../components/Figure'
import { ProjectLinks } from '../components/ProjectLinks'
import { Reveal } from '../components/Reveal'
import { SideNav } from '../components/SideNav'
import { TaskList } from '../components/TaskList'
import { projects } from '../content/site'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { NotFoundPage } from './NotFoundPage'

export function ProjectPage() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  if (!project) return <NotFoundPage />
  return <ProjectDetail key={project.slug} index={index} />
}

function ProjectDetail({ index }: { index: number }) {
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const { detail } = project

  useDocumentMeta({
    title: project.meta.title,
    description: project.meta.description,
    path: `/projects/${project.slug}`,
    ogImage: project.meta.ogImage,
    type: 'article',
  })

  const ratio = project.hero.width / project.hero.height
  const mediaClass = ratio > 2.5 ? ' detail-hero__media--wide' : ratio < 1 ? ' detail-hero__media--portrait' : ''

  let n = 0
  const num = () => String(++n).padStart(2, '0')

  const nav = [
    { id: 'scope', label: '담당 범위' },
    { id: 'problem', label: detail.problem.title },
    { id: 'analysis', label: detail.analysis.title },
    { id: 'actions', label: detail.actions.title },
    { id: 'result', label: detail.result.title },
    ...(detail.gallery.length > 0 ? [{ id: 'screens', label: '화면' }] : []),
    { id: 'resources', label: '관련 자료' },
  ]

  return (
    <article className="detail" aria-labelledby="detail-title">
      <SideNav items={nav} />
      {/* 한 줄 설명과 실제 화면 */}
      <header className={`detail-hero${ratio < 1 ? ' detail-hero--portrait' : ''}`}>
        <div className="container detail-hero__grid">
          <div className="detail-hero__text">
            <Reveal as="nav" aria-label="이동 경로" className="breadcrumb">
              <Link to="/" className="breadcrumb__home">
                김현수
              </Link>
              <Link to="/#projects">
                <span aria-hidden="true">← </span>대표 프로젝트
              </Link>
            </Reveal>
            <Reveal as="p" delay={1} className="detail-hero__meta">
              <span>{project.platform}</span>
              <span>{project.period}</span>
              <span className="detail-hero__type">{project.caseType}</span>
            </Reveal>
            <Reveal as="h1" delay={1} id="detail-title" tabIndex={-1} className="detail-hero__title">
              {project.name}
            </Reveal>
            <Reveal as="p" delay={2} className="detail-hero__oneliner">
              {project.oneLiner}
            </Reveal>
            <Reveal as="p" delay={3} className="detail-hero__hook">
              {project.hook}
            </Reveal>
          </div>
          <Reveal delay={3} className={`detail-hero__media${mediaClass}`}>
            <Figure
              media={project.hero}
              sizes={ratio < 1 ? '260px' : '(min-width: 1180px) 1120px, 100vw'}
              priority
              contain={ratio > 2.5}
            />
          </Reveal>
        </div>
      </header>

      {/* 긴 설명 전 요약 */}
      <section id="summary" className="detail-summary" aria-labelledby="summary-title">
        <div className="container">
          <h2 id="summary-title" className="sr-only">
            요약
          </h2>
          <Reveal>
            <CaseSummary summary={project.summary} />
          </Reveal>
        </div>
      </section>

      <div className="container detail-body">
        {/* 팀 구성 및 담당 범위 */}
        <DetailSection id="scope" index={num()} title="팀 구성과 담당 범위">
          <div className="scope">
            <div>
              <h3 className="label">팀</h3>
              <ul className="team-list">
                {project.team.members.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p className="muted scope__note">{project.team.note}</p>
            </div>
            <div>
              <h3 className="label">내가 담당한 일</h3>
              <TaskList tasks={project.roles} />
            </div>
            {project.implementation && (
              <div className="scope__wide">
                <h3 className="label">{detail.extraTitle}</h3>
                <TaskList tasks={project.implementation} className="task-list--grid" />
              </div>
            )}
          </div>
        </DetailSection>

        {/* 문제 상황 */}
        <DetailSection id="problem" index={num()} title={detail.problem.title}>
          <div className="prose prose--lead">
            {detail.problem.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </DetailSection>

        {/* 원인 분석 또는 판단 기준 */}
        <DetailSection id="analysis" index={num()} title={detail.analysis.title}>
          <p className="prose">{detail.analysis.intro}</p>
          <dl className="points">
            {detail.analysis.points.map((pt, i) => (
              <Reveal key={pt.label} className="points__item" delay={i}>
                <dt>{pt.label}</dt>
                <dd>{pt.text}</dd>
              </Reveal>
            ))}
          </dl>
        </DetailSection>

        {/* 구체적인 행동 */}
        <DetailSection id="actions" index={num()} title={detail.actions.title}>
          <ol className="steps">
            {detail.actions.steps.map((step, i) => (
              <Reveal as="li" key={step.text} className="steps__item" delay={i}>
                <span className="steps__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p>{step.text}</p>
                  {step.tools && <span className="tools">{step.tools}</span>}
                </div>
              </Reveal>
            ))}
          </ol>
        </DetailSection>

        {/* 결과와 검증 */}
        <DetailSection id="result" index={num()} title={detail.result.title}>
          <div className="prose prose--lead">
            {detail.result.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {detail.result.links && (
            <div className="result-links">
              <ProjectLinks links={detail.result.links} slug={project.slug} />
            </div>
          )}
          {detail.result.verification && (
            <>
              <h3 className="label label--spaced">검증 방법</h3>
              <dl className="points">
                {detail.result.verification.map((v, i) => (
                  <Reveal key={v.label} className="points__item" delay={i}>
                    <dt>{v.label}</dt>
                    <dd>{v.text}</dd>
                  </Reveal>
                ))}
              </dl>
            </>
          )}
          {detail.result.evidence && (
            <div className="evidence">
              <Figure media={detail.result.evidence} sizes="(min-width: 1180px) 760px, 100vw" />
            </div>
          )}
        </DetailSection>

        {detail.gallery.length > 0 && (
          <DetailSection id="screens" index={num()} title={detail.extraTitle}>
            <div className="gallery">
              {detail.gallery.map((m, i) => (
                <Reveal key={m.src} delay={i}>
                  <Figure media={m} sizes="(min-width: 1024px) 280px, (min-width: 560px) 50vw, 100vw" zoomable />
                </Reveal>
              ))}
            </div>
          </DetailSection>
        )}

        {/* 관련 자료 */}
        <DetailSection id="resources" index={num()} title="관련 자료">
          <ProjectLinks links={project.links} slug={project.slug} />
        </DetailSection>
      </div>

      <nav className="detail-next" aria-label="다른 프로젝트">
        <div className="container">
          <Link to={`/projects/${next.slug}`} className="detail-next__link">
            <span className="label">다음 프로젝트</span>
            <span className="detail-next__name">
              {next.name}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </span>
            <span className="detail-next__hook">{next.hook}</span>
          </Link>
          <Link to="/#projects" className="text-link detail-next__back">
            <span aria-hidden="true">← </span>전체 프로젝트
          </Link>
        </div>
      </nav>
    </article>
  )
}

interface DetailSectionProps {
  id: string
  index: string
  title: string
  children: ReactNode
}

/** 왼쪽에 번호와 제목, 오른쪽에 내용을 두는 상세 섹션 */
function DetailSection({ id, index, title, children }: DetailSectionProps) {
  return (
    <section id={id} className="detail-section" aria-labelledby={`${id}-title`}>
      <Reveal className="detail-section__head">
        <span className="detail-section__num" aria-hidden="true">
          {index}
        </span>
        <h2 id={`${id}-title`}>{title}</h2>
      </Reveal>
      <Reveal className="detail-section__body" delay={1}>
        {children}
      </Reveal>
    </section>
  )
}
