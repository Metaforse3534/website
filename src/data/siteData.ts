export type PageSection = {
  title: string
  body: string
  items?: string[]
  status?: 'Available' | 'Research' | 'Prototype' | 'Planned' | 'In development' | 'Coming soon' | 'Contact us'
}

export type PageAction = { label: string; href: string; primary?: boolean }

export type PageDefinition = {
  path: string
  eyebrow: string
  title: string
  description: string
  intro: string
  notice?: string
  sections: PageSection[]
  actions?: PageAction[]
}

export const external = {
  site: 'https://www.orbitdev.org/',
  app: 'https://app.orbitdev.org/',
  auth: 'https://app.orbitdev.org/auth',
  developer: 'https://app.orbitdev.org/developer',
  extension: 'https://app.orbitdev.org/extension',
  billing: 'https://app.orbitdev.org/billing',
  settings: 'https://app.orbitdev.org/settings',
  github: 'https://github.com/Metaforse3534/OrbitAIPublic',
  discord: 'https://discord.gg/8VcqeZK2',
  windows: 'https://github.com/Metaforse3534/website/raw/main/Orbit-ai-Setup-0.0.20.exe',
}

export const pages: PageDefinition[] = [
  {
    path: '/Routes/orbit-ai', eyebrow: 'ORBIT AI v0.0.20 / OFFICIAL WORKSPACE', title: 'The Workspace for Autonomous Execution.',
    description: 'Orbit AI workspace for research, coding, files, agents, automation, voice, and artifact creation.',
    intro: 'An intelligent workspace for chat, research, coding, files, browser assistance, agents, workflows, voice, and artifact creation.',
    notice: 'Current release: web workspace and Windows desktop. Mobile projects use Capacitor, but no public iOS or Android release is claimed.',
    sections: [
      { title: 'What Orbit AI is', body: 'Orbit keeps conversations, source material, tools, model access, and results in one focused workspace. It is built to move from a request to work a person can inspect and use.', status: 'Available' },
      { title: 'Chat and files', body: 'Discuss a problem, attach supported text files, compare material, and carry relevant context into the next step without rebuilding the brief each time.', items: ['Authenticated workspace', 'Chat and coding assistance', 'Up to three supported text attachments per message'], status: 'Available' },
      { title: 'Images and artifacts', body: 'Create structured reports, documents, presentations, spreadsheets, code, and images when the required backend or desktop bridge is connected.', status: 'Available' },
      { title: 'Models and modes', body: 'Select Normal, Orbit, Pulsar, Pro, or automatic routing according to plan and current availability. External providers may change without notice.', status: 'Available' },
      { title: 'Agents and runs', body: 'Lead, Builder, Researcher, and Reviewer agents can divide work into visible steps, surface sources and errors, and return a result for human review.', status: 'Available' },
      { title: 'Voice engine', body: 'Use voice as another way to work with the current conversation where voice access is enabled.', status: 'Available' },
      { title: 'Automations', body: 'Assemble manual or triggered workflows from agents, conditions, delays, and saved results. Consequential actions still require appropriate review.', status: 'Available' },
      { title: 'Desktop application', body: 'The Windows desktop application connects Orbit to local creation workflows and selected desktop actions. Only Windows is currently documented as released.', status: 'Available' },
      { title: 'Browser extension', body: 'Extension Pro can provide readable page context, selected text, and review-first form suggestions through an account-linked connection.', status: 'Available' },
      { title: 'Account security', body: 'Keep credentials private, review connected surfaces, revoke exposed API keys, and use account deletion controls when needed.', status: 'Available' },
      { title: 'Current limitations', body: 'Models, provider access, limits, and individual tools depend on plan, service availability, and connected infrastructure. Generated outputs can be wrong and require review.' },
    ],
    actions: [{ label: 'Launch Web App', href: external.app, primary: true }, { label: 'Download for Windows', href: external.windows }, { label: 'Pricing', href: '/shop' }, { label: 'Documentation', href: '/Routes/doc' }],
  },
  {
    path: '/Routes/agents', eyebrow: 'ORBIT AGENTS / COORDINATED EXECUTION', title: 'DON’T JUST ASK. LET AGENTS EXECUTE.',
    description: 'Create and supervise coordinated Orbit agents for research, building, review, and workflow execution.',
    intro: 'Create a team around a goal, watch the work move through visible steps, and review the final result before it matters.',
    sections: [
      { title: 'Create the right team', body: 'Define an agent with a focused role, instructions, tools, and expected output. Starter agents make common divisions of work explicit.', items: ['Lead — decomposes the goal and coordinates the result', 'Builder — produces code, structures, copy, and deliverables', 'Researcher — finds relevant information and sources', 'Reviewer — checks gaps, risks, security, and assumptions'], status: 'Available' },
      { title: 'Runs, steps, and statuses', body: 'A run exposes progress from understanding through research, comparison, building, review, and completion. Each step can show source links, final results, or a useful error state.' },
      { title: 'Human supervision', body: 'Agent output is a draft for review. Users remain responsible for decisions, permissions, published work, and consequential actions.' },
      { title: 'Manual workflow triggers', body: 'Automations can dispatch agent work manually. Where a two-minute agent-step timeout applies, the run reports the interruption rather than presenting unfinished work as complete.' },
    ],
    actions: [{ label: 'Launch Orbit', href: external.app, primary: true }, { label: 'Read agent documentation', href: '/Routes/doc#agents-and-workflows' }, { label: 'Open automations', href: 'https://app.orbitdev.org/automations' }],
  },
  {
    path: '/Routes/Eco', eyebrow: 'ORBIT ECOSYSTEM / CONNECTED SURFACES', title: 'The tools orbit around the workspace.',
    description: 'One Orbit account across the AI workspace, developer API, extension, desktop bridge, and documented research surfaces.',
    intro: 'One account, multiple surfaces. The workspace is the center; connected tools extend where the work can happen.',
    sections: [
      { title: 'Orbit AI', body: 'The released workspace for chat, files, coding, agents, automations, voice, and artifacts.', status: 'Available' },
      { title: 'Pro Pulsar', body: 'A research and infrastructure initiative, and a premium model-routing access level inside the workspace. Status differs by component.', status: 'Research' },
      { title: 'Extension workflows', body: 'Account-linked browser context and review-first assistance for the current page.', status: 'Available' },
      { title: 'Desktop bridge', body: 'A Windows connection for artifact creation and selected desktop actions.', status: 'Available' },
      { title: 'Developer API', body: 'Key-authenticated completions, agent runs, result reads, and usage information for external applications.', status: 'Available' },
      { title: 'Documentation and account', body: 'Shared product guidance, settings, billing, extension access, and developer controls.', status: 'Available' },
    ],
    actions: [{ label: 'Launch Orbit', href: external.app, primary: true }, { label: 'Read documentation', href: '/Routes/doc' }],
  },
  {
    path: '/Routes/pro-pulsar', eyebrow: 'FRONTIER INITIATIVE', title: 'PRO PULSAR. BUILT FROM THE MODEL UP.',
    description: 'Pro Pulsar is Orbit AI’s language-model and AI-infrastructure initiative.',
    intro: 'Pro Pulsar is Orbit AI’s language-model and AI-infrastructure initiative covering model architecture, training, inference, GPU infrastructure, and developer APIs.',
    notice: 'Orbit does not publish unsupported benchmarks. Performance claims must be tied to reproducible tests.',
    sections: [
      { title: 'Research initiative', body: 'Model architecture, training methods, evaluation, and future multimodal systems are research areas rather than promises of released infrastructure.', status: 'Research' },
      { title: 'Training systems', body: 'Tooling for tokenization, data preparation, distributed training, fine-tuning, and repeatable evaluation.', status: 'Prototype' },
      { title: 'Inference infrastructure', body: 'GPU acceleration, model serving, routing, observability, and developer-access patterns.', status: 'Planned' },
      { title: 'Workspace access level', body: 'Pro Pulsar also names a premium routing and access level inside Orbit. It is distinct from the broader research initiative.', status: 'Available' },
    ],
    actions: [{ label: 'Get Workspace Access', href: '/shop', primary: true }, { label: 'Documentation', href: '/Routes/doc' }, { label: 'Research', href: '/Routes/research' }],
  },
  {
    path: '/Routes/pulsar', eyebrow: 'PULSAR / LANGUAGE-MODEL RESEARCH', title: 'PULSAR',
    description: 'Orbit research into language-model architecture, training, inference, agents, and future multimodal systems.',
    intro: 'Pulsar is a research program for understanding how Orbit may build and operate more capable, inspectable model systems over time.',
    sections: [
      { title: 'Foundation models', body: 'Explore model families, evaluation design, and dependable behavior without presenting a planned model as released.', status: 'Research' },
      { title: 'Architecture and tokenization', body: 'Investigate model structure, context handling, tokenization, and efficiency trade-offs.', status: 'Research' },
      { title: 'Training infrastructure', body: 'Data preparation, distributed training, checkpointing, and fine-tuning systems.', status: 'Prototype' },
      { title: 'Inference and GPU acceleration', body: 'Study latency, memory use, batching, quantization, and scalable serving.', status: 'Research' },
      { title: 'Developer APIs and agents', body: 'Design future model-serving interfaces that can support tools and coordinated agents safely.', status: 'Planned' },
      { title: 'Future multimodal systems', body: 'Investigate models that can reason across text, images, audio, and physical-system signals.', status: 'Planned' },
    ], actions: [{ label: 'Explore Pro Pulsar', href: '/Routes/pro-pulsar', primary: true }, { label: 'Research overview', href: '/Routes/research' }],
  },
  {
    path: '/Routes/pulsar-v1', eyebrow: 'IN DEVELOPMENT / CONCEPT TARGETS ONLY', title: 'PULSAR V1',
    description: 'Pulsar V1 is Orbit’s in-development agile reconnaissance and support robotics concept.',
    intro: 'Scout. Assist. Adapt. An agile reconnaissance and support robotics concept built for dynamic environments and designed to explore speed, precision, autonomy, and collaboration with human teams.',
    notice: 'Concept visualization and design targets only. Pulsar V1 is not a finished product. Specifications are not verified measurements of built hardware.',
    sections: [
      { title: 'Mission concept', body: 'Explore how intelligent software could support inspection, mapping, observation, and assistance in dynamic environments.', status: 'In development' },
      { title: 'Perception', body: 'Research sensor fusion, scene understanding, localization, and uncertainty-aware decisions.', status: 'Research' },
      { title: 'Mobility research', body: 'Study balance, route planning, terrain awareness, and recovery without claiming finished hardware performance.', status: 'Research' },
      { title: 'Human supervision', body: 'Keep people responsible for goals, boundaries, overrides, and review of high-consequence behavior.', status: 'Research' },
      { title: 'Power and computing', body: 'Evaluate the trade-offs among onboard inference, remote assistance, energy use, heat, and weight.', status: 'Planned' },
      { title: 'Safety principles', body: 'Prefer bounded behavior, visible state, conservative failure modes, emergency stops, and controlled testing.', status: 'Research' },
      { title: 'Development status', body: 'Pulsar V1 is not available for purchase or deployment. No specifications on this site are verified measurements of completed hardware.', status: 'In development' },
      { title: 'Research connections', body: 'The concept connects Orbit work in agents, multimodal models, planning, tool execution, and human oversight.', status: 'Research' },
    ], actions: [{ label: 'Read the research overview', href: '/Routes/research', primary: true }, { label: 'Explore Pulsar', href: '/Routes/pulsar' }],
  },
  {
    path: '/Routes/business', eyebrow: 'ORBIT FOR ORGANIZATIONS', title: 'ORBIT FOR BUSINESS.',
    description: 'Discuss Orbit AI workspace, developer access, administration, security, and deployment direction for organizations.',
    intro: 'Bring focused AI work, shared context, and developer access into one conversation with clear readiness labels.',
    notice: 'Enterprise capabilities, availability, security requirements, and private-deployment options must be confirmed during sales discussions.',
    sections: [
      { title: 'Workspace for teams', body: 'Organize shared projects and context around the work a team needs to complete.', status: 'Contact us' },
      { title: 'Roles and administration', body: 'Role-based access, centralized administration, permissions, and billing are product directions that require confirmation.', status: 'Planned' },
      { title: 'Security controls', body: 'Discuss account controls, tool permissions, data handling, deletion, and review requirements before adoption.', status: 'Contact us' },
      { title: 'Developer access', body: 'Use server-side API keys for completions and agent runs with published limits and explicit error handling.', status: 'Available' },
      { title: 'Private deployment direction', body: 'Private model and infrastructure requirements are evaluated case by case and are not presented as generally available.', status: 'Planned' },
      { title: 'DPA availability', body: 'Review the published data processing agreement and confirm any enterprise-specific terms during contracting.', status: 'Contact us' },
    ], actions: [{ label: 'Contact Sales', href: '/Routes/contact', primary: true }, { label: 'Read DPA', href: '/Routes/dpa' }, { label: 'Security', href: '/Routes/security' }],
  },
  {
    path: '/Routes/research', eyebrow: 'ORBIT RESEARCH / FOUNDATIONS', title: 'AI RESEARCH AND FOUNDATIONS.',
    description: 'Orbit research areas across reasoning, agents, oversight, model architecture, robotics, and responsible automation.',
    intro: 'Research is where Orbit can be ambitious without confusing an investigation with a released product.',
    sections: [
      { title: 'Trajectory reasoning', body: 'Study how agents form, revise, and explain plans across long, uncertain tasks.', status: 'Research' },
      { title: 'Multi-agent coordination', body: 'Investigate delegation, shared context, conflict resolution, and review across specialized agents.', status: 'Research' },
      { title: 'Human oversight', body: 'Design interfaces and policies that keep responsibility, approvals, and consequential decisions with people.', status: 'Research' },
      { title: 'Verifiable tool execution', body: 'Explore permissions, observable steps, sandboxed actions, and evidence that a tool did what was requested.', status: 'Research' },
      { title: 'Language-model architecture', body: 'Work across model structure, training, inference, evaluation, and future multimodal systems.', status: 'Research' },
      { title: 'Robotics and responsible automation', body: 'Connect intelligent software to physical systems through bounded tests, supervision, and honest development labels.', status: 'In development' },
      { title: 'Trajectory Reasoning in Autonomous Multi-Agent Swarms', body: 'An existing research title. No author, journal, DOI, acceptance status, or download is claimed here.', status: 'Research' },
      { title: 'Verifiable Tool Execution in Sandboxed Enclaves', body: 'An existing research title. Publication details are not available and are therefore not invented.', status: 'Research' },
    ], actions: [{ label: 'Explore Pulsar', href: '/Routes/pulsar', primary: true }, { label: 'Pulsar V1 concept', href: '/Routes/pulsar-v1' }],
  },
  {
    path: '/Routes/developers', eyebrow: 'DEVELOPER PLATFORM / BUILD SURFACE', title: 'BUILT FOR ENGINEERS.',
    description: 'Build with Orbit completions, agent runs, secure API keys, usage information, and documented errors.',
    intro: 'Use Orbit from the workspace, your server, or a carefully bounded local workflow.',
    sections: [
      { title: 'Developer API', body: 'Key-authenticated completions and Orbit agent runs for external applications.', status: 'Available' },
      { title: 'Secure API keys', body: 'Create and revoke keys in the developer dashboard. Keep every key on a trusted server and out of public clients.' },
      { title: 'Chat completions and agent runs', body: 'Send prompts, start agents, inspect run status, read results, and handle errors explicitly.' },
      { title: 'Usage information', body: 'Read the current request tier and usage without spending an Orbit credit.' },
      { title: 'CLI and daemon direction', body: 'Local sandbox, CLI, and daemon workflows remain a development direction where not explicitly documented as available.', status: 'Planned' },
      { title: 'Streaming tool calls', body: 'Streaming interfaces and tool-call behavior depend on current API support and should be confirmed against the documentation.', status: 'Planned' },
      { title: 'Errors you can act on', body: 'Treat authentication, credit, validation, quota, and server failures as distinct states instead of a generic failure.' },
    ], actions: [{ label: 'Open Developer Dashboard', href: external.developer, primary: true }, { label: 'API Documentation', href: '/Routes/DEV' }, { label: 'Product Documentation', href: '/Routes/doc' }, { label: 'GitHub', href: external.github }],
  },
  {
    path: '/Routes/about', eyebrow: 'ORBIT LABS / NETHERLANDS', title: 'INTELLIGENCE, BUILT FOR WHAT’S NEXT.',
    description: 'Orbit AI is an AI workspace and research company building trusted intelligence for software, agents, and robotics.',
    intro: 'Orbit AI builds intelligent systems, AI assistants, developer tools, and Pro Pulsar language-model technology. Orbit Labs develops the Orbit workspace and pursues longer-term Pulsar V1 robotics research.',
    sections: [
      { title: 'What Orbit builds', body: 'A connected AI workspace, coordinated agents, developer tools, language-model research, and longer-term robotics concepts.' },
      { title: 'Orbit workspace', body: 'The current product brings chat, files, research, code, agents, automation, voice, and artifacts together.' },
      { title: 'Pro Pulsar', body: 'Orbit’s language-model and AI-infrastructure initiative, with component-level Research, Prototype, Planned, or Available labels.', status: 'Research' },
      { title: 'Pulsar V1 research', body: 'A long-term robotics concept for exploring intelligent software in physical systems—not a finished product.', status: 'In development' },
      { title: 'Operating principles', body: 'Precision, velocity, autonomy, responsibility, and honest product labels shape how Orbit describes and builds its work.' },
      { title: 'Project information', body: 'Public product brand: Orbit AI. Operating name: Orbit Labs. Based in the Netherlands; business registration is pending.' },
      { title: 'Product-status transparency', body: 'Released capabilities, research, prototypes, plans, and in-development concepts are labeled separately.' },
    ], actions: [{ label: 'Explore the workspace', href: '/Routes/orbit-ai', primary: true }, { label: 'Contact Orbit', href: '/Routes/contact' }],
  },
  {
    path: '/Routes/architects', eyebrow: 'ARCHITECTURE / OPERATING PRINCIPLES', title: 'DESIGNED BY PEOPLE WHO SHIP.',
    description: 'How Orbit approaches product, safety, and delivery architecture without invented team profiles.',
    intro: 'Orbit is structured around clear boundaries, small systems, visible behavior, and human control.',
    sections: [
      { title: 'Product architecture', body: 'Compose focused tools around a shared workspace instead of forcing every task through one opaque surface.' },
      { title: 'Safety architecture', body: 'Bind permissions to the action, reveal consequential steps, and keep user review available.' },
      { title: 'Delivery architecture', body: 'Ship bounded capabilities, label their readiness, observe failures, and improve from evidence.' },
      { title: 'Clear ownership', body: 'Every system should have an understandable purpose, boundary, and path for correction.' },
      { title: 'Small systems', body: 'Prefer components that can be tested, replaced, and reasoned about without rebuilding the whole product.' },
      { title: 'Verifiable behavior', body: 'Expose sources, steps, errors, and results where that evidence helps a person assess the work.' },
      { title: 'Human control', body: 'Automation supports people; it does not transfer responsibility for consequential outcomes.' },
    ], actions: [{ label: 'Platform architecture', href: '/Routes/core', primary: true }, { label: 'Security', href: '/Routes/security' }],
  },
  {
    path: '/Routes/core', eyebrow: 'PLATFORM ARCHITECTURE / ORCHESTRATION', title: 'PULSAR ORCHESTRATOR.',
    description: 'A technical view of Orbit request routing, model access, agents, permissions, context, execution, and errors.',
    intro: 'A request moves through explicit layers so model choice, tools, context, execution, and review can evolve independently.',
    sections: [
      { title: 'Request routing', body: 'Classify the task, preserve the user’s instruction, and send the work to the relevant model or agent path.' },
      { title: 'Model access', body: 'Apply plan, provider availability, model mode, and routing policy without guaranteeing an external model version.' },
      { title: 'Agent coordination', body: 'Divide complex work into named roles and inspectable run steps.' },
      { title: 'Tool permissions', body: 'Grant only the tools required for the step and keep consequential actions visible.' },
      { title: 'Workspace context', body: 'Connect the request to permitted conversations, files, projects, and saved results.' },
      { title: 'Execution environments', body: 'Separate browser, server, sandbox, and desktop actions according to risk and capability.' },
      { title: 'Logging and error handling', body: 'Record useful operational events, distinguish expected failures, and return states a person or integration can act on.' },
      { title: 'Regional latency', body: 'Network distance, provider location, workload, and service state can affect response time. No universal latency is claimed.' },
    ], actions: [{ label: 'Developer API', href: '/Routes/DEV', primary: true }, { label: 'Orbit Agents', href: '/Routes/agents' }],
  },
  {
    path: '/Routes/network', eyebrow: 'SERVICE VISIBILITY / STATUS', title: 'NETWORK STATUS WITHOUT THE DRAMA.',
    description: 'Orbit service categories and an honest fallback when live status data is unavailable.',
    intro: 'Live status data is currently unavailable. Check the Orbit application or contact support.',
    notice: 'No uptime percentage or incident state is shown without a connected monitoring source.',
    sections: ['Marketing website', 'Orbit web application', 'Authentication', 'AI routing', 'Developer API', 'Agent runs', 'Billing', 'Downloads', 'Support'].map(title => ({ title, body: 'Live monitoring is not connected on this public status page. Use the linked service or contact support if you are experiencing a problem.' })),
    actions: [{ label: 'Open Orbit', href: external.app, primary: true }, { label: 'Contact support', href: '/Routes/support' }],
  },
  {
    path: '/Routes/security', eyebrow: 'TRUST / RESPONSIBLE DISCLOSURE', title: 'SECURITY AND RESPONSIBLE DISCLOSURE.',
    description: 'Orbit account controls, data access, tool safety, payment handling, deletion, and security disclosure guidance.',
    intro: 'Security is a set of maintained controls and honest boundaries—not a badge Orbit claims before it is independently confirmed.',
    notice: 'Orbit does not currently claim certifications that have not been independently completed and confirmed.',
    sections: [
      { title: 'Account controls', body: 'Use authenticated access, strong account credentials, revocable API keys, and connected-surface controls.' },
      { title: 'Transport and browser protections', body: 'Use encrypted transport and modern browser protections where the service is delivered.' },
      { title: 'Data access', body: 'Limit access to information required to provide, operate, support, and protect the service.' },
      { title: 'AI and tool safety', body: 'Treat generated output as fallible, scope permissions, reveal actions, and keep consequential review with the user.' },
      { title: 'Payment handling', body: 'Payment details should be handled by the relevant payment provider; do not send card details to Orbit support.' },
      { title: 'Account deletion', body: 'Use account controls or contact support to request deletion, subject to legal and operational retention requirements.' },
      { title: 'Incident response', body: 'Triage reports, contain confirmed issues, restore safe operation, and communicate when a user action is required.' },
      { title: 'Responsible disclosure', body: 'Send a clear report to security@orbitdev.org. Do not access other users’ data, degrade service, or use social engineering.' },
      { title: 'Scope and safe harbor', body: 'Good-faith research that avoids privacy harm, data destruction, service interruption, and unauthorized persistence can be reviewed through the disclosure channel.' },
    ], actions: [{ label: 'Report a security issue', href: 'mailto:security@orbitdev.org', primary: true }, { label: 'Get support', href: '/Routes/support' }],
  },
  {
    path: '/Routes/extension', eyebrow: 'BROWSER COMPANION / ACCOUNT LINKED', title: 'ORBIT EXTENSION PRO',
    description: 'Orbit Extension Pro provides readable page context and review-first browser assistance.',
    intro: 'Bring the current page and selected text into an Orbit conversation without treating the browser as permission to act without review.',
    notice: 'Orbit must not submit sensitive, financial, legal, medical, employment, school, or other consequential forms without direct user review and approval.',
    sections: [
      { title: 'Readable page context', body: 'Share readable page content with Orbit so questions can be grounded in the surface you are viewing.' },
      { title: 'Questions and selected text', body: 'Ask about the current page or attach a selection as focused context.' },
      { title: 'Review-first suggestions', body: 'Draft form content, inspect it, and decide what to enter. Orbit does not bypass approval for consequential submissions.' },
      { title: 'Private account-linked download', body: 'Access the release through the Extension Hub after signing in and confirming eligibility.' },
      { title: 'Connection flow', body: 'Sign in → open Extension Hub → subscribe or redeem access → download the private release → load the extension → connect the Orbit account.' },
    ], actions: [{ label: 'Extension Hub', href: external.extension, primary: true }, { label: 'Sign in', href: external.auth }, { label: 'Documentation', href: '/Routes/doc#browser-extension' }],
  },
  {
    path: '/Routes/careers', eyebrow: 'CAREERS / ORBIT LABS', title: 'BUILD WITH CARE.',
    description: 'Orbit careers, working principles, open role categories, application privacy, and contact.',
    intro: 'Orbit is interested in people who can move quickly without becoming careless about facts, users, or consequences.',
    sections: [
      { title: 'Mission', body: 'Build trusted intelligence for software, agents, and longer-term robotics research.' },
      { title: 'How Orbit works', body: 'Favor clear ownership, small systems, direct communication, verifiable behavior, and honest readiness labels.' },
      { title: 'Open positions', body: 'Current role categories are listed on the active careers page. Availability should be confirmed through the application contact.' },
      { title: 'Equal opportunity', body: 'Orbit aims to consider applicants fairly based on the requirements of the work and applicable law.' },
      { title: 'Application privacy', body: 'Send only information relevant to your application. Do not include passwords, identity documents, financial details, or other unnecessary sensitive data.' },
      { title: 'Contact', body: 'Questions and applications can be sent to apply@orbitdev.org.' },
    ], actions: [{ label: 'View active roles', href: '/Routes/Career', primary: true }, { label: 'Email careers', href: 'mailto:apply@orbitdev.org' }],
  },
  {
    path: '/Routes/press', eyebrow: 'PRESS / VERIFIED FACTS', title: 'THE SHORT VERSION OF ORBIT.',
    description: 'Verified Orbit AI company facts, product summary, official links, and press contact.',
    intro: 'Orbit AI is an AI workspace and research company building trusted intelligence for software, agents, and robotics.',
    sections: [
      { title: 'Company boilerplate', body: 'Orbit AI builds intelligent systems, AI assistants, developer tools, and Pro Pulsar language-model technology. Orbit Labs develops the Orbit workspace and pursues longer-term Pulsar V1 robotics research.' },
      { title: 'Product summary', body: 'The Orbit AI workspace supports chat, files, research, code, agents, automations, voice, and artifact creation across web and Windows desktop surfaces.' },
      { title: 'Project facts', body: 'Public product brand: Orbit AI. Operating name: Orbit Labs. Based in the Netherlands; business registration is pending. Primary website: orbitdev.org.' },
      { title: 'Official links', body: 'Use the primary website, Orbit application, documentation, GitHub repository, and Discord links published here.' },
      { title: 'Press contact', body: 'Send factual press inquiries to press@orbitdev.org.' },
      { title: 'Media placeholder', body: 'A downloadable press package is not currently published. Request the current approved assets from the press contact.', status: 'Coming soon' },
      { title: 'Brand usage', body: 'Do not imply endorsement, partnership, certification, or product availability. Keep Orbit AI and Orbit Labs naming accurate.' },
    ], actions: [{ label: 'Email press', href: 'mailto:press@orbitdev.org', primary: true }, { label: 'About Orbit', href: '/Routes/about' }],
  },
  {
    path: '/Routes/support', eyebrow: 'SUPPORT / PRACTICAL GUIDANCE', title: 'GET UNSTUCK FASTER.',
    description: 'Orbit product, account, billing, extension, service-health, and developer API support links.',
    intro: 'Start with the surface closest to the problem. If you write to support, include the action, expected result, actual result, and any non-sensitive error text.',
    notice: 'Never send passwords, recovery codes, API keys, payment-card details, or authentication secrets.',
    sections: [
      { title: 'Product guidance', body: 'Use the documentation for workspace capabilities, files, models, agents, voice, desktop, and routes.' },
      { title: 'Service health', body: 'The network page explains current visibility and how to proceed when live monitoring is unavailable.' },
      { title: 'Plans and payments', body: 'Open billing for subscription controls and read pricing for the distinction among plans, API tiers, and credit packs.' },
      { title: 'Sign-in and security', body: 'Use account settings for your own account. Report suspected security vulnerabilities through the security channel.' },
      { title: 'Browser companion', body: 'Review Extension Pro access, connection, page context, and form-safety guidance.' },
      { title: 'Developer API', body: 'Check authentication, request limits, credits, validation, and the common API statuses.' },
    ], actions: [{ label: 'Email support', href: 'mailto:support@orbitdev.org', primary: true }, { label: 'Documentation', href: '/Routes/doc' }, { label: 'Network status', href: '/Routes/network' }, { label: 'Billing', href: external.billing }, { label: 'Settings', href: external.settings }, { label: 'Extension', href: '/Routes/extension' }, { label: 'Privacy', href: '/Routes/privacy' }, { label: 'Orbit Rules', href: '/Routes/rules' }],
  },
]

