import { useEffect } from 'react'

const QUERY = '(min-width: 1024px) and (min-height: 680px)'
/** 이 정도(px)까지 화면보다 긴 섹션은 한 화면으로 취급 */
const SLACK = 40

/**
 * 홈 화면에서 휠 한 번에 한 섹션(.panel)씩 이동합니다.
 * - 넓은 화면에서만 동작하고, 좁은 화면에서는 기본 스크롤을 그대로 둡니다.
 * - 화면보다 긴 섹션은 끝까지 평소처럼 스크롤된 뒤 다음 섹션으로 넘어갑니다.
 * - 트랙패드 관성 스크롤이 이어지는 동안에는 한 번만 이동합니다.
 * - 키보드(PageDown·Space·방향키) 이동은 CSS scroll-snap이 처리합니다.
 */
export function usePanelScroll() {
  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lockedUntil = 0
    let animatingUntil = 0

    const panels = () => [...document.querySelectorAll<HTMLElement>('.panel')]

    const onWheel = (e: WheelEvent) => {
      if (!media.matches || e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const now = performance.now()

      // 이동 중이거나 같은 제스처(관성)가 이어지는 동안에는 추가 이동 없이 무시
      if (now < lockedUntil || now < animatingUntil) {
        e.preventDefault()
        lockedUntil = Math.max(lockedUntil, now + 220)
        return
      }
      if (Math.abs(e.deltaY) < 4) return

      const dir = e.deltaY > 0 ? 1 : -1
      const list = panels()
      if (list.length === 0) return

      const vh = window.innerHeight
      // 지금 화면을 가장 많이 차지한 섹션
      let index = 0
      let best = -1
      list.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0)
        if (visible > best) {
          best = visible
          index = i
        }
      })
      const current = list[index].getBoundingClientRect()

      // 화면보다 확실히 긴 섹션 안에서는 끝에 닿을 때까지 평소처럼 스크롤
      const tall = current.height > vh + SLACK
      if (tall && dir > 0 && current.bottom > vh + 2) return
      if (tall && dir < 0 && current.top < -2) return

      const maxScroll = document.documentElement.scrollHeight - vh
      let target: number
      if (dir > 0) {
        const next = list[index + 1]
        target = next ? next.getBoundingClientRect().top + window.scrollY : maxScroll
      } else {
        const atFooter = window.scrollY > list[list.length - 1].offsetTop + 2 && index === list.length - 1
        const prev = atFooter ? list[index] : list[index - 1]
        if (!prev) return
        const r = prev.getBoundingClientRect()
        // 위로 갈 때 긴 섹션은 끝부분부터 보여 줌
        target = r.height > vh + SLACK ? r.bottom + window.scrollY - vh : r.top + window.scrollY
      }
      target = Math.max(0, Math.min(maxScroll, Math.round(target)))
      if (Math.abs(target - window.scrollY) < 2) return

      e.preventDefault()
      window.scrollTo({ top: target, behavior: reduce.matches ? 'auto' : 'smooth' })
      animatingUntil = now + (reduce.matches ? 100 : 750)
      lockedUntil = now + 220
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])
}
