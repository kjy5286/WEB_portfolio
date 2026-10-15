import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactSection } from '../components/ContactSection'
import { DevMissing } from '../components/DevMissing'
import { ExternalLink } from '../components/ExternalLink'
import { IntroHeadline } from '../components/IntroHeadline'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'
import { SideNav } from '../components/SideNav'
import { principles, profile, projects, siteMeta, skills } from '../content/site'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { usePanelScroll } from '../lib/usePanelScroll'

const NAV = [
  { id: 'top', label: '처음' },
  { id: 'about', label: '주요 경험' },
  ...projects.map((p) => ({ id: `project-${p.slug}`, label: p.name })),
  { id: 'principles', label: '기준' },
  { id: 'skills', label: '기술 스택' },
  { id: 'contact', label: '연락' },
]

// 첫 방문 때만 등장 애니메이션을 재생합니다. 상세 페이지에서 돌아오면 바로 보여 줍니다.
let introPlayed = false

export function HomePage() {
  useDocumentMeta({ title: siteMeta.title, description: siteMeta.description, path: '/' })
  const [skipIntro] = useState(() => introPlayed)
  usePanelScroll()
  useEffect(() => {
    introPlayed = true
    // 홈에서만 섹션 단위 스크롤(넓은 화면, CSS에서 조건 처리)
    document.documentElement.classList.add('snap')
    return () => document.documentElement.classList.remove('snap')
  }, [])

  return (
    <>
      <SideNav items={NAV} />

      {/* 1. 첫 화면: 문구 하나로 시작 */}
      <section id="top" className={`hero panel${skipIntro ? ' hero--static' : ''}`} aria-labelledby="hero-title">
        <div className="container hero__inner">
          <h1 id="hero-title" tabIndex={-1} className="hero__headline">
            <IntroHeadline text={profile.headline} trouble={profile.headlineTrouble} ease={profile.headlineEase} />
          </h1>

          <div className="hero__after">
            <p className="hero__name">
              {profile.name}
              <span className="hero__name-en" lang="en">
                {profile.nameEn}
              </span>
            </p>
            <p className="hero__subline">{profile.subline}</p>
            <div className="btn-row hero__actions">
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
            </div>
          </div>
        </div>
        <a href="#about" className="hero__scroll" aria-label="아래로 이동">
          <span className="hero__scroll-line" aria-hidden="true" />
        </a>
      </section>

      {/* 첫 화면 다음: 짧게 보여 줄 경험 */}
      <section id="about" className="intro-strip panel" aria-labelledby="about-title">
        <div className="container">
          <Reveal as="h2" id="about-title" className="intro-strip__title">
            주요 경험
          </Reveal>
          <ul className="hero__highlights">
            {profile.highlights.map((h, i) => (
              <Reveal as="li" key={h.label} delay={i}>
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
      <section id="projects" className="section section--projects" aria-labelledby="projects-title">
        <h2 id="projects-title" className="sr-only">
          대표 프로젝트
        </h2>
        {projects.map((p, i) => (
          <div key={p.slug} id={`project-${p.slug}`} className="panel project-panel">
            <div className="container">
              <Reveal as="p" className="project-panel__label">
                <span className="section-head__index">01</span>
                대표 프로젝트 {i + 1}/{projects.length}
                {i === 0 && <span className="project-panel__note"> · 두 프로젝트 모두 3인 팀에서 UI 설계와 프론트엔드 담당</span>}
              </Reveal>
              <ProjectCard project={p} index={i} />
            </div>
          </div>
        ))}
      </section>

      {/* 3. 개발자로서의 기준 */}
      <section id="principles" className="section panel" aria-labelledby="principles-title">
        <div className="container">
          <SectionHead
            index="02"
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

      {/* 4. 기술 스택 */}
      <section id="skills" className="section panel" aria-labelledby="skills-title">
        <div className="container">
          <SectionHead index="03" id="skills-title" title="기술 스택" lead="실제 프로젝트에서 사용한 기술입니다." />
          <dl className="skills">
            {skills.map((g, i) => (
              <Reveal key={g.category} className="skills__row" delay={i}>
                <dt className="skills__category">{g.category}</dt>
                <dd className="skills__items">
                  <ul>
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
                <dd className="skills__used">
                  <span className="sr-only">사용한 프로젝트: </span>
                  {g.usedIn.map((slug) => {
                    const project = projects.find((p) => p.slug === slug)
                    return project ? (
                      <Link key={slug} to={`/projects/${slug}`} className="skills__project">
                        {project.name}
                      </Link>
                    ) : null
                  })}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* 5. 마지막 영역 */}
      <ContactSection />
    </>
  )
}
