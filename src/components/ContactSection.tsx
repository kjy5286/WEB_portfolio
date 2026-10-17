import { Link } from 'react-router-dom'
import { profile, projects } from '../content/site'
import { DevMissing } from './DevMissing'
import { ExternalLink } from './ExternalLink'
import { Reveal } from './Reveal'

/** 마지막 영역: GitHub·포트폴리오 PDF·(제공된 경우) 이메일 */
export function ContactSection() {
  return (
    <section id="contact" className="section section--contact panel" aria-labelledby="contact-title">
      <div className="container contact">
        <Reveal as="p" className="section-head__index" aria-hidden="true">
          04
        </Reveal>
        <Reveal as="h2" delay={1} id="contact-title" className="contact__title">
          {profile.closing}
        </Reveal>
        {profile.links.email && (
          <Reveal delay={2}>
            <a href={`mailto:${profile.links.email}`} className="contact__email">
              {profile.links.email}
            </a>
          </Reveal>
        )}
        <Reveal delay={3} className="btn-row">
          <ExternalLink href={profile.links.github} className="btn btn--primary">
            GitHub
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </ExternalLink>
          {profile.links.portfolioPdf ? (
            <ExternalLink href={profile.links.portfolioPdf} className="btn">
              포트폴리오 PDF
            </ExternalLink>
          ) : (
            <DevMissing label="포트폴리오 PDF" where="site.ts → profile.links.portfolioPdf" />
          )}
        </Reveal>
        <ul className="contact__projects" aria-label="프로젝트 바로가기">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i + 4}>
              <Link to={`/projects/${p.slug}`} className="contact__project">
                <span className="contact__project-name">
                  {p.name}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </span>
                <span className="contact__project-hook">{p.hook}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
