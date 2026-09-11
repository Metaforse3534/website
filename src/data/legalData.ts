export type LegalSection = { title: string; paragraphs: string[] }
export type LegalDocument = {
  path: string
  title: string
  description: string
  updated: string
  notice?: string
  sections: LegalSection[]
}

const updated = '9 September 2026'
const operator = 'Orbit Labs'
const support = 'support@orbitdev.org'
const security = 'security@orbitdev.org'
const prelaunch = `${operator} is the public name of an early-stage project awaiting business registration. It is not described here as an incorporated entity. Paid plans, purchases, subscriptions, and credit sales are currently unavailable.`
const contact = `Questions and legal or privacy requests may be sent to ${support}. Security reports may be sent to ${security}. Do not send passwords, recovery codes, API keys, full payment-card details, or unnecessary identity documents.`

export const legalDocuments: LegalDocument[] = [
  {
    path: '/Routes/terms', title: 'Terms of Service', description: 'Terms governing free pre-launch access to Orbit AI and related services.', updated, notice: prelaunch,
    sections: [
      { title: 'Agreement and scope', paragraphs: [`These Terms govern access to Orbit AI, its websites, applications, agents, developer features, connected tools, and related pre-launch services made available under the ${operator} name. By creating an account or using a service, you agree to these Terms and the policies incorporated into them.`, 'If you use Orbit for an organization, you confirm that you are authorized to accept these Terms for that organization. A separate written agreement controls if it expressly conflicts with these Terms.'] },
      { title: 'Pre-launch status', paragraphs: [prelaunch, 'Pre-launch functionality may be incomplete, changed, rate-limited, interrupted, or withdrawn. Research, prototype, beta, planned, in-development, and coming-soon labels are not promises of availability, performance, or release dates. Do not depend on pre-launch functionality for emergencies, safety-critical operations, or business continuity.'] },
      { title: 'Eligibility and age', paragraphs: ['You must be legally capable of entering this agreement. Orbit is not intended for children. Unless a higher age is required where you live, you must be at least 16 years old to create an account. A parent or lawful guardian must approve use where applicable law requires it.', 'Do not create an account for a person who cannot legally consent to the processing involved.'] },
      { title: 'Accounts and credentials', paragraphs: ['Provide accurate information, keep it current, and use only accounts you are authorized to control. You are responsible for reasonable protection of passwords, session tokens, recovery codes, API keys, and connected accounts.', 'Do not sell, transfer, share, or automate access to an account in a way that bypasses security or service limits. Notify support promptly if you suspect unauthorized access. Orbit may require verification or revoke credentials to protect users and systems.'] },
      { title: 'The service', paragraphs: ['Orbit may provide AI chat, file analysis, coding assistance, research tools, browser or desktop assistance, agents, automations, APIs, extensions, team features, and experimental systems. Features may rely on third-party models and infrastructure and may vary by account, device, location, or capacity.', 'Orbit may change or discontinue features for security, legal, operational, or product reasons. Where practical, material changes affecting ordinary use will be communicated through the service or another reasonable channel.'] },
      { title: 'Your content', paragraphs: ['You retain the rights you hold in prompts, files, instructions, feedback, and other content you submit. You grant the limited rights needed to host, reproduce, process, transmit, transform, and display that content to operate, secure, support, and improve the requested service in accordance with the Privacy Policy and your settings.', 'You must have all rights, permissions, and lawful bases needed to submit content. Do not submit content that is unlawful, infringes rights, breaches confidentiality, or contains personal data you are not authorized to process.'] },
      { title: 'AI output', paragraphs: ['AI-generated output may be inaccurate, incomplete, biased, outdated, unsafe, or unsuitable. Verify facts, sources, calculations, code, licenses, and important conclusions before relying on or publishing output.', 'Output is not professional legal, medical, financial, employment, or safety advice. You remain responsible for decisions, publications, deployments, and actions taken using output. Similar output may be generated for other users, and Orbit does not promise that output is unique or non-infringing.'] },
      { title: 'Agents, tools, and external actions', paragraphs: ['Agents, browser assistance, APIs, extensions, and connected tools may read information or take actions within the access you grant. Review scopes, recipients, destinations, files, and irreversible actions. Grant the minimum practical access and revoke access when it is no longer required.', 'You are responsible for actions you authorize and for complying with the rules of connected services. Do not use automation to conceal identity, bypass confirmation or access controls, create unauthorized transactions, or act outside a person’s or organization’s permission.'] },
      { title: 'Acceptable use', paragraphs: ['You must follow the Acceptable Use Policy, AI Usage Policy, and Orbit Rules. You may not use Orbit for unlawful activity, exploitation, violence, fraud, harassment, malware, credential theft, unauthorized access, privacy violations, infringement, service disruption, or evasion of safeguards.', 'Orbit may investigate suspected abuse using proportionate technical and human review. Enforcement may include warnings, output blocking, tool restrictions, rate limits, credential revocation, suspension, or termination.'] },
      { title: 'Third-party services', paragraphs: ['Third-party models, hosting providers, authentication systems, websites, applications, and integrations may have separate terms and privacy practices. Orbit does not control their availability, output, or policy changes and does not guarantee a particular provider or model version.', 'A link, connector, or compatibility reference does not imply endorsement, sponsorship, or affiliation.'] },
      { title: 'Intellectual property', paragraphs: ['Except for your content and applicable open-source components, Orbit and its licensors retain rights in the service, software, documentation, interfaces, research materials, and branding.', 'You may not copy, resell, sublicense, scrape, reverse engineer, interfere with, or create misleading derivatives of the service except where these Terms, applicable law, or an open-source license permits it.'] },
      { title: 'Free access and future paid services', paragraphs: ['No paid plan, subscription, credit purchase, or payment obligation is currently offered under these Terms. References to possible pricing or future plans are informational and do not create an offer.', 'Before accepting payment, Orbit will publish the applicable operator and registration information, prices, taxes, renewal and cancellation terms, withdrawal information, and additional commercial conditions. You will not be enrolled into a paid plan merely because you used the free pre-launch service.'] },
      { title: 'Suspension and termination', paragraphs: ['You may stop using Orbit and may request account deletion. Orbit may restrict or terminate access for a material or repeated breach, a security or legal risk, abuse, extended inactivity, or discontinuation of the pre-launch service.', 'Where reasonable and lawful, Orbit will provide notice and an opportunity to correct a breach or appeal an enforcement decision. Immediate restriction may be necessary to prevent harm, secure systems, or comply with law. Provisions that logically survive termination remain effective.'] },
      { title: 'Availability and disclaimers', paragraphs: ['To the extent permitted by law, the pre-launch service is provided on an “as available” basis without a promise that it will be uninterrupted, error-free, secure against every threat, or suitable for a particular purpose.', 'Nothing in these Terms excludes mandatory consumer rights or liability that cannot legally be excluded.'] },
      { title: 'Liability', paragraphs: ['To the extent permitted by applicable law, Orbit is not responsible for indirect, incidental, special, consequential, or lost-profit damages arising from pre-launch use, third-party systems, user content, or unreviewed AI output.', 'These limitations do not apply to fraud, intentional misconduct, death or personal injury caused by negligence, or another category that applicable law does not permit to be limited. No artificial liability cap is stated while the operating entity and commercial terms are still being finalized.'] },
      { title: 'Governing rules and disputes', paragraphs: ['These Terms are intended to operate under applicable Dutch and European Union law, without depriving consumers of mandatory protections available in their country of residence.', 'Contact support first so a concern can be investigated. A final court, jurisdiction, and formal complaints clause will be confirmed when the operating entity is registered; nothing here restricts a right to contact a competent regulator or court.'] },
      { title: 'Changes and contact', paragraphs: ['Orbit may update these Terms for product, security, operational, or legal reasons. Material changes will be communicated reasonably and will apply prospectively where required. The date above identifies the current version.', contact] },
    ],
  },
  {
    path: '/Routes/privacy', title: 'Privacy Policy', description: 'How personal data is handled across the Orbit AI pre-launch service.', updated,
    notice: `${prelaunch} The legal identity and registration details of the future operating entity will be added when registration is complete.`,
    sections: [
      { title: 'Who is responsible', paragraphs: [`The Orbit AI pre-launch service is currently operated under the ${operator} project name. The person presently operating the project determines why and how account and service data is processed and is the responsible controller where data-protection law applies. Requests can be sent to ${support}.`, 'Because business registration is pending, this notice does not claim that the controller is an incorporated company. It will be updated with the registered legal name, address, and registration details before paid services are enabled.'] },
      { title: 'Data collected', paragraphs: ['Depending on the features used, Orbit may process account and contact information; authentication, session, device, browser, IP, diagnostic, security, and usage events; support and feedback messages; API and integration activity; prompts, files, instructions, generated results, and tool events; consent choices; and deletion or access requests.', 'Recruitment forms may include contact details, location, professional links, CVs, cover notes, screening answers, consent records, and application status. Payments are disabled, and Orbit does not currently collect payment-card data through the service.'] },
      { title: 'Sources of data', paragraphs: ['Data is obtained from you, your device, systems you choose to connect, authorized members of an organization, security and authentication providers, and service providers needed to deliver a request.', 'Connected sources may return personal data. Connect only systems you are authorized to use and configure scopes carefully.'] },
      { title: 'Purposes', paragraphs: ['Data may be used to create and secure accounts; provide requested AI, file, agent, API, and connected-tool functionality; maintain conversation or workspace context; diagnose failures; prevent fraud and abuse; provide support; honor privacy choices; comply with law; and improve reliability, safety, accessibility, and usability.', 'Orbit will not use personal data for an incompatible purpose without an appropriate legal basis and any notice or permission required by law.'] },
      { title: 'Legal bases', paragraphs: ['Depending on the activity, processing may be necessary to provide the requested service or take steps at your request, comply with law, or pursue legitimate interests in operating, securing, debugging, and improving the service. Optional technologies or communications may rely on consent.', 'Where consent is the basis, it may be withdrawn for future processing. Withdrawal does not affect processing that was lawful before withdrawal.'] },
      { title: 'Prompts, files, and AI providers', paragraphs: ['Prompts, files, tool instructions, context, and outputs may be sent to infrastructure and model providers needed to perform the selected request. Submit only data you are authorized to use and avoid unnecessary personal or confidential information.', 'Provider availability, locations, and retention practices may differ. Orbit does not claim that every provider follows identical training or retention rules. A public provider notice will be maintained as production contracts are finalized.'] },
      { title: 'Model improvement', paragraphs: ['Pre-launch content must not be represented as excluded from all improvement activity unless that exclusion is technically and contractually confirmed. Any use of customer content for evaluation or improvement must follow disclosed settings, provider terms, contractual commitments, and applicable law.', 'Enterprise or confidential-data commitments require a written agreement and verified technical configuration.'] },
      { title: 'Recipients', paragraphs: ['Data may be disclosed to hosting, authentication, database, AI-processing, monitoring, communications, support, and security providers; connected services chosen by the user; professional advisers under confidentiality; and authorities where disclosure is legally required.', 'Orbit does not sell personal data. A merger, financing, reorganization, or transfer may involve data subject to appropriate confidentiality, notice, and legal safeguards.'] },
      { title: 'International transfers', paragraphs: ['Service providers may process data outside the Netherlands or European Economic Area. Where required, transfers must rely on an adequacy decision, approved contractual safeguards, or another lawful mechanism, together with supplementary safeguards where appropriate.', 'Transfer details will be expanded when the production provider list and contracts are finalized.'] },
      { title: 'Retention', paragraphs: ['Account and workspace data is retained while needed to provide the account and for a reasonable period afterward for deletion processing, security, backups, disputes, and legal obligations. Security logs may be retained for a limited period appropriate to investigation and abuse prevention.', 'Inactive recruitment applications and associated CVs are scheduled for deletion six months after the last application activity unless the applicant is hired, asks for earlier deletion, consents to longer retention, or law requires otherwise. Exact production retention schedules will be published as systems are finalized.'] },
      { title: 'Your rights', paragraphs: ['Depending on applicable law, you may request access, correction, deletion, restriction, portability, or objection and may withdraw consent. You may also lodge a complaint with the Dutch Data Protection Authority or another competent supervisory authority.', 'Orbit may need to verify a request and may retain data where law permits or requires it. Rights may have legal exceptions.'] },
      { title: 'How to make a request', paragraphs: [`Use account controls where available or email ${support}. Describe the relevant account or request without sending passwords, recovery codes, API keys, or identity documents unless a secure and necessary verification process is provided.`, 'Requests relating to an organization account may need to be coordinated with that organization where it is the controller.'] },
      { title: 'Security', paragraphs: [`Orbit applies technical and organizational measures appropriate to the pre-launch service and its risks, including access controls, credential protection, transport encryption, logging, dependency maintenance, and incident handling. No system can guarantee absolute security. Report suspected vulnerabilities to ${security}.`] },
      { title: 'Children', paragraphs: ['Orbit is not intended for children and does not knowingly seek children’s personal data. If you believe a child has provided data without valid authorization, contact support so it can be reviewed and removed where appropriate.'] },
      { title: 'Cookies and changes', paragraphs: ['The Cookie Policy explains browser storage and consent controls. Orbit may update this policy as systems, providers, registration details, or law change. Material changes will be communicated through reasonable channels.', contact] },
    ],
  },
  {
    path: '/Routes/cookies', title: 'Cookie Policy', description: 'Cookies, browser storage, consent choices, and similar technologies used by Orbit.', updated, notice: prelaunch,
    sections: [
      { title: 'Scope', paragraphs: ['This policy covers cookies, local storage, session storage, software-development-kit identifiers, and similar technologies used on Orbit websites and applications.'] },
      { title: 'Strictly necessary technologies', paragraphs: ['Necessary technologies may maintain security, authentication, load balancing, requested settings, fraud prevention, and consent records. They are used only where needed to provide a requested function or protect the service.'] },
      { title: 'Preferences', paragraphs: ['Optional preference storage may remember language, appearance, interface, or workflow choices. Where legally required, these technologies remain disabled until selected.'] },
      { title: 'Analytics', paragraphs: ['Optional analytics may measure aggregate traffic, performance, feature use, and failures. Non-essential analytics must not be activated before valid consent where consent is required. The consent interface must identify active categories and relevant providers.'] },
      { title: 'Marketing', paragraphs: ['Orbit does not currently describe pre-launch marketing tracking as active. If advertising or cross-site marketing technologies are introduced, they will remain disabled until valid consent where required and this policy will be updated first.'] },
      { title: 'Third parties', paragraphs: ['Authentication, hosting, embedded media, support, and connected services may use their own technologies when their surfaces are requested. Their practices are governed by their policies as well as applicable law.'] },
      { title: 'Your controls', paragraphs: ['Use Cookie settings in the footer to review or change optional choices. Rejecting optional technologies must be as accessible as accepting them. You may also block or delete storage through your browser, although blocking necessary storage can prevent sign-in or requested features.', 'Withdrawing consent applies prospectively and does not make earlier lawful processing unlawful.'] },
      { title: 'Cookie inventory and updates', paragraphs: ['The production cookie inventory should state each technology’s name, provider, purpose, category, and duration. It must be updated whenever deployed technologies change; policy wording alone must not substitute for an accurate technical inventory.', contact] },
    ],
  },
  {
    path: '/Routes/acceptable', title: 'Acceptable Use Policy', description: 'Prohibited and restricted uses of Orbit services, models, tools, and automation.', updated,
    sections: [
      { title: 'Lawful and authorized use', paragraphs: ['Use Orbit only for lawful purposes and only with systems, accounts, content, and data you are authorized to access. Do not instruct another person or agent to do something you are prohibited from doing yourself.'] },
      { title: 'Violence and dangerous wrongdoing', paragraphs: ['Do not use Orbit to facilitate violence, terrorism, exploitation, trafficking, self-harm encouragement, weapons misuse, or instructions that materially enable dangerous wrongdoing. Legitimate safety, prevention, news, and research contexts must use proportionate safeguards.'] },
      { title: 'Sexual exploitation and minors', paragraphs: ['Do not create, solicit, transform, distribute, or facilitate sexual exploitation, non-consensual intimate content, sexual content involving minors, grooming, or attempts to sexualize a person who may be a minor.'] },
      { title: 'Security abuse and malware', paragraphs: ['Do not deploy malware, steal credentials, evade access controls, gain unauthorized access, scan without permission, disrupt services, conceal abusive persistence, or exploit vulnerabilities outside an authorized testing scope. Good-faith research must follow the Security Policy.'] },
      { title: 'Privacy and surveillance', paragraphs: ['Do not unlawfully collect, expose, infer, identify, track, or trade personal data. Do not use Orbit for covert surveillance, biometric categorization, emotion inference, or sensitive profiling where prohibited or without required notice, authority, and safeguards.'] },
      { title: 'Fraud and deception', paragraphs: ['Do not impersonate people or organizations, fabricate authority or evidence, run scams, manipulate reviews, conduct phishing, hide material AI use where disclosure is required, or create deceptive synthetic media intended to cause harm.'] },
      { title: 'Harassment and discrimination', paragraphs: ['Do not use Orbit to target people with threats, stalking, severe harassment, hateful abuse, or unlawful discrimination. Do not make prohibited decisions based on protected or highly sensitive characteristics.'] },
      { title: 'Consequential decisions', paragraphs: ['Do not use unreviewed AI output as the sole basis for legal, medical, financial, employment, education, housing, insurance, credit, law-enforcement, migration, or other high-impact decisions. Apply qualified human review and all required rights, notices, testing, and appeal mechanisms.'] },
      { title: 'Intellectual property and authenticity', paragraphs: ['Do not infringe intellectual-property, confidentiality, publicity, database, or contractual rights. Do not remove provenance or machine-readable AI markings for deceptive purposes.'] },
      { title: 'Service integrity', paragraphs: ['Do not bypass rate limits, model restrictions, safety systems, account controls, geographic controls, or usage measurement; resell unauthorized access; scrape the service; manipulate credits; overload infrastructure; or interfere with other users.'] },
      { title: 'Enforcement and appeals', paragraphs: ['Orbit may block a request, limit tools, revoke credentials, suspend accounts, preserve relevant evidence, or report unlawful activity where appropriate. Enforcement should be proportionate to severity, recurrence, intent, and risk.', `To report abuse or challenge an enforcement decision, contact ${support}. Provide relevant context without sending secrets or unrelated personal data.`] },
    ],
  },
  {
    path: '/Routes/ai-usage', title: 'AI Usage Policy', description: 'Responsible-use and transparency requirements for AI output, agents, and tools.', updated,
    sections: [
      { title: 'Know when AI is involved', paragraphs: ['Orbit interfaces should make it clear when a person is interacting with an AI system unless that fact is obvious in context. Do not present an AI agent as a human representative.'] },
      { title: 'Review output', paragraphs: ['Treat output as a fallible draft. Verify facts, sources, calculations, code, security assumptions, licenses, and audience impact before relying on it.'] },
      { title: 'Keep people responsible', paragraphs: ['A person or authorized organization must remain responsible for consequential decisions, permissions, publications, and executed work. AI must not be used to avoid accountability.'] },
      { title: 'Agents and connected tools', paragraphs: ['Scope instructions, grant minimal access, monitor meaningful steps, use approval gates for consequential actions, and stop a run when its assumptions, recipient, or target are wrong.'] },
      { title: 'Synthetic-content disclosure', paragraphs: ['Preserve machine-readable provenance or markings provided with generated content. Clearly disclose generated or materially manipulated content where law, professional duties, platform rules, or audience expectations require it, including applicable deepfake and public-interest information contexts.'] },
      { title: 'Professional and high-impact use', paragraphs: ['AI output does not replace a qualified professional. High-impact uses require lawful authority, validated systems, appropriate records, human oversight, understandable notice, and a meaningful way to contest decisions.'] },
      { title: 'Testing and deployment', paragraphs: ['Before deploying generated code, agents, or workflows, test in an appropriate environment, protect secrets, review dependencies, limit privileges, plan rollback, and monitor results.'] },
      { title: 'Prohibited uses', paragraphs: ['The Acceptable Use Policy applies to every model, agent, automation, API, extension, file, integration, and output available through Orbit.'] },
    ],
  },
  {
    path: '/Routes/ai-transparency', title: 'AI Transparency Notice', description: 'How Orbit identifies AI interactions and generated or manipulated content.', updated,
    notice: 'This notice describes the transparency direction for the pre-launch service. Technical marking and provider-specific documentation remain subject to production verification.',
    sections: [
      { title: 'AI interaction', paragraphs: ['Orbit is an AI service. Chat, agent, generation, analysis, and assistance surfaces use automated models unless the interface clearly says otherwise. Support communications may involve automation but must not misleadingly present a machine as a human.'] },
      { title: 'Generated content', paragraphs: ['Text, code, images, audio, video, summaries, and actions may be generated or materially assisted by AI. Users should assess whether visible disclosure is required for the intended audience and context.'] },
      { title: 'Machine-readable marking', paragraphs: ['Where applicable, Orbit intends to preserve or apply technically feasible, interoperable, robust, and detectable markings to synthetic outputs. Users must not remove provenance information in order to deceive or evade legal disclosure.'] },
      { title: 'Deepfakes and public-interest content', paragraphs: ['A person publishing generated or manipulated audio, image, or video that could appear authentic must provide clear disclosure where applicable law requires it. Similar disclosure may apply to AI-generated text published to inform the public on matters of public interest, subject to legal exceptions such as meaningful editorial review and responsibility.'] },
      { title: 'Limitations', paragraphs: ['Detection and provenance technologies are imperfect. Absence of a detectable mark does not prove that content is human-made, and presence of a mark does not prove every factual claim is correct.'] },
      { title: 'Questions', paragraphs: [contact] },
    ],
  },
  {
    path: '/Routes/rules', title: 'Orbit Rules', description: 'Plain-language rules for safe, lawful, and reliable use of Orbit.', updated,
    sections: [
      { title: 'Use only what you are allowed to use', paragraphs: ['Access only accounts, systems, files, and data you own or have permission to use. Permission must cover the action you ask Orbit to perform.'] },
      { title: 'Protect credentials and private information', paragraphs: ['Never expose passwords, authentication codes, private keys, recovery codes, payment details, or unrelated personal information. Revoke exposed credentials immediately.'] },
      { title: 'Review before consequential action', paragraphs: ['Check the recipient, destination, scope, amount, file, and effect before sending, publishing, deleting, purchasing, deploying, or changing an external system.'] },
      { title: 'Keep humans accountable', paragraphs: ['Do not delegate legal responsibility, professional judgment, or high-impact decisions to an AI system. A responsible person must be able to understand, stop, and correct the work.'] },
      { title: 'Do not cause harm', paragraphs: ['Do not use Orbit for violence, exploitation, harassment, dangerous wrongdoing, illegal discrimination, or encouragement of self-harm.'] },
      { title: 'Do not deceive', paragraphs: ['Do not impersonate others, fabricate evidence or endorsements, manipulate reviews, hide material synthetic media, phish, scam, or misrepresent AI as a human.'] },
      { title: 'Do not attack systems', paragraphs: ['Do not deploy malware, steal credentials, evade access controls, scan without authorization, persist after permission ends, or disrupt services.'] },
      { title: 'Respect creators and confidential work', paragraphs: ['Use only content you may lawfully process. Respect intellectual-property, license, confidentiality, publicity, and database rights.'] },
      { title: 'Do not abuse Orbit', paragraphs: ['Do not bypass limits or safety controls, resell unauthorized access, scrape the service, manipulate billing or credits, overload infrastructure, or conceal abusive automation.'] },
      { title: 'Stop when uncertain', paragraphs: [`If an instruction, permission, identity, target, or legal basis is unclear, stop before acting and ask the responsible person or contact ${support}.`] },
    ],
  },
  {
    path: '/Routes/refund', title: 'Payments, Cancellation and Refunds', description: 'The current status of paid services and the rules that will apply before billing launches.', updated,
    notice: 'Payments are currently disabled. Orbit does not presently offer paid subscriptions or credit purchases through the pre-launch service.',
    sections: [
      { title: 'Current payment status', paragraphs: ['No paid subscription, automatic renewal, credit purchase, or payment-card collection is currently available. A displayed future price, plan, or feature is not an active offer and cannot create a charge.'] },
      { title: 'No automatic conversion', paragraphs: ['A free pre-launch account will not automatically become paid. Enabling a future paid plan will require clear pricing and an affirmative purchase step.'] },
      { title: 'Before paid services launch', paragraphs: ['Orbit will publish the registered operator, contact and registration details, total prices and taxes, plan duration, renewal, cancellation, delivery, complaint handling, refund conditions, and applicable statutory withdrawal information before accepting payment.'] },
      { title: 'Consumer withdrawal', paragraphs: ['Where consumers have a statutory withdrawal right, Orbit will provide the required pre-contract information, model withdrawal form, and accessible online cancellation function. Any request to begin digital performance during the withdrawal period will use the consent and acknowledgment required by law.'] },
      { title: 'Unexpected charge', paragraphs: [`Orbit does not expect to originate charges while payments are disabled. If you believe a charge refers to Orbit, contact ${support} with the date, amount, account email, and a non-sensitive transaction reference. Never send a full card number.`] },
      { title: 'Future updates', paragraphs: ['This page will be replaced or expanded before billing is activated. No future refund restriction stated here overrides mandatory consumer rights.'] },
    ],
  },
  {
    path: '/Routes/dpa', title: 'Data Processing Agreement', description: 'Pre-launch information about future business processing terms.', updated,
    notice: 'A production DPA is not currently offered for signature. Business customers should not upload regulated, sensitive, or production personal data without a separate written agreement.',
    sections: [
      { title: 'Current status', paragraphs: ['Orbit is in pre-launch and awaiting business registration. This page is an outline of intended processing commitments, not a signed Article 28 data-processing agreement.'] },
      { title: 'Intended roles', paragraphs: ['For a future business service where a customer determines the purposes and means of processing and Orbit processes data only to provide that service, the customer would normally act as controller and the registered Orbit operator as processor. Orbit may separately act as controller for account, security, billing, and legal operations.'] },
      { title: 'Required production schedule', paragraphs: ['A production DPA must identify the parties and include the subject matter, duration, nature, purposes, data types, data-subject categories, documented instructions, confidentiality, security, subprocessors, assistance, incident notice, deletion or return, transfers, and audit terms.'] },
      { title: 'No enterprise assurance by implication', paragraphs: ['Marketing references to teams, private deployment, security, or enterprise use do not create a DPA, service level, certification, or regulated-data commitment. Those commitments require verified controls and a written agreement.'] },
      { title: 'Requesting future terms', paragraphs: [`Organizations may contact ${support} to discuss requirements. Do not send production personal data as part of an inquiry.`] },
    ],
  },
  {
    path: '/Routes/subprocessors', title: 'Subprocessors and Service Providers', description: 'How third-party infrastructure and AI providers will be disclosed.', updated,
    notice: 'The production provider inventory is still being verified. This page is not a complete contractual subprocessor list until named providers, locations, purposes, and links are published.',
    sections: [
      { title: 'Provider categories', paragraphs: ['Orbit may rely on providers for hosting, databases, authentication, AI inference, file processing, monitoring, communications, support, security, and—after launch—payments.'] },
      { title: 'Required inventory', paragraphs: ['Before enterprise or production processing is offered, the inventory should identify each provider, processing purpose, relevant location, and privacy or security information. It should distinguish subprocessors used for customer content from independent controllers and optional user-selected integrations.'] },
      { title: 'Changes', paragraphs: ['Material changes should be posted before or promptly after they take effect as required by the applicable agreement, with a reasonable objection process where contractually required.'] },
      { title: 'Contact', paragraphs: [contact] },
    ],
  },
  {
    path: '/Routes/legal-notice', title: 'Legal Notice', description: 'Current operator and contact information for the Orbit AI pre-launch project.', updated, notice: prelaunch,
    sections: [
      { title: 'Project name', paragraphs: [`Orbit AI is a technology project currently operated under the public name ${operator}. The name is used as a project and brand name and is not presented as proof of incorporation, KVK registration, or VAT registration.`] },
      { title: 'Registration status', paragraphs: ['Dutch business registration is pending. No KVK number, VAT identification number, or incorporated-company status is claimed on this website. Those details will be added only after they are issued and verified.'] },
      { title: 'Commercial status', paragraphs: ['Payments, paid subscriptions, and credit sales are disabled. Free pre-launch accounts may be available subject to the Terms of Service.'] },
      { title: 'Contact', paragraphs: [`General, support, privacy, and legal inquiries: ${support}. Security reports: ${security}.`, 'A complete registered name, physical address, registered office, KVK number, VAT identification number, and formal complaints information will be published before commercial services launch where required.'] },
      { title: 'No affiliation', paragraphs: ['Orbit AI is an independent project. References to third-party companies, products, models, platforms, or trademarks describe compatibility or context and do not imply affiliation, endorsement, or sponsorship.'] },
    ],
  },
  {
    path: '/Routes/copyright', title: 'Copyright and Infringement Policy', description: 'Ownership, permitted use, and reporting of alleged infringement.', updated,
    sections: [
      { title: 'Orbit materials', paragraphs: ['Unless another notice or license applies, website copy, interface design, documentation, original graphics, software, and other Orbit materials are protected by applicable intellectual-property law. All rights not expressly granted are reserved.'] },
      { title: 'User and third-party content', paragraphs: ['Users retain the rights they hold in submitted content. Third-party materials remain subject to their owners’ rights and applicable licenses. Availability through an AI system does not prove that a proposed use is permitted.'] },
      { title: 'Permitted use', paragraphs: ['You may view and use public materials for their intended purpose and may use open-source components under their published licenses. Do not reproduce, sell, remove notices from, or misleadingly present Orbit materials as your own unless permission or law allows it.'] },
      { title: 'Reporting infringement', paragraphs: [`Send a notice to ${support} identifying the protected work, the specific URL or material, your contact information, the basis for your claim, and a good-faith statement that the disputed use is not authorized. Do not include unrelated personal data.`, 'Orbit may request verification, notify the affected user, restrict material, or restore material where a claim is incomplete or successfully challenged. Knowingly false reports may have legal consequences.'] },
      { title: 'Repeat abuse', paragraphs: ['Accounts repeatedly used for infringement may be restricted or terminated after considering context, valid disputes, and applicable law.'] },
    ],
  },
  {
    path: '/Routes/trademark', title: 'Trademark and Brand Policy', description: 'Rules for referring to Orbit names, logos, and product identity.', updated,
    sections: [
      { title: 'Orbit names and marks', paragraphs: ['Orbit AI, Orbit Labs, related product names, logos, and distinctive brand elements may be protected as trade names, trademarks, or other source identifiers where applicable. Publication of this policy does not claim a registration that has not been obtained.'] },
      { title: 'Fair reference', paragraphs: ['You may truthfully refer to Orbit products to describe compatibility, commentary, news, education, or community work, provided the reference does not imply endorsement, partnership, certification, or official status.'] },
      { title: 'Prohibited uses', paragraphs: ['Do not use a confusingly similar name, logo, domain, account identity, application icon, or presentation; do not impersonate Orbit; and do not use Orbit branding in scams, malware, misleading advertising, or unauthorized merchandise.'] },
      { title: 'Community projects', paragraphs: ['Clearly label unofficial integrations, tutorials, communities, and extensions as independent. Use your own primary branding and avoid copying the Orbit site or application interface in a way that could confuse users.'] },
      { title: 'Permission and reports', paragraphs: [`Contact ${support} for brand permission or to report confusing use. Include the relevant URL and context.`] },
    ],
  },
  {
    path: '/Routes/open-source', title: 'Open Source Notices', description: 'How open-source licenses apply to Orbit software and dependencies.', updated,
    sections: [
      { title: 'Licensed components', paragraphs: ['Orbit software may include third-party and project-owned components released under open-source licenses. Each component remains governed by its applicable license and notices.'] },
      { title: 'Repository licenses', paragraphs: ['A public repository does not automatically place every file in the public domain. Review the license file, package metadata, notices, and file-level headers for the specific version and component you intend to use.'] },
      { title: 'Attribution and source obligations', paragraphs: ['You are responsible for preserving required notices, providing attribution, sharing source, or applying reciprocal terms where the relevant license requires it.'] },
      { title: 'No trademark license', paragraphs: ['An open-source software license does not grant permission to use Orbit names, logos, or branding except where the license or applicable law expressly provides otherwise.'] },
      { title: 'Corrections', paragraphs: [`Report missing or inaccurate notices to ${support} with the component name and version.`] },
    ],
  },
  {
    path: '/Routes/accessibility', title: 'Accessibility Statement', description: 'Orbit’s approach to accessible websites and applications.', updated,
    notice: 'Orbit is in active pre-launch development. This statement describes the current commitment and reporting process; it is not a claim of independent certification or complete conformance.',
    sections: [
      { title: 'Commitment', paragraphs: ['Orbit aims to make its websites and applications usable by people with diverse abilities, devices, input methods, and assistive technologies. Accessibility is considered in design, development, content, and testing.'] },
      { title: 'Standards direction', paragraphs: ['Orbit uses WCAG 2.2 Level AA as a practical design and testing target where applicable. This is a target, not a certification claim. Applicable European accessibility requirements will be assessed before commercial launch.'] },
      { title: 'Current limitations', paragraphs: ['Pre-launch or experimental AI interfaces, complex visualizations, generated content, third-party embeds, desktop automation, and rapidly changing features may contain accessibility barriers. Some generated content may require user review or alternative formatting.'] },
      { title: 'Supported practices', paragraphs: ['Work includes semantic structure, keyboard operation, visible focus, readable contrast and text sizing, reduced-motion support, labels and status messages, responsive layouts, and alternatives for meaningful media where practical.'] },
      { title: 'Feedback', paragraphs: [`Report an accessibility problem to ${support}. Include the page or feature, the barrier, assistive technology or browser if relevant, and a preferred contact method. Do not include unnecessary medical information.`, 'Orbit will review reports, prioritize barriers by impact, and provide an alternative method where reasonably possible.'] },
    ],
  },
  {
    path: '/Routes/security-policy', title: 'Security and Responsible Disclosure', description: 'How to report vulnerabilities and conduct authorized security research.', updated,
    sections: [
      { title: 'Reporting', paragraphs: [`Send suspected vulnerabilities to ${security}. Include the affected service, reproduction steps, impact, relevant logs or screenshots, and a safe contact method. Do not include credentials or unrelated user data.`] },
      { title: 'Safe research', paragraphs: ['Use only accounts and data you own or are authorized to test. Avoid privacy violations, social engineering, denial of service, physical attacks, malware persistence, mass scanning, destructive actions, and access beyond what is necessary to demonstrate the issue.'] },
      { title: 'Stop conditions', paragraphs: ['Stop testing and report immediately if you encounter another person’s data, gain unintended persistent access, affect service availability, or risk causing harm. Delete retained data securely after the report is resolved or when instructed lawfully.'] },
      { title: 'Good-faith handling', paragraphs: ['Orbit intends to review good-faith reports, acknowledge them when practical, investigate proportionately, and avoid pursuing action against research that follows this policy and applicable law. This is not authorization for conduct that violates law or third-party rights.'] },
      { title: 'Disclosure coordination', paragraphs: ['Allow reasonable time to investigate and remediate before public disclosure. Do not demand payment, threaten disclosure, or retain access as leverage. No bounty or payment is promised unless a written program expressly offers one.'] },
      { title: 'Out of scope', paragraphs: ['Reports limited to missing best-practice headers without practical impact, automated noise, rate limits without bypass or harm, self-XSS, unsupported software, or third-party services may be closed without action.'] },
    ],
  },
]
