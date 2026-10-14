import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 라우트 전환 시 스크롤 위치와 포커스를 관리합니다.
 * - 해시가 있으면 해당 섹션으로 이동하고 포커스를 옮깁니다.
 * - 새 페이지로 이동하면 맨 위로 올라가고 h1에 포커스를 둡니다(스크린 리더 사용자 안내).
 */
export function RouteEffects() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    const isFirst = first.current
    first.current = false

    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: isFirst ? 'instant' : 'auto' })
        if (!isFirst) {
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
        }
        return
      }
    }

    if (isFirst) return
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
  }, [pathname, hash])

  return null
}
