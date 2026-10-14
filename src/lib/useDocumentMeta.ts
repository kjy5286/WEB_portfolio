import { useEffect } from 'react'
import { siteMeta } from '../content/site'

interface MetaInput {
  title: string
  description: string
  path: string
  ogImage?: string
  type?: 'website' | 'article'
}

function absolute(path: string) {
  return siteMeta.url ? new URL(path, siteMeta.url).toString() : path
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

/**
 * 라우트가 바뀔 때 제목·설명·공유 메타데이터를 갱신합니다.
 * (빌드 시 scripts/prerender-meta.mjs가 같은 값을 정적 HTML에도 넣어 링크 미리보기에 사용됩니다.)
 */
export function useDocumentMeta({ title, description, path, ogImage = siteMeta.ogImage, type = 'website' }: MetaInput) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', absolute(path))
    setMeta('property', 'og:image', absolute(ogImage))
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', absolute(ogImage))
  }, [title, description, path, ogImage, type])
}
