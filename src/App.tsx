import { Outlet, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { RouteEffects } from './lib/RouteEffects'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectPage } from './pages/ProjectPage'

function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <RouteEffects />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
