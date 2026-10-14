import { Link } from 'react-router-dom'
import { DevMissing } from '../components/DevMissing'
import { ExternalLink } from '../components/ExternalLink'
import { Figure } from '../components/Figure'
import { ContactSection } from '../components/ContactSection'
import { ProjectCard } from '../components/ProjectCard'
import { principles, profile, projects, sideProject, siteMeta } from '../content/site'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export function HomePage() {
  useDocumentMeta({ title: siteMeta.title, description: siteMeta.description, path: '/' })
  const [lead, second] = projects

  return (
    <>
      {/* 1. 첫 화면 */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__text">
            <h1 id="hero-title" tabIndex={-1}>
              <span className="hero__name">{profile.name}</span>
              <span className="hero__headline">{profile.headline}</span>
            </h1>
            <p className="hero__subline">{profile.subline}</p>

            <div className="btn-row hero__actions">
              <a href="#projects" className="btn btn--primary">
                프로젝트와 문제 해결 보기
                <span className="arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
              {profile.links.portfolioPdf ? (
                <ExternalLink href={profile.links.portfolioPdf} className="btn">
                  포트폴리오 PDF
                </ExternalLink>
              ) : (
                <DevMissing label="포트폴리오 PDF" where="site.ts → profile.links.portfolioPdf" />
              )}
            </div>

            <ul className="hero__highlights" aria-label="주요 경험">
              {profile.highlights.map((h) => (
                <li key={h.label}>
                  <strong>{h.label}</strong>
                  <span>{h.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__visual">
            <Link to={`/projects/${lead.slug}`} className="hero__shot" aria-label={`${lead.name} 상세 보기`}>
              <Figure media={lead.hero} sizes="(min-width: 960px) 600px, 100vw" priority showCaption={false} />
              <span className="hero__shot-label">
                <strong>{lead.name}</strong> {lead.platform} · 직접 구현한 드로잉 화면
              </span>
            </Link>
            <Link to={`/projects/${second.slug}`} className="hero__shot hero__shot--small" aria-label={`${second.name} 상세 보기`}>
              <Figure media={second.hero} sizes="(min-width: 960px) 300px, 60vw" priority contain showCaption={false} />
              <span className="hero__shot-label">
                <strong>{second.name}</strong> {second.platform}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 대표 프로젝트 */}
      <section id="projects" className="section section--projects" aria-labelledby="projects-title">
        <div className="container">
          <div className="section-head">
            <h2 id="projects-title">대표 프로젝트</h2>
            <p>두 프로젝트 모두 3인 팀에서 UI 설계와 프론트엔드를 맡았습니다. 요약만으로 핵심을, 상세 페이지에서 과정을 볼 수 있습니다.</p>
          </div>
          <div className="project-list">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. 개인 제작 경험 */}
      <section className="section section--side" aria-labelledby="side-title">
        <div className="container">
          <article className="side-card">
            <p className="eyebrow">{sideProject.label}</p>
            <h2 id="side-title" className="side-card__title">
              {sideProject.title}
            </h2>
            <p className="side-card__message">{sideProject.message}</p>
            <ul className="side-card__points">
              {sideProject.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <p className="side-card__note">{sideProject.disclaimer}</p>
          </article>
        </div>
      </section>

      {/* 4. 개발자로서의 기준 */}
      <section id="principles" className="section section--principles" aria-labelledby="principles-title">
        <div className="container">
          <div className="section-head">
            <h2 id="principles-title">개발자로서의 기준</h2>
            <p>각 문장은 실제 프로젝트에서 한 일과 연결되어 있습니다.</p>
          </div>
          <ol className="principles">
            {principles.map((pr, i) => {
              const project = projects.find((p) => p.slug === pr.projectSlug)
              return (
                <li key={pr.text} className="principle">
                  <span className="principle__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="principle__text">{pr.text}</h3>
                    <p className="principle__evidence">{pr.evidence}</p>
                    {project && (
                      <Link to={`/projects/${pr.projectSlug}#${pr.anchor}`} className="text-link">
                        {project.name}에서 확인하기
                        <span className="arrow arrow--gap" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* 5. 마지막 영역 */}
      <ContactSection />
    </>
  )
}
