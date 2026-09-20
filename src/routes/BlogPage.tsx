import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Clipboard, Share2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
import { RichContent } from '../components/RichContent'
import { OrbitAsyncRegion, OrbitSkeleton, useDelayedPending } from '../components/loading'
import { OrbitImage } from '../components/media'
import type { EditorialPost } from '../lib/cms'
import { contentMediaUrl, isSupabaseConfigured, supabase } from '../lib/supabase'

export default function BlogPage({ index = false }: { index?: boolean }) {
  const { slug } = useParams(); const [copied, setCopied] = useState(false)
  const query = useQuery({ queryKey: ['public-blog', slug ?? 'index'], enabled: isSupabaseConfigured, queryFn: async () => { const base = supabase!.from('editorial_posts').select('*').eq('kind', 'blog'); const { data, error } = slug ? await base.eq('slug', slug).maybeSingle() : await base.order('publish_at', { ascending: false }); if (error) throw error; return data as EditorialPost | EditorialPost[] | null } })
  const showDetailLoading = useDelayedPending(query.isLoading)
  if (index) {
    const posts = Array.isArray(query.data) ? query.data : []
    return <Layout><Meta title="ORBIT AI WRITING" description="Orbit writing about AI research, engineering, Pulsar, robotics, trust, and company updates." path="/Routes/blog" /><section className="blog-hero"><p className="eyebrow">NOTES / ENGINEERING / RESEARCH</p><h1>ORBIT AI WRITING</h1><p>Technical notes on what Orbit is building, what it is researching, and where the boundaries matter.</p></section><section className="post-grid" aria-busy={query.isLoading}><OrbitAsyncRegion loading={query.isLoading} error={query.error} onRetry={() => void query.refetch()} label="Loading Orbit writing" loadingFallback={<div className="content-skeleton-grid" aria-hidden="true"><OrbitSkeleton lines={3} /><OrbitSkeleton lines={3} /><OrbitSkeleton lines={3} /></div>}>{posts.map((post, itemIndex) => <Link to={`/public/blog/${post.slug}`} key={post.id}><span>BLOG / {String(itemIndex + 1).padStart(2,'0')}</span><h2>{post.title}</h2><p>{post.excerpt}</p><footer>{post.author_name}<ArrowRight size={16} /></footer></Link>)}{!posts.length && <p className="content-empty">No published articles are available.</p>}</OrbitAsyncRegion></section></Layout>
  }
  const post = !Array.isArray(query.data) ? query.data : null
  if (query.isLoading) return <Layout><section className="content-loading" aria-busy="true">{showDetailLoading && <><OrbitSkeleton lines={4} /><span className="sr-only">Loading article</span></>}</section></Layout>
  if (query.isError) return <Layout><section className="content-loading orbit-error-state" role="alert"><h1>Article unavailable</h1><p>We couldn’t load this publication.</p><button type="button" className="button ghost" onClick={() => void query.refetch()}>Retry</button><Link to="/Routes/blog">Return to writing</Link></section></Layout>
  if (!post) return <Layout><section className="content-loading"><h1>Article unavailable</h1><Link to="/Routes/blog">Return to writing</Link></section></Layout>
  const copy = async () => { await navigator.clipboard.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 1400) }
  const share = async () => { if (navigator.share) await navigator.share({ title: post.title, text: post.excerpt, url: location.href }); else await copy() }
  return <Layout><Meta title={post.seo_title || post.title} description={post.seo_description || post.excerpt} path={`/public/blog/${post.slug}`} article /><article className="article"><header>{post.cover_image_path && <OrbitImage className="article-cover" src={contentMediaUrl(post.cover_image_path) ?? ''} alt="" aspectRatio="16 / 9" />}<p className="eyebrow">ORBIT AI WRITING</p><h1>{post.title}</h1><p>{post.excerpt}</p><div><span>{post.author_name}</span><button onClick={copy}><Clipboard />{copied ? 'Copied' : 'Copy link'}</button><button onClick={share}><Share2 />Share</button></div></header><div className="article-layout single"><div className="article-body"><RichContent document={post.body} /></div></div><footer className="article-footer"><Link to="/Routes/blog"><ArrowLeft /> Back to Orbit writing</Link></footer></article></Layout>
}
