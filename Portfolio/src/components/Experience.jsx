import { Briefcase, GraduationCap } from 'lucide-react';
import Reveal from './Reveal';
import { TIMELINE } from '../data/content';

const ICONS = { experience: Briefcase, education: GraduationCap };

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">
              <span className="bar" />
              Career path
            </span>
            <h2 className="section-title">Experience &amp; Education</h2>
          </div>
          <p className="section-note">Where I've worked and what I'm studying.</p>
        </div>

        <div className="timeline">
          {TIMELINE.map((entry, i) => {
            const Icon = ICONS[entry.type];
            return (
              <Reveal as="div" delay={i * 0.1} key={entry.key} className="timeline-item">
                <div className="timeline-dot">
                  <Icon size={20} />
                </div>
                <div className="timeline-card glass">
                  <span className="timeline-date">{entry.date}</span>
                  <div className="timeline-title">{entry.title}</div>
                  <div className="timeline-place">{entry.place}</div>
                  <ul className="timeline-desc">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
