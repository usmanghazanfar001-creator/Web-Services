import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import { ABOUT, STATS, TIMELINE } from '../data/content';

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  const education = TIMELINE.find((t) => t.type === 'education');

  return (
    <section id="about" className="section">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">
              <span className="bar" />
              Who I am
            </span>
            <h2 className="section-title">About Me</h2>
          </div>
          <p className="section-note">
            Where AI engineering meets growth-minded web development.
          </p>
        </div>

        <div className="about-grid">
          <Reveal className="about-text">
            {ABOUT.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <div className="about-tags">
              {ABOUT.interests.map((interest) => (
                <span className="tag" key={interest}>
                  {interest}
                </span>
              ))}
            </div>

            {education && (
              <div className="about-edu glass">
                <div className="about-edu-degree">{education.title}</div>
                <div className="about-edu-inst">{education.place}</div>
                <div className="about-edu-grad">{education.date}</div>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="about-stats">
            {STATS.map((stat) => (
              <div className="stat-card glass" key={stat.label}>
                <div className="stat-value">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
