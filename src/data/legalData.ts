export type LegalSection = { title: string; paragraphs: string[] }
export type LegalDocument = { path: string; title: string; description: string; updated: string; sections: LegalSection[] }

const contact = 'Questions about these terms may be sent to support@orbitdev.org. Privacy and data-rights requests may be sent through the same support channel.'

export const legalDocuments: LegalDocument[] = [
  {
    path: '/Routes/terms', title: 'Terms of Service', description: 'Terms governing access to and use of Orbit AI services.', updated: '5 September 2026',
    sections: [
      { title: 'Agreement and eligibility', paragraphs: ['These Terms govern your access to Orbit AI services provided by Orbit Systems B.V. By creating an account or using the service, you agree to them. If you use Orbit for an organization, you represent that you may bind that organization.', 'You must be legally able to enter this agreement and meet any minimum age required by applicable law. The service is not directed to children.'] },
      { title: 'Accounts and access', paragraphs: ['Provide accurate account information, protect your credentials, and notify Orbit if you suspect unauthorized access. You are responsible for activity performed through your account unless applicable law provides otherwise.', 'Do not share passwords, recovery codes, session tokens, or API keys. Orbit may require verification or restrict access when needed to protect users or the service.'] },
      { title: 'Orbit service', paragraphs: ['Orbit provides an AI workspace, agents, developer tools, connected surfaces, and related research or beta experiences. Individual capabilities, models, integrations, and limits may change.', 'A Research, Prototype, Planned, In development, Beta, or Coming soon label does not promise general availability or a release date.'] },
      { title: 'User content', paragraphs: ['You retain rights you have in prompts, files, instructions, and other content you submit. You grant Orbit the limited rights needed to host, process, transmit, and display that content to provide, secure, support, and improve the service as described in the Privacy Policy.', 'You must have the rights and permissions needed to submit content and must not use the service to violate another person’s rights or applicable law.'] },
      { title: 'AI output and actions', paragraphs: ['AI output can be inaccurate, incomplete, outdated, or unsuitable. Review output before relying on, publishing, or acting on it. You are responsible for consequential decisions and for evaluating whether professional advice is required.', 'Similar output may be produced for different users. Orbit does not promise that generated output is unique, non-infringing, or fit for a particular purpose.'] },
      { title: 'Connected tools and automation', paragraphs: ['Connected tools, agents, browser assistance, and desktop actions operate within granted access and may affect external systems. Review permissions, targets, and proposed actions. Do not use automation to bypass confirmation, authorization, or safety controls.', 'You remain responsible for actions you approve and for configuring integrations safely. Third-party systems may impose additional terms.'] },
      { title: 'Acceptable use', paragraphs: ['Do not use Orbit for unlawful activity, abuse, fraud, harassment, exploitation, malware, unauthorized access, credential theft, evasion of safeguards, service disruption, or infringement. Do not use the service to make prohibited high-impact decisions without legally required safeguards and meaningful human review.', 'The Acceptable Use Policy and AI Usage Policy form part of these Terms.'] },
      { title: 'Plans, credits, and payment', paragraphs: ['Paid plans, API access, and credits may have separate prices, quotas, and fair-use limits. Prices and availability may change prospectively. Applicable taxes may be added.', 'Credits are usage units rather than money, deposits, or stored value. Current product descriptions may call certain credits non-expiring, subject to these Terms, account closure, abuse controls, and changes required by law.'] },
      { title: 'Renewal, cancellation, and refunds', paragraphs: ['Subscriptions renew according to the checkout terms until canceled. Cancel through the available billing controls before renewal to avoid future charges. Cancellation normally applies at the end of the paid period.', 'Refund eligibility is described in the Refund Policy and may also be required by mandatory consumer law.'] },
      { title: 'Third-party services', paragraphs: ['Orbit may rely on model providers, hosting, payments, communications, and other third parties. Their services can change, fail, or impose their own terms. Orbit does not guarantee a particular external model or version.', 'Links to third-party services are provided for convenience and do not imply endorsement or partnership.'] },
      { title: 'Intellectual property', paragraphs: ['Orbit and its licensors retain rights in the service, software, branding, documentation, and related materials, excluding user content and applicable open-source components.', 'You may not copy, sell, reverse engineer, disrupt, or misuse the service except as permitted by law or an applicable open-source license.'] },
      { title: 'Beta and research features', paragraphs: ['Beta, research, prototype, and in-development features may be incomplete, unavailable, or withdrawn. Use them only with risks appropriate to their status and do not treat research descriptions as product warranties.'] },
      { title: 'Suspension and termination', paragraphs: ['You may stop using the service and may request account deletion. Orbit may restrict or terminate access for material breach, security risk, abuse, legal requirements, nonpayment, or protection of the service and others.', 'Where practical and lawful, Orbit will provide notice or an opportunity to remedy. Provisions that by their nature should survive termination remain effective.'] },
      { title: 'Disclaimers, liability, and disputes', paragraphs: ['To the extent permitted by law, the service is provided without warranties that it will be uninterrupted, error-free, or suitable for every use. Nothing in these Terms excludes rights or liability that cannot legally be excluded.', 'To the extent permitted by law, Orbit is not liable for indirect, incidental, special, consequential, or lost-profit damages. Any applicable aggregate cap and dispute forum must be interpreted under mandatory law and the specific commercial agreement, if one applies.'] },
      { title: 'Changes and contact', paragraphs: ['Orbit may update these Terms to reflect product, legal, or operational changes. Material changes will be communicated through reasonable channels and apply prospectively as required by law.', contact] },
    ],
  },
  {
    path: '/Routes/privacy', title: 'Privacy Policy', description: 'How Orbit Systems B.V. processes personal data in connection with Orbit AI.', updated: '5 September 2026',
    sections: [
      { title: 'Controller', paragraphs: ['Orbit Systems B.V., Netherlands, is the controller for personal data processed through the public website and Orbit services unless a separate agreement states that Orbit acts as a processor.'] },
      { title: 'Data processed', paragraphs: ['Orbit may process account and contact details, authentication and security events, subscription and transaction references, device and usage data, support messages, API activity, prompts, files, agent instructions, generated results, and connected-tool events.', 'Do not submit unnecessary sensitive information. The categories processed depend on the features you use.'] },
      { title: 'Purposes', paragraphs: ['Data is processed to provide and personalize the service, authenticate users, execute requests, maintain context, process payments, provide support, prevent abuse, secure systems, comply with law, communicate service information, and improve reliability and usability.'] },
      { title: 'Legal bases', paragraphs: ['Depending on the context, processing may rely on performance of a contract, legitimate interests in operating and securing the service, compliance with legal obligations, or consent. Where consent applies, it may be withdrawn prospectively.'] },
      { title: 'AI content', paragraphs: ['Prompts, files, tool instructions, and outputs may be sent to infrastructure needed to perform the request. Content can contain personal data, so submit only material you are authorized to use.', 'Orbit does not promise that AI output is accurate or free of personal information supplied by the user or returned by a connected source.'] },
      { title: 'AI providers and training', paragraphs: ['Orbit may use external AI providers when a selected model, routing mode, or product feature requires them. Provider availability changes. Any use of customer content for model improvement must follow the applicable product settings, provider terms, contracts, and law.', 'This policy does not claim that every provider uses identical retention or training rules. Enterprise requirements should be confirmed before use.'] },
      { title: 'Service providers and payments', paragraphs: ['Orbit may use service providers for hosting, authentication, analytics, support, communications, monitoring, and payment processing. Payment-card data should be submitted only through the payment provider’s interface.'] },
      { title: 'Transfers and retention', paragraphs: ['Providers may process data outside the Netherlands or European Economic Area. Where required, Orbit uses an applicable transfer mechanism and evaluates safeguards.', 'Data is retained only as long as reasonably needed for the purposes described, legal obligations, disputes, security, backups, and enforcement. Retention differs by data type and product configuration.'] },
      { title: 'User rights', paragraphs: ['Depending on applicable law, you may request access, correction, deletion, restriction, portability, or objection, and may withdraw consent. You may also complain to a competent supervisory authority.', 'Orbit may verify identity and may retain information where required or permitted by law.'] },
      { title: 'Requests and deletion', paragraphs: ['Use account settings where available or contact support@orbitdev.org. Describe the account and request without sending passwords, recovery codes, API keys, or identity documents unless Orbit provides a secure and necessary verification process.'] },
      { title: 'Security and children', paragraphs: ['Orbit applies technical and organizational measures appropriate to the service and risk, but no system can guarantee absolute security. Report suspected vulnerabilities to security@orbitdev.org.', 'Orbit is not intended for children and does not knowingly seek children’s personal data.'] },
      { title: 'Cookies, changes, and contact', paragraphs: ['The Cookie Policy explains browser storage and similar technologies. Orbit may update this policy and will publish the effective version with a new date.', contact] },
    ],
  },
  {
    path: '/Routes/cookies', title: 'Cookie Policy', description: 'How Orbit uses cookies and similar browser technologies.', updated: '6 September 2026',
    sections: [
      { title: 'Scope', paragraphs: ['This policy covers cookies, local storage, and similar browser technologies used on Orbit websites and applications.'] },
      { title: 'Essential storage', paragraphs: ['Essential technologies can maintain authentication, security, load balancing, consent choices, and settings required for the requested service. They are not used as a substitute for permission where consent is legally required.'] },
      { title: 'Preferences and measurement', paragraphs: ['Optional storage may remember interface preferences or help Orbit understand aggregate site performance. Optional categories should not be activated before required consent.'] },
      { title: 'Third parties', paragraphs: ['Authentication, hosting, payments, media, and other integrations may set or read data under their own policies when their surface is used.'] },
      { title: 'Controls', paragraphs: ['Use the Orbit consent panel when it first appears, or choose Cookie settings in the website footer at any time. Optional preferences, analytics, and marketing categories remain disabled unless selected. Browser controls can also block or delete storage. Blocking essential storage can prevent sign-in or other requested functions.'] },
      { title: 'Changes and contact', paragraphs: ['The current policy date appears above. Orbit may revise the categories as the service changes.', contact] },
    ],
  },
  {
    path: '/Routes/acceptable', title: 'Acceptable Use Policy', description: 'Rules that protect Orbit users, systems, and the public.', updated: '5 September 2026',
    sections: [
      { title: 'Lawful and authorized use', paragraphs: ['Use Orbit only for lawful purposes and only with content, systems, accounts, and data you are authorized to access.'] },
      { title: 'Safety and harm', paragraphs: ['Do not use Orbit to facilitate violence, exploitation, self-harm, dangerous wrongdoing, harassment, discrimination, or evasion of legitimate safety controls.'] },
      { title: 'Security abuse', paragraphs: ['Do not distribute malware, steal credentials, gain unauthorized access, scan without authorization, degrade service, conceal abusive automation, or retain access after permission ends. Good-faith research must follow the responsible disclosure guidance.'] },
      { title: 'Privacy and identity', paragraphs: ['Do not unlawfully collect, expose, infer, or trade personal data. Do not impersonate others or create deceptive content intended to defraud.'] },
      { title: 'Consequential domains', paragraphs: ['Do not rely on unreviewed AI output for legal, medical, financial, employment, education, housing, insurance, law-enforcement, or other high-impact decisions. Apply qualified human review and all required safeguards.'] },
      { title: 'Enforcement and reporting', paragraphs: ['Orbit may limit or suspend use that creates risk, violates these rules, or threatens the service. Report abuse to support@orbitdev.org and security issues to security@orbitdev.org.'] },
    ],
  },
  {
    path: '/Routes/ai-usage', title: 'AI Usage Policy', description: 'Responsible use requirements for Orbit AI output, agents, tools, and automation.', updated: '5 September 2026',
    sections: [
      { title: 'Review output', paragraphs: ['Treat model output as a fallible draft. Check sources, calculations, code, licenses, factual claims, and audience impact before use.'] },
      { title: 'Keep people responsible', paragraphs: ['A person or authorized organization must remain responsible for consequential decisions, permissions, and published or executed work.'] },
      { title: 'Agents and tools', paragraphs: ['Scope agent instructions, grant the minimum practical access, inspect meaningful steps, and stop a run when its assumptions or target are wrong.'] },
      { title: 'Browser and desktop actions', paragraphs: ['Review forms, recipients, files, destinations, and irreversible actions. Do not submit sensitive or consequential forms without direct user approval.'] },
      { title: 'Disclosure and attribution', paragraphs: ['Disclose material AI involvement where law, professional standards, platform rules, or audience expectations require it. Do not fabricate sources, endorsements, results, or identities.'] },
      { title: 'Prohibited uses', paragraphs: ['The Acceptable Use Policy applies fully to models, agents, automations, APIs, extensions, and desktop connections.'] },
    ],
  },
  {
    path: '/Routes/refund', title: 'Refund Policy', description: 'Cancellation and refund rules for Orbit subscriptions, API access, and credit purchases.', updated: '5 September 2026',
    sections: [
      { title: 'Subscriptions', paragraphs: ['You can cancel a subscription through available billing controls. Unless required otherwise by law or stated at checkout, cancellation stops the next renewal and access continues through the paid period.'] },
      { title: 'Digital access and credits', paragraphs: ['One-time API access and credit packs are digital products. Refund eligibility may depend on whether access or credits were used and on mandatory consumer rights. Credits are not cash or stored value.'] },
      { title: 'Duplicate or incorrect charges', paragraphs: ['Contact support promptly with the account email, charge date, amount, and non-sensitive payment reference. Never send full card details.'] },
      { title: 'Service problems', paragraphs: ['Describe the affected service and time range. Service interruption does not automatically create a refund unless required by law, checkout terms, or a separate contract.'] },
      { title: 'How to request', paragraphs: ['Email support@orbitdev.org from the account address. Orbit may verify the account and transaction before deciding the request.'] },
      { title: 'Mandatory rights', paragraphs: ['Nothing in this policy removes refund, withdrawal, or consumer rights that cannot legally be waived.'] },
    ],
  },
  {
    path: '/Routes/dpa', title: 'Data Processing Agreement', description: 'Standard processing terms for business use of Orbit services.', updated: '5 September 2026',
    sections: [
      { title: 'Roles', paragraphs: ['When a customer determines the purposes and means of personal-data processing and Orbit processes that data to provide contracted services, the customer is controller and Orbit Systems B.V. is processor. For Orbit’s own account, security, billing, and legal processing, Orbit may act as controller.'] },
      { title: 'Instructions and processing details', paragraphs: ['Orbit processes customer personal data on documented instructions contained in the agreement, product configuration, and authorized use, unless law requires otherwise. Subject matter, duration, data categories, people, and purpose follow the customer’s use and order.'] },
      { title: 'Confidentiality', paragraphs: ['People authorized to process customer personal data must be subject to appropriate confidentiality obligations and access controls.'] },
      { title: 'Security', paragraphs: ['Orbit maintains technical and organizational measures appropriate to risk, including access controls, transport protection, credential management, operational monitoring, and incident procedures. Specific enterprise requirements must be confirmed in writing.'] },
      { title: 'Subprocessors', paragraphs: ['Orbit may use subprocessors for hosting, authentication, AI processing, payments, support, communications, and monitoring. Orbit remains responsible for required processor obligations and will provide relevant information or notice as agreed.'] },
      { title: 'Assistance', paragraphs: ['Taking into account the nature of processing and available information, Orbit will reasonably assist with data-subject requests, security obligations, impact assessments, and regulator consultations required by applicable data-protection law.'] },
      { title: 'Incident notice', paragraphs: ['Orbit will notify the customer without undue delay after becoming aware of a personal-data breach affecting customer data, and will provide available information needed for the customer’s obligations.'] },
      { title: 'Deletion and return', paragraphs: ['At the end of services, Orbit will delete or return customer personal data as agreed, except where law or justified security and backup processes require retention.'] },
      { title: 'Transfers and audits', paragraphs: ['International transfers will use an applicable legal mechanism. Reasonable audit information may be provided subject to confidentiality, security, proportionality, and protection of other customers.'] },
      { title: 'Enterprise terms', paragraphs: ['This public DPA is a starting point. Signed enterprise terms, processing schedules, subprocessors, measures, and transfer documents must be confirmed during contracting.', contact] },
    ],
  },
  {
    path: '/Routes/rules', title: 'Orbit Rules', description: 'Plain-language operating rules for using Orbit safely and responsibly.', updated: '5 September 2026',
    sections: [
      { title: 'Protect access', paragraphs: ['Keep passwords, recovery codes, session tokens, and API keys private. Revoke exposed credentials immediately.'] },
      { title: 'Use only what you may use', paragraphs: ['Submit data, code, files, accounts, and systems only when you have the required rights and permission.'] },
      { title: 'Check the work', paragraphs: ['Verify important facts, sources, calculations, code, and generated artifacts before relying on them.'] },
      { title: 'Review actions', paragraphs: ['Inspect recipients, destinations, form content, commands, permissions, and irreversible steps before approval.'] },
      { title: 'Respect people', paragraphs: ['Do not use Orbit to deceive, exploit, harass, discriminate, invade privacy, or make unreviewed high-impact decisions.'] },
      { title: 'Respect systems', paragraphs: ['Do not bypass access controls, distribute malware, degrade service, evade limits, or automate abuse.'] },
      { title: 'Report problems', paragraphs: ['Send product and account issues to support@orbitdev.org and security vulnerabilities to security@orbitdev.org. Do not include secrets.'] },
    ],
  },
]
