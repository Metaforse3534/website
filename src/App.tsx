import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { legalDocuments } from './data/legalData'
import { pages } from './data/siteData'

const Home = lazy(() => import('./routes/Home'))
const GenericPage = lazy(() => import('./routes/GenericPage'))
const ApiPage = lazy(() => import('./routes/ApiPage'))
const DocsPage = lazy(() => import('./routes/DocsPage'))
const PricingPage = lazy(() => import('./routes/PricingPage'))
const FormsPage = lazy(() => import('./routes/FormsPage'))
const BlogPage = lazy(() => import('./routes/BlogPage'))
const LegalPage = lazy(() => import('./routes/LegalPage'))
const CareersPage = lazy(() => import('./routes/CareersPage'))
const NotFoundPage = lazy(() => import('./routes/NotFoundPage'))

const legacyRedirects: [string, string][] = [
  ...pages.map(page => [`${page.path}.html`, page.path] as [string, string]),
  ...legalDocuments.flatMap(page => [[`${page.path}.html`, page.path] as [string, string]]),
  ['/Routes/doc.html', '/Routes/doc'], ['/Routes/DEV.html', '/Routes/DEV'], ['/Routes/Eco.html', '/Routes/Eco'], ['/Routes/Career.html', '/Routes/Career'],
  ['/shop.html', '/shop'], ['/about-orbit-ai', '/Routes/about'], ['/ai-workspace', '/Routes/orbit-ai'],
  ['/Routes/acceptabe', '/Routes/acceptable'], ['/Routes/acceptabe.html', '/Routes/acceptable'],
  ...['why-we-are-building-pulsar', 'how-we-think-about-trust-in-ai', 'building-ai-systems-that-work-with-people', 'inside-orbit-ais-ai-architecture', 'the-future-of-ai-and-robotics'].map(slug => [`/public/blog/${slug}.html`, `/public/blog/${slug}`] as [string, string]),
]

export default function App() {
  return <Suspense fallback={<div className="route-loader" role="status"><span /> Loading Orbit…</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      {pages.filter(page => !['/Routes/contact', '/Routes/reviews'].includes(page.path)).map(page => <Route key={page.path} path={page.path} element={<GenericPage pagePath={page.path} />} />)}
      {legalDocuments.map(document => <Route key={document.path} path={document.path} element={<LegalPage path={document.path} />} />)}
      <Route path="/Routes/DEV" element={<ApiPage />} />
      <Route path="/Routes/doc" element={<DocsPage />} />
      <Route path="/shop" element={<PricingPage />} />
      <Route path="/Routes/contact" element={<FormsPage type="contact" />} />
      <Route path="/Routes/reviews" element={<FormsPage type="reviews" />} />
      <Route path="/Routes/blog" element={<BlogPage index />} />
      <Route path="/public/blog/:slug" element={<BlogPage />} />
      <Route path="/Routes/Career" element={<CareersPage />} />
      {legacyRedirects.map(([from, to]) => <Route key={from} path={from} element={<Navigate to={to} replace />} />)}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
}
