import { ArrowLeft, ArrowRight, Clipboard, Share2 } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Layout } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
import { blogPosts } from '../data/siteData'

export default function BlogPage({ index = false }: { index?: boolean }) {
  const { slug } = useParams()
  const [copied, setCopied] = useState(false)
  if (index) return <Layout><Meta title="ORBIT AI WRITING" description="Orbit writing about AI research, engineering, Pulsar, robotics, trust, and company updates." path="/Routes/blog" /><section className="blog-hero"><p className="eyebrow">NOTES / ENGINEERING / RESEARCH</p><h1>ORBIT AI WRITING</h1><p>Technical notes on what Orbit is building, what it is researching, and where the boundaries matter.</p><div className="category-list">AI research · Engineering · Pulsar · Robotics · Trust and safety · Company updates</div></section><section className="post-grid">{blogPosts.map((post, index) => <Link to={`/public/blog/${post.slug}`} key={post.slug}><span>{post.category} / 0{index + 1}</span><h2>{post.title}</h2><p>{post.summary}</p><footer>{post.read}<ArrowRight size={16} /></footer></Link>)}</section></Layout>
  const post = blogPosts.find(item => item.slug === slug)
  if (!post) return <Navigate to="/404" replace />
  const related = blogPosts[(blogPosts.indexOf(post) + 1) % blogPosts.length]
  const copy = async () => { await navigator.clipboard.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 1400) }
  const share = async () => { if (navigator.share) await navigator.share({ title: post.title, text: post.summary, url: location.href }); else await copy() }
  return <Layout><Meta title={post.title} description={post.summary} path={`/public/blog/${post.slug}`} article />
    <article className="article"><header><p className="eyebrow">{post.category.toUpperCase()} / ORBIT AI WRITING</p><h1>{post.title}</h1><p>{post.summary}</p><div><span>{post.read}</span><button onClick={copy}><Clipboard size={15} />{copied ? 'Copied' : 'Copy link'}</button><button onClick={share}><Share2 size={15} />Share</button></div></header><div className="article-layout"><aside><p>IN THIS ARTICLE</p>{post.sections.map(([title]) => <a key={title} href={`#${title.toLowerCase().replaceAll(' ', '-')}`}>{title}</a>)}</aside><div className="article-body">{post.sections.map(([title, copy]) => <section id={title.toLowerCase().replaceAll(' ', '-')} key={title}><h2>{title}</h2><p>{copy}</p></section>)}<p className="article-rule">Orbit publishes product-status labels so readers can distinguish available capabilities from research and plans.</p></div></div><footer className="article-footer"><Link to="/Routes/blog"><ArrowLeft size={16} /> Back to Orbit writing</Link><Link to={`/public/blog/${related.slug}`}><span>RELATED ARTICLE</span>{related.title}<ArrowRight size={16} /></Link></footer>
    </article>
  </Layout>
}
