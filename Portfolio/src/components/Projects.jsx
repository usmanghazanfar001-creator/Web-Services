import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import ProjectModal from './ProjectModal';
import { PROJECTS, PROJECT_FILTERS } from '../data/content';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);

  const filtered = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">
              <span className="bar" />
              Portfolio
            </span>
            <h2 className="section-title">Selected Projects</h2>
          </div>
          <p className="section-note">A mix of shipped products and open-source builds.</p>
        </div>

        <div className="project-filters glass">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project, i) => (
            <Reveal
              as="div"
              delay={(i % 3) * 0.08}
              key={project.key}
              className="project-card"
              role="button"
              tabIndex={0}
              onClick={() => setActive(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActive(project);
              }}
            >
              <div className="project-card-inner">
                <span className="project-badge">{project.badge}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className="project-view">
                  View Project
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
