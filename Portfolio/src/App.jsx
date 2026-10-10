import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useInView, useTransform, useMotionValue, animate } from 'motion/react'
import { useRef } from 'react'
import {
  ArrowUpRight, ArrowUp, Phone, MapPin, X, Menu, Check,
  Code2, BrainCircuit, Globe2, Workflow, Sparkles, LayoutTemplate, Building2,
  GraduationCap, Briefcase,
} from 'lucide-react'
import {
  PROFILE, NAV_LINKS, ABOUT, STATS, SKILL_GROUPS, SERVICES, PROJECTS,
  PROJECT_FILTERS, TIMELINE,
} from './data/content'
import profileImg from './assets/images/profile.webp'
import Orbit from './components/Orbit'
import { GithubIcon, WhatsAppIcon, FiverrIcon, GmailIcon, LinkedInIcon } from './components/BrandIcons'

const ICONS = { Code2, BrainCircuit, Globe2, Workflow, Sparkles, LayoutTemplate, Building2 }
const Icon = ({ name, ...p }) => { const C = ICONS[name] || Sparkles; return <C {...p} /> }

/* ---------- helpers ---------- */
const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
)
const Section = ({ id, eyebrow, title, children }) => (
  <section id={id} className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
    <Reveal>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-2">{eyebrow}</p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
    </Reveal>
    <div className="mt-12">{children}</div>
  </section>
)
const Words = ({ text, delay = 0 }) => (
  <span aria-hidden="true">
    {text.split(' ').map((w, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        <motion.span className="inline-block" initial={{ y: '105%' }} animate={{ y: 0 }}
          transition={{ duration: 0.75, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
          {w}{'\u00A0'}
        </motion.span>
      </span>
    ))}
  </span>
)
function Counter({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => { if (inView) { const c = animate(0, to, { duration: 1.4, onUpdate: (v) => setN(Math.round(v)) }); return () => c.stop() } }, [inView, to])
  return <span ref={ref}>{n}{suffix}</span>
}

/* ---------- nav ---------- */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV_LINKS.forEach(({ href }) => { const el = document.querySelector(href); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ scaleX: bar }} className="h-0.5 origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3" />
      <nav aria-label="Main" className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-line bg-ink/70 px-5 py-2.5 backdrop-blur-xl max-sm:mx-3">
        <a href="#home" className="font-display text-lg font-bold text-white">{PROFILE.firstName}<span className="grad-text">.</span></a>
        <ul className="hidden gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} className={`rounded-full px-3 py-1.5 text-sm transition ${active === l.href.slice(1) ? 'bg-white/10 text-white' : 'hover:text-white'}`}>{l.label}</a></li>
          ))}
        </ul>
        <button className="md:hidden" aria-label="Menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="mx-3 mt-2 rounded-3xl border border-line bg-ink/95 p-3 backdrop-blur-xl md:hidden">
            {NAV_LINKS.map((l) => <li key={l.href}><a onClick={() => setOpen(false)} href={l.href} className="block rounded-xl px-4 py-3 hover:bg-white/5">{l.label}</a></li>)}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ---------- hero ---------- */
function Portrait({ children }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 14 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 14 })
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5) }
  const leave = () => { x.set(0); y.set(0) }
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
      onMouseMove={move} onMouseLeave={leave} style={{ perspective: 900 }} className="relative mx-auto w-[var(--w)] [--w:11rem] sm:[--w:17rem] lg:[--w:18rem]">
      <Orbit />
      <motion.div style={{ rotateX: rx, rotateY: ry }} animate={{ y: [0, -10, 0] }} transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }} className="relative z-10">
        {children}
      </motion.div>
    </motion.div>
  )
}
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-20">
      <div className="aurora absolute inset-0" /><div className="grid-bg absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10">
          {PROFILE.openToWork && (
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="chip inline-flex items-center gap-2">
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative size-2 rounded-full bg-emerald-400" /></span>
              Open to work
            </motion.span>
          )}
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-6xl xl:text-7xl" aria-label={`${PROFILE.name} — ${PROFILE.title} in Faisalabad, Pakistan`}>
            <Words text="Hi, I'm" delay={0.1} />
            <span className="grad-text"><Words text={PROFILE.name} delay={0.25} /></span><br />
            <Words text={PROFILE.title} delay={0.5} />
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">{PROFILE.tagline}</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-white px-6 py-3 font-medium text-ink transition hover:scale-105">View projects</a>
            <a href="#contact" className="rounded-full border border-line px-6 py-3 font-medium text-white transition hover:bg-white/5">Get in touch</a>
          </motion.div>
          <p className="mt-8 flex items-center gap-2 text-sm text-zinc-500"><MapPin size={14} /> {PROFILE.location}</p>
        </div>
        <Portrait>
          <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent via-accent-2 to-accent-3 opacity-60 blur-2xl" />
          <div className="relative rounded-full bg-gradient-to-br from-accent via-accent-2 to-accent-3 p-1">
            <img src={profileImg} width="640" height="640" fetchPriority="high" decoding="async" alt={`${PROFILE.name}, ${PROFILE.title} based in Faisalabad, Pakistan`} className="aspect-square w-full rounded-full border-4 border-ink object-cover object-top" />
          </div>
        </Portrait>
      </div>
      <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-3 gap-3 px-5">
        {STATS.map((s) => (
          <div key={s.label} className="card p-5 text-center">
            <div className="font-display text-3xl font-bold text-white sm:text-5xl"><Counter to={s.value} suffix={s.suffix} /></div>
            <div className="mt-1 text-xs text-zinc-500 sm:text-sm">{s.label}</div>
          </div>
        ))}
      </div>
      <Marquee />
    </section>
  )
}

