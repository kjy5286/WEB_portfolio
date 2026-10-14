import { Link } from 'react-router-dom'
import { ContactSection } from '../components/ContactSection'
import { DevMissing } from '../components/DevMissing'
import { ExternalLink } from '../components/ExternalLink'
import { Figure } from '../components/Figure'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'
import { principles, profile, projects, sideProject, siteMeta } from '../content/site'
import { useDocumentMeta } from '../lib/useDocumentMeta'

function Headline({ text, emphasis }: { text: string; emphasis?: string }) {
  if (!emphasis || !text.includes(emphasis)) return <>{text}</>
  const [before, after] = text.split(emphasis)
  return (
    <>
      {before}
      <em className="hero__em">{emphasis}</em>
      {after}
    </>
  )
}

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
              <Reveal as="span" className="hero__name">
                {profile.name}
                <span className="hero__name-en" lang="en">
                  {profile.nameEn}
                </span>
              </Reveal>
              <Reveal as="span" delay={1} className="hero__headline">
                <Headline text={profile.headline} emphasis={profile.headlineEmphasis} />
              </Reveal>
            </h1>
            <Reveal as="p" delay={2} className="hero__subline">
              {profile.subline}
            </Reveal>

            <Reveal delay={3} className="btn-row hero__actions">
              <a href="#projects" className="btn btn--primary">
                프로젝트와 문제 해결 보기
                <span className="arrow arrow--down" aria-hidden="true">
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
            </Reveal>
          </div>

          <Reveal delay={2} className="hero__visual">
            <Link to={`/projects/${lead.slug}`} className="hero__shot" aria-label={`${lead.name} 상세 보기`}>
              <Figure media={lead.hero} sizes="(min-width: 1024px) 560px, 70vw" priority showCaption={false} />
              <span className="hero__shot-label">
                <strong>{lead.name}</strong> 웹 · 드로잉 캔버스
              </span>
            </Link>
            <Link to={`/projects/${second.slug}`} className="hero__shot hero__shot--phone" aria-label={`${second.name} 상세 보기`}>
              <Figure media={second.hero} sizes="(min-width: 1024px) 170px, 28vw" priority showCaption={false} />
              <span className="hero__shot-label">
                <strong>{second.name}</strong> 앱
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="container">
          <ul className="hero__highlights" aria-label="주요 경험">
            {profile.highlights.map((h, i) => (
              <Reveal as="li" key={h.label} delay={i + 3}>
                <span className="hero__highlight-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <strong>{h.label}</strong>
                <span>{h.detail}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. 대표 프로젝트 */}
      <section id="projects" className="section" aria-labelledby="projects-title">
        <div className="container">
          <SectionHead
            index="01"
            id="projects-title"
            title="대표 프로젝트"
            lead="두 프로젝트 모두 3인 팀에서 UI 설계와 프론트엔드를 맡았습니다. 요약으로 핵심을, 상세 페이지에서 과정을 볼 수 있습니다."
          />
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
          <SectionHead index="02" id="side-title" title="개인 제작" />
          <Reveal as="article" className="side-card">
            <div className="side-card__head">
              <h3 className="side-card__title">{sideProject.title}</h3>
              <p className="side-card__message">{sideProject.message}</p>
            </div>
            <ul className="side-card__points">
              {sideProject.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <p className="side-card__note">{sideProject.disclaimer}</p>
          </Reveal>
        </div>
      </section>

      {/* 4. 개발자로서의 기준 */}
      <section id="principles" className="section" aria-labelledby="principles-title">
        <div className="container">
          <SectionHead
            index="03"
            id="principles-title"
            title="개발자로서의 기준"
            lead="각 문장은 실제 프로젝트에서 한 일과 연결되어 있습니다."
          />
          <ol className="principles">
            {principles.map((pr, i) => {
              const project = projects.find((p) => p.slug === pr.projectSlug)
              return (
                <Reveal as="li" key={pr.text} className="principle">
                  <span className="principle__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="principle__body">
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
                </Reveal>
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
