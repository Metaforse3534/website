import { Fragment, type ReactNode } from 'react'
import type { RichNode } from '../lib/cms'

const allowedProtocols = /^(https?:|mailto:)/i

function renderNode(node: RichNode, key: number): ReactNode {
  if (node.type === 'text') {
    let value: ReactNode = node.text ?? ''
    for (const mark of node.marks ?? []) {
      if (mark.type === 'bold') value = <strong>{value}</strong>
      if (mark.type === 'italic') value = <em>{value}</em>
      if (mark.type === 'code') value = <code>{value}</code>
      if (mark.type === 'link') {
        const href = String(mark.attrs?.href ?? '')
        if (allowedProtocols.test(href) || href.startsWith('/')) value = <a href={href} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{value}</a>
      }
    }
    return <Fragment key={key}>{value}</Fragment>
  }
  const children = (node.content ?? []).map(renderNode)
  switch (node.type) {
    case 'doc': return <Fragment key={key}>{children}</Fragment>
    case 'paragraph': return <p key={key}>{children}</p>
    case 'heading': { const level = Math.min(4, Math.max(2, Number(node.attrs?.level ?? 2))); return level === 3 ? <h3 key={key}>{children}</h3> : level === 4 ? <h4 key={key}>{children}</h4> : <h2 key={key}>{children}</h2> }
    case 'bulletList': return <ul key={key}>{children}</ul>
    case 'orderedList': return <ol key={key}>{children}</ol>
    case 'listItem': return <li key={key}>{children}</li>
    case 'blockquote': return <blockquote key={key}>{children}</blockquote>
    case 'hardBreak': return <br key={key} />
    case 'image': { const src = String(node.attrs?.src ?? ''); return /^https:\/\//.test(src) ? <img key={key} src={src} alt={String(node.attrs?.alt ?? '')} loading="lazy" /> : null }
    default: return null
  }
}

export function RichContent({ document }: { document?: RichNode | null }) {
  return <div className="rich-content">{document ? renderNode(document, 0) : null}</div>
}
