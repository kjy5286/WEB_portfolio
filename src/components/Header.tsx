import { Link } from 'react-router-dom'
import { profile } from '../content/site'

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__name">
          {profile.name}
          <span className="site-header__name-en" lang="en">
            {profile.nameEn}
          </span>
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className="site-header__nav">
            <li>
              <Link to="/#projects">프로젝트</Link>
            </li>
            <li>
              <Link to="/#principles">기준</Link>
            </li>
            <li>
              <Link to="/#contact">연락</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
