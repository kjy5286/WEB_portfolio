import { useEffect, useState } from 'react'

export interface SideNavItem {
  id: string
  label: string
}

interface SideNavProps {
  items: SideNavItem[]
  /** 이 요소(색 배경 영역) 위에 있는 동안 내비게이션을 흰색으로 바꿉니다. */
  bandId?: string
}

/**
 * 화면 오른쪽에 고정된 섹션 내비게이션.
 * 지금 읽고 있는 섹션을 표시하고, 누르면 해당 섹션으로 이동합니다.
 */
export function SideNav({ items, bandId }: SideNavProps) {
  const [active, setActive] = useState<string | null>(null)
  const [onBand, setOnBand] = useState(Boolean(bandId))

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current: string | null = null
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= line) current = item.id
      }
      // 페이지 끝에 닿으면 마지막 섹션을 표시
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = items[items.length - 1]?.id ?? current
      }
      setActive(current)

      if (bandId) {
        const band = document.getElementById(bandId)
        setOnBand(band ? band.getBoundingClientRect().bottom > window.innerHeight / 2 : false)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items, bandId])

  return (
    <nav className={`side-nav${onBand ? ' side-nav--on-band' : ''}`} aria-label="섹션 이동">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`side-nav__link${active === item.id ? ' is-active' : ''}`}
              aria-current={active === item.id ? 'location' : undefined}
            >
              <span className="side-nav__dot" aria-hidden="true" />
              <span className="side-nav__label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
