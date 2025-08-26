import React, { useEffect, useMemo, useState } from 'react';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [faqOpen, setFaqOpen] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) setDark(stored === 'dark');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const navItems = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Platform', href: '#platform' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Resources', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const features = [
    {
      title: '24/7 Threat Monitoring',
      desc: 'Real-time detection and response powered by our SOC with sub-minute alerting.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Zero-Trust Access',
      desc: 'Granular policies and continuous verification keep your crown jewels safe.',
      icon: KeyIcon,
    },
    {
      title: 'AI-Driven Triage',
      desc: 'Noise reduction up to 90% using behavioral analytics and ML correlation.',
      icon: CpuIcon,
    },
    {
      title: 'Cloud & On‑Prem',
      desc: 'Unified visibility across AWS, Azure, GCP, and hybrid environments.',
      icon: CloudIcon,
    },
    {
      title: 'Compliance Ready',
      desc: 'Prebuilt controls for SOC 2, ISO 27001, HIPAA, and PCI DSS.',
      icon: ShieldLockIcon,
    },
    {
      title: 'Incident Automation',
      desc: 'Playbooks that auto-contain and eradicate threats in seconds.',
      icon: LightningIcon,
    },
  ];

  const tiers = [
    {
      name: 'Starter',
      price: '399',
      tagline: 'For lean teams securing their first workloads',
      features: ['Up to 50 endpoints', 'Email + in-app alerts', 'Compliance templates', 'Basic playbooks'],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Growth',
      price: '999',
      tagline: 'Best for fast‑growing orgs needing 24/7 coverage',
      features: ['Up to 250 endpoints', '24/7 SOC monitoring', 'Cloud posture (CSPM)', 'Advanced playbooks', 'SLA: 15 min'],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      tagline: 'For regulated and global enterprises',
      features: ['Unlimited endpoints', 'Dedicated analyst', 'Custom runbooks', 'On‑prem & air‑gapped', 'SLA: 5 min'],
      cta: 'Talk to Sales',
      popular: false,
    },
  ];

  const faqs = [
    {
      q: 'How fast can we deploy AegisSec?',
      a: 'Most customers deploy within a day. Agentless cloud sensors are live in minutes; endpoint agents can be rolled out with your MDM in a single sprint.',
    },
    {
      q: 'Do you replace our SIEM or integrate with it?',
      a: 'We can do either. AegisSec includes a high‑efficiency data lake and normalized analytics, and we also integrate with Splunk, Sentinel, and QRadar.',
    },
    {
      q: 'What does 24/7 monitoring include?',
      a: 'Our global SOC provides continuous detection, triage, and guided response. We escalate with context and recommended actions, with optional one‑click containment.',
    },
    {
      q: 'Are you compliant with SOC 2 and ISO 27001?',
      a: 'Yes. We undergo annual SOC 2 Type II audits and maintain ISO 27001 certification. We provide mappings and auditor‑ready evidence exports.',
    },
  ];

  const handleSubmitContact = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    alert(`Thanks, ${name || 'there'}! Our team will reach out shortly.`);
    e.currentTarget.reset();
  };

  const gradientText = 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent';

  const brandLogos = useMemo(
    () => [
      'Cygnus',
      'NebulaCloud',
      'AlphaBank',
      'VoltAI',
      'Horizon Health',
      'NovaPay',
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <Header
        dark={dark}
        onToggleDark={() => setDark((v) => !v)}
        navItems={navItems}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main>
        <Hero />

        <BrandMarquee brands={brandLogos} />

        <section id="solutions" className="relative py-20">
          <SectionContainer>
            <SectionHeader
              eyebrow="Solutions"
              title={
                <>
                  Stop breaches before they begin
                </>
              }
              subtitle="Detect, contain, and eradicate threats with a unified platform built for speed and scale."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <FeatureCard key={i} {...f} />
              ))}
            </div>
          </SectionContainer>
          <GridBg />
        </section>

        <section id="platform" className="relative py-20">
          <SectionContainer>
            <SectionHeader
              eyebrow="Platform"
              title="Visibility, detection, response — in one place"
              subtitle="From cloud to endpoint, AegisSec correlates signals into high‑fidelity incidents and orchestrates automated containment."
            />
            <PlatformOverview />
          </SectionContainer>
        </section>

        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <SectionContainer>
            <div className="grid gap-8 md:grid-cols-3">
              <Stat value="98%" label="Fewer false positives" />
              <Stat value="<1m" label="Median alert time" />
              <Stat value="35d" label="To first compliance report" />
            </div>
          </SectionContainer>
        </section>

        <section id="pricing" className="relative py-20">
          <SectionContainer>
            <SectionHeader
              eyebrow="Pricing"
              title="Security that scales with you"
              subtitle="Simple, transparent plans. Cancel anytime during trial."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {tiers.map((t) => (
                <PricingCard key={t.name} tier={t} />
              ))}
            </div>
          </SectionContainer>
        </section>

        <section className="py-20 bg-slate-50 dark:bg-slate-900/50" id="faq">
          <SectionContainer>
            <SectionHeader
              eyebrow="Resources"
              title="Frequently asked questions"
              subtitle="Don’t see your question? Reach out and we’ll respond within one business day."
            />
            <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 dark:divide-slate-800">
              {faqs.map((f, idx) => (
                <FAQItem
                  key={idx}
                  q={f.q}
                  a={f.a}
                  open={!!faqOpen[idx]}
                  onToggle={() => setFaqOpen((p) => ({ ...p, [idx]: !p[idx] }))}
                />
              ))}
            </div>
          </SectionContainer>
        </section>

        <section id="contact" className="relative py-20">
          <SectionContainer>
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-3xl font-semibold tracking-tight">Talk to security experts</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  Schedule a demo or request a security assessment. We’ll tailor a plan to your environment and goals.
                </p>
                <ul className="mt-6 space-y-3 text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-3"><CheckIcon className="mt-1 h-5 w-5 text-emerald-500"/>SOC 2 Type II and ISO 27001 certified</li>
                  <li className="flex items-start gap-3"><CheckIcon className="mt-1 h-5 w-5 text-emerald-500"/>Global 24/7 monitoring</li>
                  <li className="flex items-start gap-3"><CheckIcon className="mt-1 h-5 w-5 text-emerald-500"/>Deployed in days, not months</li>
                </ul>
              </div>
              <form onSubmit={handleSubmitContact} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="name" label="Full name" required />
                  <Input name="email" type="email" label="Work email" required />
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Input name="company" label="Company" />
                  <Input name="employees" label="# of employees" />
                </div>
                <div className="mt-4">
                  <Label htmlFor="message">How can we help?</Label>
                  <textarea id="message" name="message" className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none ring-0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950" rows={4} placeholder="Briefly describe your goals"/>
                </div>
                <button type="submit" className="mt-6 w-full rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-medium text-white shadow hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-sky-300 active:scale-[.98]">Request demo</button>
                <p className="mt-3 text-center text-xs text-slate-500">By submitting, you agree to our privacy policy.</p>
              </form>
            </div>
          </SectionContainer>
        </section>

        <CTA />
      </main>

      <Footer />
    </div>
  );
}

