import type { Media } from '../content/types'

interface FigureProps {
  media: Media
  sizes?: string
  /** 첫 화면에 보이는 이미지는 true로 지정해 지연 로딩하지 않습니다. */
  priority?: boolean
  showCaption?: boolean
  contain?: boolean
  className?: string
  /** 원본 크기 이미지를 새 탭에서 볼 수 있게 링크로 감쌉니다. */
  zoomable?: boolean
}

/**
 * 실제 이미지가 있으면 크기를 미리 확보해 표시합니다.
 * 이미지가 없으면 개발 모드에서만 자리표시자를 보여 주고, 배포 빌드에서는 아무것도 렌더링하지 않습니다.
 */
export function Figure({ media, sizes, priority, showCaption = true, contain, className = '', zoomable }: FigureProps) {
  if (!media.src) {
    if (!import.meta.env.DEV || !media.placeholder) return null
    return (
      <figure className={`figure ${className}`}>
        <div
          className="placeholder"
          style={{ aspectRatio: `${media.width} / ${media.height}` }}
          role="img"
          aria-label={`자리표시자: ${media.placeholder.label} (실제 자료 아님)`}
        >
          <span className="dev-badge">자리표시자 · 실제 자료 아님</span>
          <strong>{media.placeholder.label}</strong>
          <span>
            교체 위치: <code>{media.placeholder.replacePath}</code>
          </span>
          <span>배포 빌드에서는 이 영역이 표시되지 않습니다.</span>
        </div>
      </figure>
    )
  }

  const img = (
    <img
      src={media.src}
      srcSet={media.srcSet}
      sizes={sizes}
      width={media.width}
      height={media.height}
      alt={media.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )

  return (
    <figure className={`figure ${className}`}>
      <div className={`shot${contain ? ' shot--contain' : ''}`}>
        {zoomable ? (
          <a href={media.src} target="_blank" rel="noopener noreferrer" className="shot__zoom">
            {img}
            <span className="sr-only"> 원본 크기로 보기 (새 탭에서 열림)</span>
          </a>
        ) : (
          img
        )}
      </div>
      {showCaption && media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  )
}