function Marquee() {
  const items = SKILL_GROUPS.flatMap((g) => g.items)
  return (
    <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-hidden="true">
      <div className="marquee flex w-max gap-3">
        {[...items, ...items].map((t, i) => <span key={i} className="chip whitespace-nowrap">{t}</span>)}
      </div>
    </div>
  )
}

/* ---------- about + skills ---------- */
const About = () => (
  <Section id="about" eyebrow="About" title="Technology meets growth.">
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <Reveal className="space-y-5 text-lg leading-relaxed text-zinc-400">{ABOUT.intro.map((p) => <p key={p}>{p}</p>)}</Reveal>
      <Reveal delay={0.1} className="card p-6">
        <h3 className="mb-4 font-display text-lg text-white">Interests</h3>
        <div className="flex flex-wrap gap-2">{ABOUT.interests.map((i) => <span key={i} className="chip">{i}</span>)}</div>
      </Reveal>
    </div>
  </Section>
)

const Skills = () => (
  <Section id="skills" eyebrow="Skills" title="My toolbox.">
    <div className="grid gap-4 sm:grid-cols-2">
      {SKILL_GROUPS.map((g, i) => (
        <Reveal key={g.key} delay={i * 0.07}>
          <div onMouseMove={spotlight} className="card glow relative h-full p-6">
            <Icon name={g.icon} className="text-accent" size={26} />
            <h3 className="mt-4 font-display text-xl text-white">{g.title}</h3>
            <p className="mt-1 text-sm text-zinc-500">{g.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">{g.items.map((s) => <span key={s} className="chip">{s}</span>)}</div>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
)

/* ---------- services ---------- */
const Services = () => (
  <Section id="services" eyebrow="Services" title="What I can build for you.">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, i) => (
        <Reveal key={s.key} delay={(i % 3) * 0.07}>
          <div onMouseMove={spotlight} className="card glow relative h-full p-6">
            <div className="grid size-11 place-items-center rounded-2xl bg-accent/15 text-accent"><Icon name={s.icon} size={22} /></div>
            <h3 className="mt-5 font-display text-xl text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.description}</p>
            <ul className="mt-4 space-y-1.5 text-sm">{s.points.map((p) => <li key={p} className="flex items-center gap-2"><Check size={14} className="text-accent-2" />{p}</li>)}</ul>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
)

/* ---------- projects ---------- */
function ProjectModal({ p, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, scale: 0.96 }}
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-panel p-7">
        <div className="flex items-start justify-between gap-4">
          <div><p className="font-mono text-xs uppercase tracking-widest text-accent-2">{p.badge}</p><h3 className="mt-2 font-display text-2xl font-bold text-white">{p.title}</h3></div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-white/10"><X size={20} /></button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        <h4 className="mt-6 text-sm font-semibold text-white">Problem</h4><p className="mt-1 text-zinc-400">{p.problem}</p>
        <h4 className="mt-5 text-sm font-semibold text-white">Solution</h4><p className="mt-1 text-zinc-400">{p.solution}</p>
        <h4 className="mt-5 text-sm font-semibold text-white">Key features</h4>
        <ul className="mt-2 space-y-1.5">{p.features.map((f) => <li key={f} className="flex items-start gap-2 text-zinc-400"><Check size={16} className="mt-0.5 shrink-0 text-accent-2" />{f}</li>)}</ul>
        {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-ink">{p.linkLabel} <ArrowUpRight size={16} /></a>}
      </motion.div>
    </motion.div>
  )
}

function Projects() {
  const [filter, setFilter] = useState('All')
  const [sel, setSel] = useState(null)
  const list = PROJECTS.filter((p) => filter === 'All' || p.category === filter)
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work.">
      <div className="mb-8 flex flex-wrap gap-2">
        {PROJECT_FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-4 py-1.5 text-sm transition ${filter === f ? 'border-white bg-white text-ink' : 'border-line hover:border-white/30'}`}>{f}</button>
        ))}
      </div>
      <motion.div layout className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.button layout key={p.key} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setSel(p)} onMouseMove={spotlight} className="card glow group relative p-6 text-left">
              <div className="flex items-center justify-between"><span className="font-mono text-xs uppercase tracking-widest text-accent-2">{p.category}</span>
                <ArrowUpRight className="text-zinc-600 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" size={20} /></div>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>{sel && <ProjectModal p={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </Section>
  )
}

/* ---------- experience & education ---------- */
const Experience = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })
  return (
  <Section id="experience" eyebrow="Experience & Education" title="My journey.">
    <div ref={ref} className="relative space-y-6 border-l border-line pl-8">
      <motion.span style={{ scaleY: draw }} className="absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3" />
      {TIMELINE.map((t) => (
        <Reveal key={t.key}>
          <div className="card relative p-6">
            <span className="absolute -left-[2.85rem] top-7 grid size-8 place-items-center rounded-full border border-line bg-ink text-accent">
              {t.type === 'education' ? <GraduationCap size={16} /> : <Briefcase size={16} />}
            </span>
            <p className="font-mono text-xs uppercase tracking-widest text-accent-2">{t.date}</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">{t.title}</h3>
            <p className="text-sm text-zinc-500">{t.place}</p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">{t.bullets.map((b) => <li key={b} className="flex items-start gap-2"><Check size={14} className="mt-1 shrink-0 text-accent" />{b}</li>)}</ul>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
  )
}

/* ---------- contact + footer ---------- */
const Contact = () => {
  const links = [
    { Ic: GmailIcon, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`, color: '#EA4335' },
    { Ic: WhatsAppIcon, label: 'WhatsApp', value: PROFILE.whatsapp, href: PROFILE.whatsappLink, color: '#25D366' },
    { Ic: Phone, label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}`, color: '#8b7cff' },
    { Ic: LinkedInIcon, label: 'LinkedIn', value: PROFILE.linkedinLabel, href: PROFILE.linkedin, color: '#0A66C2' },
    { Ic: GithubIcon, label: 'GitHub', value: PROFILE.githubLabel, href: PROFILE.github, color: '#ffffff' },
    { Ic: FiverrIcon, label: 'Fiverr', value: 'fiverr.com/afidevelopers', href: PROFILE.fiverr, color: '#1DBF73' },
  ]
  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something together.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(({ Ic, label, value, href, color }, i) => (
          <Reveal key={label} delay={(i % 3) * 0.06}>
            <motion.a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" onMouseMove={spotlight}
              whileHover="hover" whileTap={{ scale: 0.98 }} style={{ '--brand': color }}
              className="card glow brand-card group relative flex items-center gap-4 p-5">
              <motion.span variants={{ hover: { scale: 1.12, rotate: -6 } }} transition={{ type: 'spring', stiffness: 350, damping: 14 }}
                className="brand-icon grid size-12 shrink-0 place-items-center rounded-2xl">
                <Ic size={22} />
              </motion.span>
              <span className="min-w-0 flex-1"><span className="block text-xs text-zinc-500">{label}</span><span className="block truncate text-white">{value}</span></span>
              <ArrowUpRight size={18} className="shrink-0 text-zinc-600 transition group-hover:text-white" />
            </motion.a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Footer() {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => setShow(window.scrollY > 600); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  return (
    <>
      <footer className="border-t border-line py-8 text-center text-sm text-zinc-500">© {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}</footer>
      <AnimatePresence>
        {show && (
          <motion.button initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full border border-line bg-panel text-white hover:bg-white/10">
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main><Hero /><About /><Skills /><Services /><Projects /><Experience /><Contact /></main>
      <Footer />
    </>
  )
}
