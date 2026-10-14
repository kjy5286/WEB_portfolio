import type { ProjectLink } from '../content/types'
import { DevMissing } from './DevMissing'
import { ExternalLink } from './ExternalLink'

interface ProjectLinksProps {
  links: ProjectLink[]
  slug: string
}

/** href가 있는 링크만 버튼으로 보여 줍니다. 빈 링크는 배포 화면에 노출하지 않습니다. */
export function ProjectLinks({ links, slug }: ProjectLinksProps) {
  return (
    <div className="btn-row">
      {links.map((link) =>
        link.href ? (
          <ExternalLink
            key={link.kind}
            href={link.href}
            className={`btn ${link.kind === 'service' ? 'btn--primary' : 'btn--quiet'}`}
          >
            {link.label}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </ExternalLink>
        ) : (
          <DevMissing key={link.kind} label={link.label} where={`site.ts → ${slug}.links.${link.kind}`} />
        ),
      )}
    </div>
  )
}
