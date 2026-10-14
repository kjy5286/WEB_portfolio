import { Link } from 'react-router-dom'
import { profile, projects } from '../content/site'
import { DevMissing } from './DevMissing'
import { ExternalLink } from './ExternalLink'

/** 마지막 영역: GitHub·포트폴리오 PDF·(제공된 경우) 이메일 */
export function ContactSection() {
  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="container contact">
        <h2 id="contact-title" className="contact__title">
          {profile.closing}
        </h2>
        <div className="btn-row">
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
          {profile.links.email && (
            <a href={`mailto:${profile.links.email}`} className="btn">
              {profile.links.email}
            </a>
          )}
        </div>
        <ul className="contact__projects" aria-label="프로젝트 바로가기">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link to={`/projects/${p.slug}`} className="contact__project">
                <strong>{p.name}</strong>
                <span>{p.hook}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
