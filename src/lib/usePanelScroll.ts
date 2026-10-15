import { useEffect } from 'react'

const QUERY = '(min-width: 1024px) and (min-height: 680px)'
/** 이 정도(px)까지 화면보다 긴 섹션은 한 화면으로 취급 */
const SLACK = 40
/** 한 칸 이동 시간(ms) */
const DURATION = 650
/** 이 시간(ms) 동안 휠 입력이 끊기면 다음 입력을 새 제스처로 봄 (트랙패드 관성 구분) */
const GESTURE_GAP = 160
/** 트랙패드처럼 작은 입력은 이만큼(px) 모였을 때 이동 */
const THRESHOLD = 24

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * 홈 화면에서 휠·키보드 한 번에 한 섹션(.panel)씩 이동합니다.
 * - 넓은 화면에서만 동작하고, 좁은 화면에서는 기본 스크롤을 그대로 둡니다.
 * - 이동은 이 스크립트 하나로만 처리합니다(CSS scroll-snap과 함께 쓰면 도착 후 화면이 한 번 더 튀기 때문).
 * - 이동 중에 새로 들어온 입력은 버리지 않고, 끝난 뒤 한 칸 더 이동합니다. 트랙패드 관성은 한 번으로 셉니다.
 * - 화면보다 긴 섹션은 그 안에서 부드럽게 나눠 이동한 뒤 다음 섹션으로 넘어갑니다.
 */
export function usePanelScroll() {
  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    let animating = false
    let frame = 0
    let queued: 1 | -1 | 0 = 0
    let lastWheel = 0
    let gestureUsed = false
    let accumulated = 0

    const panels = () => [...document.querySelectorAll<HTMLElement>('.panel')]
    const vh = () => window.innerHeight
    const maxScroll = () => document.documentElement.scrollHeight - vh()

    /** 지금 화면을 가장 많이 차지한 섹션 */
    const currentIndex = (list: HTMLElement[]) => {
      let index = 0
      let best = -1
      list.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const visible = Math.min(r.bottom, vh()) - Math.max(r.top, 0)
        if (visible > best) {
          best = visible
          index = i
        }
      })
      return index
    }

    const animateTo = (target: number) => {
      const start = window.scrollY
      const distance = target - start
      if (Math.abs(distance) < 1) return
      cancelAnimationFrame(frame)
      if (reduce.matches) {
        window.scrollTo({ top: target, behavior: 'instant' })
        return
      }
      animating = true
      const t0 = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / DURATION)
        window.scrollTo({ top: start + distance * easeInOutCubic(t), behavior: 'instant' })
        if (t < 1) {
          frame = requestAnimationFrame(step)
          return
        }
        animating = false
        if (queued) {
          const dir = queued
          queued = 0
          move(dir)
        }
      }
      frame = requestAnimationFrame(step)
    }

    /**
     * 한 칸 이동을 시도합니다.
     * 긴 섹션 안이라 기본 스크롤에 맡겨야 하면 false를 돌려줍니다.
     */
    const move = (dir: 1 | -1): boolean => {
      const list = panels()
      if (list.length === 0) return false
      const index = currentIndex(list)
      const r = list[index].getBoundingClientRect()
      const h = vh()
      const tall = r.height > h + SLACK

      // 긴 섹션 안: 끝에 닿을 때까지 화면의 80%씩 부드럽게 이동
      if (tall && dir > 0 && r.bottom > h + 2) {
        animateTo(Math.round(window.scrollY + Math.min(r.bottom - h, h * 0.8)))
        return true
      }
      if (tall && dir < 0 && r.top < -2) {
        animateTo(Math.round(window.scrollY - Math.min(-r.top, h * 0.8)))
        return true
      }

      let target: number
      if (dir > 0) {
        const next = list[index + 1]
        target = next ? next.getBoundingClientRect().top + window.scrollY : maxScroll()
      } else {
        const last = list.length - 1
        const belowLast = index === last && window.scrollY > list[last].offsetTop + 2
        const prev = belowLast ? list[last] : list[index - 1]
        if (!prev) {
          target = 0
        } else {
          const p = prev.getBoundingClientRect()
          // 위로 갈 때 긴 섹션은 끝부분부터 보여 줌
          target = p.height > h + SLACK ? p.bottom + window.scrollY - h : p.top + window.scrollY
        }
      }
      target = Math.max(0, Math.min(maxScroll(), Math.round(target)))
      animateTo(target)
      return true
    }

    const onWheel = (e: WheelEvent) => {
      if (!media.matches || e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const now = performance.now()
      const newGesture = now - lastWheel > GESTURE_GAP
      lastWheel = now
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1

      if (newGesture) {
        gestureUsed = false
        accumulated = 0
      }

      // 이동 중: 기본 스크롤은 막고, 새 제스처라면 끝난 뒤 한 칸 더
      if (animating) {
        e.preventDefault()
        if (newGesture) queued = dir
        return
      }

      // 같은 제스처(관성)로는 한 번만 이동
      if (gestureUsed) {
        e.preventDefault()
        return
      }

      accumulated += e.deltaY
      if (Math.abs(accumulated) < THRESHOLD) {
        // 작은 입력이 모이는 동안 화면이 조금씩 밀리지 않게 막음
        e.preventDefault()
        return
      }

      if (move(dir)) {
        e.preventDefault()
        gestureUsed = true
        accumulated = 0
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (!media.matches || e.altKey || e.ctrlKey || e.metaKey) return
      const t = e.target as HTMLElement | null
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(t.tagName))) return
      let dir: 1 | -1 | 0 = 0
      if (e.key === 'PageDown' || e.key === 'ArrowDown' || (e.key === ' ' && !e.shiftKey)) dir = 1
      if (e.key === 'PageUp' || e.key === 'ArrowUp' || (e.key === ' ' && e.shiftKey)) dir = -1
      if (!dir) return
      if (animating) {
        e.preventDefault()
        queued = dir
        return
      }
      if (move(dir)) e.preventDefault()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(frame)
    }
  }, [])
}
