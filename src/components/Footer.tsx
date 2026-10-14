import { profile } from '../content/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name} ({profile.nameEn})
        </p>
        <p>프로젝트 이미지는 실제 서비스·앱 화면 캡처입니다.</p>
      </div>
    </footer>
  )
}
