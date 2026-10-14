import { Link, useParams } from 'react-router-dom'
import { CaseSummary } from '../components/CaseSummary'
import { Figure } from '../components/Figure'
import { ProjectLinks } from '../components/ProjectLinks'
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

  return (
    <article className="detail" aria-labelledby="detail-title">
      {/* 한 줄 설명과 실제 화면 */}
      <header className={`detail-hero${ratio < 1 ? ' detail-hero--portrait' : ''}`}>
        <div className="container detail-hero__grid">
          <div className="detail-hero__text">
            <nav aria-label="이동 경로" className="breadcrumb">
              <Link to="/#projects">
                <span aria-hidden="true">← </span>대표 프로젝트
              </Link>
            </nav>
            <p className="eyebrow">
              {project.platform} · {project.period} · {project.caseType}
            </p>
            <h1 id="detail-title" tabIndex={-1} className="detail-hero__title">
              {project.name}
            </h1>
            <p className="detail-hero__oneliner">{project.oneLiner}</p>
            <p className="detail-hero__hook">{project.hook}</p>
          </div>
          <div className={`detail-hero__media${mediaClass}`}>
            <Figure
              media={project.hero}
              sizes={ratio < 1 ? '280px' : '(min-width: 1180px) 1120px, 100vw'}
              priority
              contain={ratio > 2.5}
            />
          </div>
        </div>
      </header>

      {/* 긴 설명 전 요약 */}
      <section id="summary" className="detail-section detail-section--summary" aria-labelledby="summary-title">
        <div className="container">
          <h2 id="summary-title" className="sr-only">
            요약
          </h2>
          <CaseSummary summary={project.summary} />
        </div>
      </section>

      <div className="container detail-body">
        {/* 팀 구성 및 담당 범위 */}
        <section id="scope" className="detail-section" aria-labelledby="scope-title">
          <h2 id="scope-title">팀 구성과 담당 범위</h2>
          <div className="scope">
            <div>
              <h3 className="detail-sub">팀</h3>
              <ul className="team-list">
                {project.team.members.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p className="muted scope__note">{project.team.note}</p>
            </div>
            <div>
              <h3 className="detail-sub">내가 담당한 일</h3>
              <TaskList tasks={project.roles} />
            </div>
            {project.implementation && (
              <div className="scope__wide">
                <h3 className="detail-sub">{detail.extraTitle}</h3>
                <TaskList tasks={project.implementation} className="task-list--grid" />
              </div>
            )}
          </div>
        </section>

        {/* 문제 상황 */}
        <section id="problem" className="detail-section" aria-labelledby="problem-title">
          <h2 id="problem-title">{detail.problem.title}</h2>
          <div className="prose">
            {detail.problem.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        {/* 원인 분석 또는 판단 기준 */}
        <section id="analysis" className="detail-section" aria-labelledby="analysis-title">
          <h2 id="analysis-title">{detail.analysis.title}</h2>
          <p className="prose">{detail.analysis.intro}</p>
          <dl className="points">
            {detail.analysis.points.map((pt) => (
              <div key={pt.label} className="points__item">
                <dt>{pt.label}</dt>
                <dd>{pt.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 구체적인 행동 */}
        <section id="actions" className="detail-section" aria-labelledby="actions-title">
          <h2 id="actions-title">{detail.actions.title}</h2>
          <ol className="steps">
            {detail.actions.steps.map((step) => (
              <li key={step.text} className="steps__item">
                <p>{step.text}</p>
                {step.tools && <span className="tools">{step.tools}</span>}
              </li>
            ))}
          </ol>
        </section>

        {/* 결과와 검증 */}
        <section id="result" className="detail-section" aria-labelledby="result-title">
          <h2 id="result-title">{detail.result.title}</h2>
          <div className="prose">
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
              <h3 className="detail-sub">검증 방법</h3>
              <dl className="points points--verify">
                {detail.result.verification.map((v) => (
                  <div key={v.label} className="points__item">
                    <dt>{v.label}</dt>
                    <dd>{v.text}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
          {detail.result.evidence && (
            <div className="evidence">
              <Figure media={detail.result.evidence} sizes="(min-width: 1180px) 760px, 100vw" />
            </div>
          )}
        </section>

        {detail.gallery.length > 0 && (
          <section id="screens" className="detail-section" aria-labelledby="screens-title">
            <h2 id="screens-title">{detail.extraTitle}</h2>
            <div className="gallery">
              {detail.gallery.map((m) => (
                <Figure key={m.src} media={m} sizes="(min-width: 960px) 280px, (min-width: 560px) 50vw, 100vw" zoomable />
              ))}
            </div>
          </section>
        )}

        {/* 관련 자료 */}
        <section id="resources" className="detail-section" aria-labelledby="resources-title">
          <h2 id="resources-title">관련 자료</h2>
          <ProjectLinks links={project.links} slug={project.slug} />
        </section>
      </div>

      <nav className="detail-next" aria-label="다른 프로젝트">
        <div className="container detail-next__inner">
          <Link to="/#projects" className="text-link">
            <span aria-hidden="true">← </span>전체 프로젝트
          </Link>
          <Link to={`/projects/${next.slug}`} className="detail-next__link">
            <span className="muted">다음 프로젝트</span>
            <strong>
              {next.name} <span className="arrow" aria-hidden="true">→</span>
            </strong>
            <span className="detail-next__hook">{next.hook}</span>
          </Link>
        </div>
      </nav>
    </article>
  )
}