export const roleCategories = ['Recruiter — Netherlands', 'LLM Trainer — Netherlands', 'Recruitment Manager — International', 'Social Media Manager — International', 'Social Media Manager — Netherlands']

export const blogPosts = [
  { slug: 'why-we-are-building-pulsar', title: 'Why We Are Building Pulsar', category: 'Pulsar', summary: 'Ambition needs honest labels. Pulsar connects long-term model research to the Orbit workspace without pretending research is a released product.', read: '5 min read', sections: [['Ambition with honest labels', 'Pulsar exists because model capability, infrastructure, and access deserve deeper work. That ambition only means something when Research, Prototype, Planned, and Available are kept distinct.'], ['Connection to the workspace', 'The workspace gives research a practical question: does this help someone understand, create, verify, or execute work more effectively?'], ['What Pulsar is not', 'Pulsar is not a claim that every planned model, cluster, or API is operating today. Orbit will not fill gaps with unsupported benchmarks.']] },
  { slug: 'how-we-think-about-trust-in-ai', title: 'How We Think About Trust in AI', category: 'Trust and safety', summary: 'Trust grows from transparent limits, careful access, and systems that keep people responsible for consequential decisions.', read: '6 min read', sections: [['Transparency', 'Capabilities and status labels should tell a person what is available, what depends on another service, and what remains research.'], ['Privacy and security', 'Access should follow the work, credentials should remain private, and deletion or revocation controls should be understandable.'], ['No false social proof', 'Trust is weakened by invented reviews, metrics, logos, or certifications. Orbit does not use them to decorate uncertainty.']] },
  { slug: 'building-ai-systems-that-work-with-people', title: 'Building AI Systems That Work With People', category: 'Engineering', summary: 'The useful question is not whether AI can act alone, but where people need context, review, and control.', read: '5 min read', sections: [['Human oversight', 'People define the goal, grant permissions, and remain responsible for decisions that affect others.'], ['Review by default', 'Agent steps, sources, tool actions, and final outputs should be available for inspection when the stakes warrant it.'], ['Honest limitations', 'Generated work can be incomplete or wrong. Good product design makes uncertainty actionable instead of hiding it.']] },
  { slug: 'inside-orbit-ais-ai-architecture', title: 'Inside Orbit AI’s AI Architecture', category: 'Engineering', summary: 'A composable architecture separates workspace context, model access, agents, tools, and execution environments.', read: '7 min read', sections: [['Composable tools', 'Focused components make it easier to constrain, observe, and replace a capability without obscuring the whole system.'], ['Reliability', 'Useful failures are explicit: authentication, quota, validation, permissions, provider access, and execution errors need different responses.'], ['Released product and research', 'The architecture can point toward future infrastructure while the interface still labels which components are available today.']] },
  { slug: 'the-future-of-ai-and-robotics', title: 'The Future of AI and Robotics', category: 'Robotics', summary: 'Moving from generated intelligence to physical action raises the standard for supervision, testing, and truthful product status.', read: '6 min read', sections: [['From intelligence to action', 'Physical systems turn a model suggestion into motion, energy, and real-world consequences. Interfaces must account for that difference.'], ['Safety and supervision', 'Bounded tests, clear overrides, observable state, and conservative failure behavior belong at the center of robotics research.'], ['Coming soon means in development', 'Orbit uses “coming soon” only for active development. Pulsar V1 remains an in-development concept, not a finished robot.']] },
] as const