function Header({ dark, onToggleDark, navItems, mobileOpen, setMobileOpen }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/60 dark:bg-slate-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight">AegisSec</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={onToggleDark} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
            {dark ? <SunIcon className="h-5 w-5"/> : <MoonIcon className="h-5 w-5"/>}
          </button>
          <a href="#pricing" className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900 md:inline-block">Pricing</a>
          <a href="#contact" className="hidden rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 md:inline-block">Get a demo</a>
          <button className="inline-flex items-center md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="py-2 text-sm text-slate-700 dark:text-slate-200" onClick={() => setMobileOpen(false)}>
                {n.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <a href="#pricing" className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">Pricing</a>
              <a href="#contact" className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">Get a demo</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/50 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 dark:border-sky-900/50 dark:bg-sky-900/30 dark:text-sky-300">
            <SparkleIcon className="h-4 w-4" /> New: Agentless cloud sensors
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Prevent, detect, and respond — faster than attackers
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            AegisSec is the unified cybersecurity platform that correlates signals across cloud and endpoints, reduces noise, and automates response.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-600 hover:to-blue-700 active:scale-[.98]">
              Request a demo <ArrowRightIcon className="h-4 w-4"/>
            </a>
            <a href="#pricing" className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
              See pricing
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2"><ShieldCheckIcon className="h-5 w-5 text-emerald-500"/>SOC 2 Type II</div>
            <div className="flex items-center gap-2"><BoltIcon className="h-5 w-5 text-sky-500"/>Median alert time <span className="font-semibold">&lt; 60s</span></div>
          </div>
        </div>
        <div className="relative">
          <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-sky-900/5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs text-slate-500 dark:border-slate-800">
              <span className="flex items-center gap-2"><LockIcon className="h-4 w-4"/> live-incident.json</span>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500"/> active
              </div>
            </div>
            <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-100">
{`{
  "incident_id": "INC-7842",
  "severity": "high",
  "actor": "suspicious_process",
  "endpoint": "prod-api-12",
  "detections": ["credential_dump", "lateral_movement"],
  "actions": [
    { "type": "isolate_endpoint", "status": "executed" },
    { "type": "disable_token", "status": "executed" }
  ],
  "status": "contained",
  "time_to_contain": "43s"
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandMarquee({ brands }) {
  return (
    <div className="border-y border-slate-200 bg-slate-50/60 py-6 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto flex max-w-7xl items-center gap-10 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="whitespace-nowrap [animation:marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
          {brands.concat(brands).map((b, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <DotGrid className="h-4 w-4 text-slate-400"/> {b}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function FeatureCard({ title, desc, icon: Icon }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-sky-500/10 blur-2xl transition group-hover:bg-sky-500/20"/>
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-300">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
      <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">
        Learn more <ArrowRightIcon className="h-4 w-4"/>
      </a>
    </div>
  );
}

function PlatformOverview() {
  const items = [
    { title: 'Cloud Posture (CSPM)', desc: 'Continuously scan for misconfigurations and drift across AWS, Azure, and GCP.' },
    { title: 'Endpoint Detection (EDR)', desc: 'Behavioral detection, response actions, and rollback for Windows, macOS, Linux.' },
    { title: 'Identity Shield', desc: 'Detect risky logins, impossible travel, and privilege escalation in real time.' },
    { title: 'Data Protection (DLP)', desc: 'Sensitive data discovery and policy‑based exfiltration prevention.' },
  ];
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500"/> Unified telemetry
        </div>
        <h4 className={`mt-3 text-2xl font-bold ${'bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent'}`}>Signals in. Incidents out.</h4>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Correlate logs, events, and behaviors into high‑fidelity incidents with automatic context and recommended actions.</p>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          {items.map((it) => (
            <div key={it.title} className="rounded-lg border border-slate-200/60 bg-white/50 p-4 dark:border-slate-800/60 dark:bg-slate-900/60">
              <div className="flex items-center gap-2 font-medium"><DotGrid className="h-4 w-4 text-sky-500"/> {it.title}</div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-semibold">Live detections</h5>
          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">Healthy</span>
        </div>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            { t: 'Privilege escalation attempt blocked', s: 'Critical', c: 'rose' },
            { t: 'Suspicious PowerShell isolated', s: 'High', c: 'orange' },
            { t: 'Public S3 bucket remediated', s: 'Medium', c: 'yellow' },
            { t: 'Anomalous login contained', s: 'High', c: 'orange' },
          ].map((d, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full bg-${d.c}-500`} />
                <span>{d.t}</span>
              </div>
              <span className={`rounded-md bg-${d.c}-500/10 px-2 py-1 text-xs font-medium text-${d.c}-600 dark:text-${d.c}-400`}>{d.s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PricingCard({ tier }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-6 ${tier.popular ? 'border-sky-500 shadow-lg shadow-sky-500/20' : 'border-slate-200 dark:border-slate-800'} bg-white dark:bg-slate-900`}>
      {tier.popular && (
        <div className="absolute right-4 top-4 rounded-full bg-sky-600 px-2 py-1 text-xs font-semibold text-white">Most popular</div>
      )}
      <h3 className="text-lg font-semibold">{tier.name}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{tier.tagline}</p>
      <div className="mt-5 flex items-end gap-1">
        <span className="text-3xl font-extrabold">
          {tier.price === 'Custom' ? 'Custom' : `$${tier.price}`}
        </span>
        {tier.price !== 'Custom' && <span className="pb-1 text-sm text-slate-500">/mo</span>}
      </div>
      <ul className="mt-5 space-y-3 text-sm">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3"><CheckIcon className="mt-0.5 h-5 w-5 text-emerald-500"/>{f}</li>
        ))}
      </ul>
      <a href="#contact" className={`mt-6 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition ${tier.popular ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700' : 'border border-slate-300 text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800'}`}>
        {tier.cta}
      </a>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
      <div className={`text-4xl font-extrabold ${'bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent'}`}>{value}</div>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{label}</div>
    </div>
  );
}

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className="py-4">
      <button className="flex w-full items-center justify-between text-left" onClick={onToggle} aria-expanded={open}>
        <span className="text-base font-medium">{q}</span>
        <span className="rounded-full border border-slate-300 p-1 text-slate-600 dark:border-slate-700 dark:text-slate-300">{open ? '-' : '+'}</span>
      </button>
      {open && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{a}</p>}
    </div>
  );
}

function CTA() {
  return (
    <section className="relative py-20">
      <SectionContainer>
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 text-white shadow-xl dark:border-slate-800">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-500/20 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold">Ready to outpace attackers?</h3>
            <p className="mt-2 text-slate-300">See how AegisSec correlates signals and auto‑contains incidents in seconds.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Book a demo <ArrowRightIcon className="h-4 w-4"/>
              </a>
              <a href="#pricing" className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Explore pricing</a>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2">
              <Logo className="h-7 w-7" />
              <span className="text-lg font-semibold">AegisSec</span>
            </a>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">The cybersecurity platform for modern teams.</p>
          </div>
          <FooterCol title="Product" links={[
            { label: 'Platform', href: '#platform' },
            { label: 'Solutions', href: '#solutions' },
            { label: 'Pricing', href: '#pricing' },
          ]} />
          <FooterCol title="Resources" links={[
            { label: 'FAQ', href: '#faq' },
            { label: 'Security', href: '#contact' },
            { label: 'Status', href: '#' },
          ]} />
          <FooterCol title="Company" links={[
            { label: 'Contact', href: '#contact' },
            { label: 'Careers', href: '#' },
            { label: 'Legal', href: '#' },
          ]} />
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 md:flex-row">
          <p>© {new Date().getFullYear()} AegisSec Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300">Terms</a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {links.map((l) => (
          <li key={l.label}><a className="hover:text-slate-900 dark:hover:text-white" href={l.href}>{l.label}</a></li>
        ))}
      </ul>
    </div>
  );
}

