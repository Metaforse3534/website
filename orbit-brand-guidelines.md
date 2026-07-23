# Orbit AI — Brand Identity Guidelines
**Orbit Systems B.V. | Internal & External Reference Document**

---

## Brand Foundation

### Core Brand Message
> "Powerful AI is useful. Trusted AI is transformative."

### Brand Positioning Statement
Orbit AI builds intelligent technology you can trust. We design AI software for people and organizations who need capability they can rely on — not capability they need to second-guess.

### Brand Tagline
**"Powerful AI is useful. Trusted AI is transformative."**

### Supporting Tagline Options
- "Intelligence you can depend on."
- "Your intelligence, amplified."
- "AI built around people."
- "Built to be trusted."

---

## Brand Personality

Orbit's brand personality is rooted in five qualities that should be perceptible in every piece of communication, every design decision, and every product experience.

### 1. Calm
Orbit does not shout. The brand communicates confidence through restraint — clean layouts, measured language, thoughtful pacing. Urgency is never manufactured. Tone does not fluctuate with marketing trends.

### 2. Precise
Every claim is accurate. Every description is specific. Orbit avoids vague language, superlatives without evidence, and promises that cannot be substantiated. "Helps you work faster" is permitted if it is true. "Revolutionary" is not.

### 3. Honest
Orbit communicates limitations as readily as it communicates strengths. The product is in early development. Some features are incomplete. Some use cases are outside scope. This is stated clearly rather than obscured. Honesty is a competitive advantage — it creates trust that lasts.

### 4. Intelligent
The brand reflects the intelligence of its audience. Orbit speaks to people who understand technology, who value nuance, and who can identify when they are being talked down to. Explanations are thorough but not condescending. Complexity is addressed, not avoided.

### 5. Confident without arrogance
Orbit is proud of what it builds. The brand communicates genuine confidence in the quality, thoughtfulness, and purpose of the work — without overclaiming, self-congratulating, or disparaging competitors.

---

## Brand Voice

### Tone Spectrum
Orbit's tone sits in the range between **professional and approachable** — never cold or bureaucratic, never casual or flippant. Think: a thoughtful engineer explaining something clearly to an intelligent colleague.

### Voice Characteristics

**Do:**
- Write in direct, active sentences
- Use plain language without sacrificing accuracy
- Acknowledge complexity without creating confusion
- State facts, not opinions dressed as facts
- Use "we" when speaking as the company
- Give users credit for being able to handle honest information

**Avoid:**
- Corporate filler: "best-in-class," "synergy," "leverage," "disruptive," "game-changing"
- Empty superlatives: "the most," "the best," "industry-leading" (without evidence)
- Fear-based language: "Don't fall behind," "Everyone else is already using AI"
- Manipulative urgency: "Limited time," "Act now," "Don't miss out"
- Manufactured enthusiasm: excessive exclamation marks, aggressive capitalization
- Passive voice where active is possible
- Buzzword-heavy abstractions: "AI-powered synergistic ecosystem"

### Voice Examples

**Marketing headline:**
- ✗ "Unleash the Power of Next-Generation AI Automation!"
- ✓ "Automate the tasks that slow you down. Stay in control of the ones that matter."

**Feature description:**
- ✗ "Revolutionary browser automation powered by cutting-edge AI technology"
- ✓ "Browser automation that handles repetitive web tasks, so you can focus on the work that requires your judgment."

**Privacy statement:**
- ✗ "We take your privacy seriously." (generic, unverifiable)
- ✓ "Your conversation data is not used to train external AI models and is not sold to third parties. Here is exactly how your data is handled."

**Error message:**
- ✗ "Oops! Something went wrong. Please try again later."
- ✓ "This request couldn't be completed. If the issue continues, contact support at orbitdev.org."

**Product limitation acknowledgment:**
- ✗ [No mention of limitation]
- ✓ "Orbit is in active development at version 0.0.20. Some capabilities are still being expanded. Here is what is available today."

---

## Visual Identity

### Design Philosophy
Orbit's visual identity reflects the character of the product itself: precise, intelligent, clean, and composed. The aesthetic is premium without being ostentatious — technically sophisticated without being cold.

The goal of every visual decision is to communicate two things simultaneously: **capability** and **trustworthiness**.

### Design Principles

**Minimal.** Remove everything that does not serve communication. White space is not wasted space — it is structure, breathing room, and visual respect for the content.

**Typographic.** Orbit's visual identity leans on excellent typography as its primary expressive tool. Type is sized with intention, spaced carefully, and set with attention to readability at every scale.

