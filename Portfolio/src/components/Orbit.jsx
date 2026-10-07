import { motion } from 'motion/react'
import {
  siPython, siReact, siN8n, siLangchain, siJavascript, siShopify,
  siNextdotjs, siTailwindcss, siHtml5, siPhp,
} from 'simple-icons'

const T = (icon, name, color) => ({ name, path: icon.path, color: color || `#${icon.hex}` })

// Technologies tied to the services listed on the site, grouped into three orbits.
// k = orbit radius as a multiple of the portrait width, dur = seconds per revolution.
const RINGS = [
  { k: 0.66, dur: 34, dir: 1, planets: [T(siPython, 'Python', '#4B8BBE'), T(siReact, 'React'), T(siN8n, 'n8n')] },
  { k: 0.84, dur: 46, dir: -1, planets: [T(siLangchain, 'LangChain'), T(siJavascript, 'JavaScript'), T(siShopify, 'Shopify')] },
  { k: 1.02, dur: 60, dir: 1, hideOnMobile: true, planets: [T(siNextdotjs, 'Next.js', '#ffffff'), T(siTailwindcss, 'Tailwind CSS'), T(siHtml5, 'HTML5'), T(siPhp, 'PHP')] },
]

// Fixed positions so the stars don't jump around between renders.
const STARS = [
  [8, 14, 2], [92, 10, 1.5], [18, 82, 2], [84, 76, 2.5], [50, 2, 1.5], [3, 48, 1.5],
  [97, 52, 2], [30, 96, 1.5], [70, 94, 2], [12, 30, 1], [88, 30, 1], [60, 8, 1],
]

export default function Orbit() {
  return (
    <div aria-hidden="false" className="orbit-stage pointer-events-none absolute inset-0 z-0">
      {STARS.map(([x, y, s], i) => (
        <span key={i} className="star" style={{ left: `${x}%`, top: `${y}%`, width: s * 2, height: s * 2, animationDelay: `${i * 0.37}s` }} />
      ))}

      {RINGS.map((r, ri) => (
        <div key={ri} className={`orbit ${r.hideOnMobile ? 'max-sm:hidden' : ''}`}
          style={{ '--k': r.k, '--dur': `${r.dur}s`, '--dir': r.dir === 1 ? 'normal' : 'reverse' }}>
          {r.planets.map((p, pi) => {
            const angle = (360 / r.planets.length) * pi + ri * 40
            return (
              <div key={p.name} className="planet" style={{ '--a': `${angle}deg`, '--c': p.color }}>
                <motion.span className="block size-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + ri * 0.25 + pi * 0.12, type: 'spring', stiffness: 200, damping: 14 }}>
                  <span className="planet-in" tabIndex={0} role="img" aria-label={p.name}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d={p.path} /></svg>
                    <span className="planet-tip">{p.name}</span>
                  </span>
                </motion.span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
