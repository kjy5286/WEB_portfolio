import { Link } from 'react-router-dom'
import { siteMeta } from '../content/site'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export function NotFoundPage() {
  useDocumentMeta({ title: `페이지를 찾을 수 없습니다 | ${siteMeta.title}`, description: siteMeta.description, path: '/' })
  return (
    <section className="section">
      <div className="container not-found">
        <h1 tabIndex={-1}>페이지를 찾을 수 없습니다</h1>
        <p className="muted">주소가 바뀌었거나 없는 페이지입니다.</p>
        <Link to="/" className="btn btn--primary">
          처음으로
        </Link>
      </div>
    </section>
  )
}