**Dark-first.** The primary interface is dark — a deep, near-black background (#050508) that positions the interface as a focused, professional environment. Light mode is supported and maintained as an equally considered experience.

**Restrained color.** The primary palette is near-monochromatic, with a single accent color (periwinkle blue, #9aa7ff) used with discipline. Color is applied to direct attention, not to decorate.

**Glass panels.** UI surfaces use a subtle frosted glass treatment (backdrop-filter: blur) to create depth without visual noise. Panel borders are near-invisible in normal states and surface gently on hover.

**Motion with purpose.** Animations are restrained, meaningful, and performance-conscious. Reveal animations use a smooth cubic-bezier easing curve. Nothing flickers, bounces gratuitously, or distracts from content.

---

## Color System

### Primary Dark Mode Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#050508` | Page background |
| `--panel` | `rgba(13, 14, 22, 0.72)` | Card and panel backgrounds |
| `--panel-solid` | `#0a0b12` | Solid panel variant |
| `--glass` | `rgba(255,255,255,0.035)` | Glass layer |
| `--text-main` | `#f7f7fb` | Headlines, primary text |
| `--text-muted` | `#9ca0b3` | Body text, secondary text |
| `--border` | `rgba(255,255,255,0.085)` | Panel borders (default) |
| `--border-hover` | `rgba(160,173,255,0.34)` | Panel borders (hover) |
| `--accent` | `#9aa7ff` | Primary accent — periwinkle blue |
| `--accent-glow` | `rgba(154,167,255,0.16)` | Glow, highlights |
| `--accent-2` | `#7dd3fc` | Secondary accent — sky blue |
| `--accent-3` | `#c084fc` | Tertiary accent — soft violet |

### Primary Light Mode Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#f7f8ff` | Page background |
| `--panel` | `rgba(255,255,255,0.74)` | Card backgrounds |
| `--text-main` | `#070712` | Headlines, primary text |
| `--text-muted` | `#62677b` | Body text, secondary text |
| `--border` | `rgba(13,16,35,0.09)` | Panel borders (default) |
| `--accent` | `#4f46e5` | Primary accent — indigo |

### Background Gradient (Dark)
The hero/page gradient uses three radial gradients to create a subtle, dimensional spatial quality:
```css
background:
  radial-gradient(900px circle at 18% -10%, rgba(99,102,241,.18), transparent 42%),
  radial-gradient(800px circle at 82% 8%, rgba(125,211,252,.11), transparent 38%),
  radial-gradient(680px circle at 50% 110%, rgba(192,132,252,.10), transparent 40%),
  var(--bg);
```

### Color Usage Rules
- The accent color (#9aa7ff) should appear sparingly — on CTAs, active states, links, and emphasis. Not as decoration.
- Never use pure white (#ffffff) as a text color in the primary interface — use `--text-main` (#f7f7fb).
- Avoid red, orange, or aggressive warning colors except for genuine error states.
- Status colors: sky blue for active/online (#7dd3fc), periwinkle for sync/loading (#9aa7ff), soft violet for attention (#c084fc).

---

## Typography

### Typeface System

| Role | Font | Weights |
|------|------|---------|
| **Headlines, wordmarks, UI labels** | Space Grotesk | 500 (Medium), 700 (Bold) |
| **Body copy, UI text, documentation** | Inter | 300, 400, 500, 600, 700 |
| **Code, technical content** | System monospace (fallback stack) | 400 |

### Type Scale Principles
- Headlines: tight letter-spacing (`letter-spacing: -0.055em`) for a dense, premium feel
- Body text: standard letter-spacing, generous line-height (1.6–1.75) for readability
- Eyebrows / section labels: wide letter-spacing (`letter-spacing: 0.16em`), uppercase, small size (10–11px)
- Technical labels: monospace, code-style treatment

### Type Hierarchy
1. **Display headline** — 56–72px, Space Grotesk Bold, tight tracking
2. **Section headline** — 32–48px, Space Grotesk Bold/Medium
3. **Subheading** — 20–26px, Space Grotesk Medium
4. **Body** — 15–17px, Inter Regular/Medium, line-height 1.65
5. **Caption / muted** — 13–14px, Inter Regular, `--text-muted`
6. **Eyebrow** — 10–11px, Inter Bold, uppercase, wide tracking, accent-tinted

---

## Iconography and Illustration

### Approach
Orbit uses simple, geometric line icons. Stroke weight is consistent (1.5–2px). Icons are never decorative — they are functional, informational, and used to aid navigation or comprehension.

### What to Avoid
- Photorealistic AI imagery (robots, humanoid figures, digital brains)
- Neon-heavy, cyberpunk, or sci-fi visual language
- Cliché circuit board patterns or neural network diagrams as decoration
- Stock photo "business people" imagery
- Oversaturated, colorful gradients used as backgrounds
- Glowing orbs and particle effects as a substitute for genuine design

### Permitted Illustration Style
When illustration is used, it should be:
- Abstract and geometric
- Restrained in color (aligned to the palette)
- Communicating product metaphors, not technological mysticism
- Small and purposeful — never full-page decoration

---

## UI Components and Layout

### Panels and Cards
Panels use the glass treatment with subtle top-edge highlight:
```css
background: linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.016));
box-shadow: inset 0 1px 0 rgba(255,255,255,.055), 0 18px 55px rgba(0,0,0,.22);
backdrop-filter: blur(20px) saturate(135%);
border: 1px solid var(--border);
border-radius: 16–20px;
```

On hover, panels lift gently and the border shifts toward the accent:
```css
transform: translateY(-2px);
border-color: var(--border-hover);
background: linear-gradient(180deg, rgba(154,167,255,.092), rgba(255,255,255,.018));
```

### Primary Button
The primary CTA button uses a gradient from near-white to the accent:
```css
background: linear-gradient(135deg, #f8f9ff 0%, #cfd6ff 42%, #9aa7ff 100%);
color: #070712;
border: 1px solid rgba(255,255,255,.28);
box-shadow: 0 16px 40px rgba(154,167,255,.18);
```

### Secondary / Ghost Button
```css
background: rgba(255,255,255,.035);
color: var(--text-main);
border: 1px solid var(--border);
```

### Layout Principles
- Maximum content width: 1200px
- Generous horizontal padding: 24–48px on edges
- Vertical rhythm: sections separated by 96–128px
- Grid columns: 12-column or flexible auto-grid, collapsing to single column below 900px
- Content never feels cramped — white space is a design element

### Subtle Grid Overlay
A faint grid texture overlays the page background at very low opacity, fading out from the top:
```css
background:
  linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
background-size: 64px 64px;
opacity: .45;
mask-image: radial-gradient(circle at top, black, transparent 76%);
```

---

## Motion and Animation

### Principles
- Animations should feel natural and physics-based, not mechanical
- Use cubic-bezier easing: `cubic-bezier(.16, 1, .3, 1)` (fast start, graceful settle)
- Reveal animations: elements enter from slightly below with opacity 0→1
- Duration: 0.6–0.8s for reveals, 0.2–0.3s for hover states
- Staggered delays for related elements (0.08s increments)

### Reveal Pattern
```css
.reveal {
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.7s cubic-bezier(.16, 1, .3, 1);
}
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
```

### Accessibility
All motion must respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Section Structure and Labeling

### Eyebrow Labels
Section eyebrows appear above headlines to categorize content. They use the following treatment:
- All-caps text
- Wide letter-spacing (0.16em)
- Accent-tinted (color: #c8ceff)
- Small badge/pill with accent border and background
- Example: `[ TRUST & PRIVACY ]`, `[ WHAT WE BUILD ]`, `[ OUR PRINCIPLES ]`

### Section Pattern
```
[eyebrow label]
Section Headline
Supporting body text — one to two sentences explaining the section's purpose.
```

---

## Logo Usage

The Orbit AI logo should be used in full where space permits. The wordmark "Orbit AI" in Space Grotesk is the primary text treatment. Where a logomark is used alone, maintain clear space equal to the height of the "O" on all sides.

The logo should appear in:
- **White / light** on dark backgrounds
- **Near-black** on light backgrounds
- **Accent blue (#9aa7ff)** only as a specific variant for digital interfaces where color is contextually appropriate

Do not:
- Stretch, distort, or rotate the logo
- Apply drop shadows, gradients, or outlines to the logo
- Place the logo over busy or low-contrast backgrounds
- Use the logo at sizes so small it becomes illegible

---

## Brand Do and Don't Summary

### Do
- Communicate with precision and honesty
- Acknowledge limitations and early-stage status openly
- Use restraint in color, motion, and language
- Design with generous whitespace
- Let the typography carry the visual weight
- Apply the accent color with discipline
- Write for an intelligent, technically literate audience
- Be specific: name the feature, state the fact, cite the policy

### Don't
- Use "revolutionary," "industry-leading," "cutting-edge," or "world-class" without evidence
- Add visual complexity for the sake of looking sophisticated
- Fake urgency, fake social proof, or fabricated metrics
- Claim certifications or partnerships that do not exist
- Write privacy and security statements as feel-good marketing copy
- Apply neon effects, glowing brain imagery, or robotic aesthetics
- Speak condescendingly to users or assume they cannot handle nuance
- Publish claims that can be disproved

---

## Key URLs

| Purpose | URL |
|---------|-----|
| Website | https://www.orbitdev.org |
| Application | https://app.orbitdev.org |
| Privacy Policy | https://www.orbitdev.org/Routes/privacy |
| Security Policy | https://www.orbitdev.org/Routes/security |
| Terms of Service | https://www.orbitdev.org/Routes/terms |
| AI Usage Policy | https://www.orbitdev.org/Routes/ai-usage |
| DPA | https://www.orbitdev.org/Routes/dpa |
| Public Repository | https://github.com/Metaforse3534/OrbitAIPublic |

---

## Brand Assets Reference

| Asset | Location |
|-------|----------|
| Favicon (SVG) | /Public/favicon.svg |
| Favicon (PNG 96px) | /Public/favicon-96x96.png |
| App Icon (192px) | /Public/web-app-manifest-192x192.png |
| App Icon (512px) | /Public/web-app-manifest-512x512.png |
| Apple Touch Icon | /Public/apple-touch-icon.png |
| Logo PNG | /Routes/Public/logo.png |
| Theme CSS | /Routes/orbit-theme.css |
| Corporate CSS | /Routes/corporate.css |

---

*These guidelines apply to all public-facing Orbit AI materials: website, documentation, product interfaces, partnership materials, press communications, and developer documentation. Internal tooling may adapt these standards where operationally necessary.*

*Version: July 2026 | Orbit Systems B.V.*
