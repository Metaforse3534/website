import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { EditorContent, useEditor, type JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Heading2, ImagePlus, Italic, Link2, List, ListOrdered, Quote } from 'lucide-react'
import { useEffect } from 'react'
import type { RichNode } from '../lib/cms'

export function RichTextEditor({ value, onChange }: { value: RichNode; onChange: (value: RichNode) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Image.configure({ allowBase64: false })],
    content: value as JSONContent,
    onUpdate: ({ editor: activeEditor }) => onChange(activeEditor.getJSON() as RichNode),
    editorProps: { attributes: { class: 'admin-rich-editor', 'aria-label': 'Article content' } },
  })
  useEffect(() => {
    if (editor && JSON.stringify(editor.getJSON()) !== JSON.stringify(value)) editor.commands.setContent(value as JSONContent)
  }, [editor, value])
  if (!editor) return null
  const setLink = () => {
    const existing = editor.getAttributes('link').href as string | undefined
    const href = window.prompt('Link URL', existing ?? 'https://')
    if (href === null) return
    if (!href) editor.chain().focus().unsetLink().run()
    else if (/^(https?:|mailto:|\/)/i.test(href)) editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
  }
  const setImage = () => {
    const src = window.prompt('Public HTTPS image URL')
    if (src && /^https:\/\//i.test(src)) editor.chain().focus().setImage({ src, alt: '' }).run()
  }
  const tools = [
    ['Bold', <Bold />, () => editor.chain().focus().toggleBold().run(), editor.isActive('bold')],
    ['Italic', <Italic />, () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic')],
    ['Heading', <Heading2 />, () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 })],
    ['Bulleted list', <List />, () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList')],
    ['Numbered list', <ListOrdered />, () => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList')],
    ['Quote', <Quote />, () => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote')],
    ['Link', <Link2 />, setLink, editor.isActive('link')],
    ['Image', <ImagePlus />, setImage, false],
  ] as const
  return <div className="rich-editor-shell"><div className="rich-toolbar" role="toolbar" aria-label="Formatting">
    {tools.map(([label, icon, action, active]) => <button type="button" key={label} title={label} aria-label={label} aria-pressed={active} className={active ? 'active' : ''} onClick={action}>{icon}</button>)}
  </div><EditorContent editor={editor} /></div>
}
