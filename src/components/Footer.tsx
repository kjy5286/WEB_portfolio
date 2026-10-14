import { profile } from '../content/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name} ({profile.nameEn})
        </p>
        <p>프로젝트 화면은 각 팀 저장소에 공개된 실제 서비스 캡처입니다.</p>
      </div>
    </footer>
  )
}
