import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}

/** 새 탭으로 열리는 링크. 스크린 리더에 새 탭임을 알립니다. */
export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> (새 탭에서 열림)</span>
    </a>
  )
}
