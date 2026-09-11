import { Helmet } from 'react-helmet-async'

export function Meta({ title, description, path, article = false }: { title: string; description: string; path: string; article?: boolean }) {
  const canonical = `https://www.orbitdev.org${path === '/' ? '/' : path}`
  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': 'https://www.orbitdev.org/#organization', name: 'Orbit AI', alternateName: 'Orbit Labs', url: 'https://www.orbitdev.org/', sameAs: ['https://github.com/Metaforse3534/OrbitAIPublic'] },
      { '@type': article ? 'Article' : 'BreadcrumbList', ...(article ? { headline: title, description, publisher: { '@id': 'https://www.orbitdev.org/#organization' }, mainEntityOfPage: canonical } : { itemListElement: path === '/' ? [{ '@type': 'ListItem', position: 1, name: 'Home', item: canonical }] : [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.orbitdev.org/' }, { '@type': 'ListItem', position: 2, name: title, item: canonical }] }) },
    ],
  }
  return <Helmet>
    <title>{title} | Orbit AI</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content={article ? 'article' : 'website'} />
    <meta property="og:site_name" content="Orbit AI" />
    <meta property="og:title" content={`${title} | Orbit AI`} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content="https://www.orbitdev.org/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${title} | Orbit AI`} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content="https://www.orbitdev.org/og.png" />
    <script type="application/ld+json">{JSON.stringify(structured)}</script>
  </Helmet>
}
