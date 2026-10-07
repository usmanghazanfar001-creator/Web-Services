import { Code2, BrainCircuit, Globe2, Workflow } from 'lucide-react';
import Reveal from './Reveal';
import { SKILL_GROUPS } from '../data/content';

const ICONS = { Code2, BrainCircuit, Globe2, Workflow };

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">
              <span className="bar" />
              What I work with
            </span>
            <h2 className="section-title">Skills &amp; Expertise</h2>
          </div>
          <p className="section-note">
            A toolkit spanning intelligent systems, the web, and the automation that connects them.
          </p>
        </div>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group, i) => {
            const Icon = ICONS[group.icon];
            return (
              <Reveal delay={i * 0.08} key={group.key} className="skill-card glass">
                <div className="skill-icon">
                  <Icon size={22} />
                </div>
                <h3>{group.title}</h3>
                <p className="skill-desc">{group.description}</p>
                <div className="skill-items">
                  {group.items.map((skill) => (
                    <span className="skill-chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