function SectionContainer({ children }) {
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">{eyebrow}</div>
      <h2 className={`mt-2 text-3xl font-bold sm:text-4xl ${'bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300'}`}>{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{subtitle}</p>
    </div>
  );
}

function Input({ label, name, type = 'text', required }) {
  return (
    <div>
      <Label htmlFor={name}>{label}{required && <span className="text-rose-500"> *</span>}</Label>
      <input id={name} name={name} type={type} required={required} className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none ring-0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950" />
    </div>
  );
}

function Label(props) {
  return <label {...props} className={`block text-xs font-medium text-slate-700 dark:text-slate-300 ${props.className || ''}`.trim()} />;
}

function GridBg() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <svg className="h-full w-full opacity-40 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// Icons (minimal inline SVG)
function Logo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8"/>
          <stop offset="100%" stopColor="#2563eb"/>
        </linearGradient>
      </defs>
      <path d="M24 4l16 8v12c0 9.941-7.163 18.54-16 20-8.837-1.46-16-10.059-16-20V12l16-8z" fill="url(#g1)"/>
      <path d="M24 12a10 10 0 100 20 10 10 0 000-20z" fill="white" opacity="0.2"/>
      <path d="M24 16a6 6 0 100 12 6 6 0 000-12z" stroke="white" strokeOpacity=".8" strokeWidth="2"/>
    </svg>
  );
}

function MenuIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
    </svg>
  );
}
function SunIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M8.05 16.95l-1.414 1.414m0-11.314l1.414 1.414m9.9 9.9l1.414 1.414" strokeLinecap="round"/>
    </svg>
  );
}
function MoonIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  );
}
function ArrowRightIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 010-1.414z"/>
    </svg>
  );
}
function LockIcon({ className = '' }) { return (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <rect x="5" y="11" width="14" height="10" rx="2"/>
    <path d="M8 11V8a4 4 0 118 0v3"/>
  </svg>
); }
function ShieldCheckIcon({ className = '' }) { return (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M12 3l7 4v6c0 4.418-3.582 8-7 8s-7-3.582-7-8V7l7-4z"/>
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
); }
function ShieldLockIcon({ className = '' }) { return (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M12 3l7 4v6c0 4.418-3.582 8-7 8s-7-3.582-7-8V7l7-4z"/>
    <path d="M9 13h6v4H9z"/>
    <path d="M10 13v-1a2 2 0 114 0v1"/>
  </svg>
); }
function KeyIcon({ className = '' }) { return (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <circle cx="7" cy="12" r="3"/>
    <path d="M10 12h10l-2 2 2 2-2 2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
); }
function CpuIcon({ className = '' }) { return (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <rect x="6" y="6" width="12" height="12" rx="2"/>
    <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" strokeLinecap="round"/>
  </svg>
); }
function CloudIcon({ className = '' }) { return (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M7 18a5 5 0 110-10 7 7 0 0113 4h1a3 3 0 010 6H7z"/>
  </svg>
); }
function LightningIcon({ className = '' }) { return (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
  </svg>
); }
function BoltIcon({ className = '' }) { return (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
  </svg>
); }
function CheckIcon({ className = '' }) { return (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
); }
function SparkleIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/>
    </svg>
  );
}
function DotGrid({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <circle cx="2" cy="2" r="1"/>
      <circle cx="10" cy="2" r="1"/>
      <circle cx="2" cy="10" r="1"/>
      <circle cx="10" cy="10" r="1"/>
    </svg>
  );
}

export default App;
