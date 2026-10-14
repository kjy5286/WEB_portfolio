import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  /** 같은 묶음 안에서 순서대로 나타나게 할 때의 순번 (0, 1, 2…) */
  delay?: number
  className?: string
  id?: string
  tabIndex?: number
  [key: `aria-${string}`]: string | undefined
}

let observer: IntersectionObserver | null = null
function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  return observer
}

/**
 * 스크롤해서 화면에 들어올 때 한 번만 짧게 나타나는 블록.
 * - 스크롤을 가로채지 않고, 콘텐츠가 들어오는 순간에만 움직입니다.
 * - 모션 감소 설정이나 JavaScript가 없는 환경에서는 처음부터 그대로 보입니다(CSS 참고).
 */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = getObserver()
    io.observe(el)
    return () => io.unobserve(el)
  }, [])

  const style = delay ? ({ '--reveal-delay': `${Math.min(delay, 6) * 90}ms` } as CSSProperties) : undefined

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style} {...rest}>
      {children}
    </Tag>
  )
}
