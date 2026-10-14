import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import './styles/global.css'
import './styles/layout.css'
import App from './App'

// 스크롤 등장 효과는 JavaScript가 동작할 때만 켭니다(그 전에는 콘텐츠가 그대로 보임).
document.documentElement.classList.add('js-reveal')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
