/**
 * 빌드 후 프로젝트별 정적 HTML(dist/projects/<slug>/index.html)을 만들어
 * 링크 미리보기(카카오톡·슬랙·LinkedIn 등)에 프로젝트별 제목·설명·이미지가 보이게 합니다.
 * 내용은 src/content/site.ts에서 그대로 읽어 옵니다. (Node 22.18+ 타입 제거 기능 사용)
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { siteMeta, projects } = await import('../src/content/site.ts')

const template = await readFile(join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// 배포 주소: site.ts의 siteMeta.url → SITE_URL 환경 변수 → Vercel이 빌드 때 넣어 주는 프로덕션 도메인 순서
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = siteMeta.url || process.env.SITE_URL || (vercelHost ? `https://${vercelHost}` : '')
if (siteUrl) console.log(`site url: ${siteUrl}`)
const abs = (path) => (siteUrl ? new URL(path, siteUrl).toString() : path)

function render({ title, description, path, image, type }) {
  const metaContent = (attr, key, value) =>
    (html) =>
      html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${esc(value)}$2`)
  const steps = [
    (h) => h.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`),
    metaContent('name', 'description', description),
    metaContent('property', 'og:type', type),
    metaContent('property', 'og:title', title),
    metaContent('property', 'og:description', description),
    metaContent('property', 'og:url', abs(path)),
    metaContent('property', 'og:image', abs(image)),
    metaContent('name', 'twitter:title', title),
    metaContent('name', 'twitter:description', description),
    metaContent('name', 'twitter:image', abs(image)),
  ]
  let html = steps.reduce((h, f) => f(h), template)
  if (siteUrl) html = html.replace('</head>', `  <link rel="canonical" href="${esc(abs(path))}" />\n  </head>`)
  return html
}

await writeFile(
  join(dist, 'index.html'),
  render({ title: siteMeta.title, description: siteMeta.description, path: '/', image: siteMeta.ogImage, type: 'website' }),
)

for (const p of projects) {
  const dir = join(dist, 'projects', p.slug)
  await mkdir(dir, { recursive: true })
  const html = render({
    title: p.meta.title,
    description: p.meta.description,
    path: `/projects/${p.slug}`,
    image: p.meta.ogImage,
    type: 'article',
  })
  // /projects/<slug>/ 와 /projects/<slug> 어느 쪽으로 열어도 같은 메타데이터가 내려가도록 두 파일을 만듭니다.
  await writeFile(join(dir, 'index.html'), html)
  await writeFile(join(dist, 'projects', `${p.slug}.html`), html)
  console.log(`prerendered /projects/${p.slug}`)
}

// 정적 호스팅(GitHub Pages 등)에서 알 수 없는 경로도 앱이 처리하도록 404.html을 둡니다.
await writeFile(join(dist, '404.html'), template)

if (siteUrl) {
  const urls = ['/', ...projects.map((p) => `/projects/${p.slug}`)]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${abs(u)}</loc></url>`)
    .join('\n')}\n</urlset>\n`
  await writeFile(join(dist, 'sitemap.xml'), sitemap)
}

// 검색엔진 안내. 사이트 주소를 알면 sitemap 위치도 함께 적습니다.
await writeFile(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${abs('/sitemap.xml')}\n` : ''}`,
)
