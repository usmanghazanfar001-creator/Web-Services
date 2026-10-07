import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

// Deterministic pseudo-random particle layout so it doesn't jump on re-render.
function makeParticles(count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const seed = i * 137.5;
    particles.push({
      left: (seed % 100).toFixed(2),
      top: 40 + ((seed * 1.7) % 55),
      delay: (i % 10) * 0.8,
      duration: 10 + (i % 6) * 2,
    });
  }
  return particles;
}

export default function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => makeParticles(18), []);

  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-grid" />
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />
      {!reduceMotion &&
        particles.map((p, i) => (
          <span
            key={i}
            className="hero-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
    </div>
  );
}
