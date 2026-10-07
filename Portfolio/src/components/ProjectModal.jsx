import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close project details">
              <X size={18} />
            </button>

            <span className="project-badge">{project.badge}</span>
            <h2 id="modal-title">{project.title}</h2>

            <div className="modal-section">
              <h4>Problem</h4>
              <p>{project.problem}</p>
            </div>

            <div className="modal-section">
              <h4>Solution</h4>
              <p>{project.solution}</p>
            </div>

            <div className="modal-section">
              <h4>Main features</h4>
              <ul className="modal-features">
                {project.features.map((f) => (
                  <li key={f}>
                    <CheckCircle2 size={15} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h4>Technologies</h4>
              <div className="project-tags">
                {project.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            {project.link && (
              <div className="modal-actions">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  {project.linkType === 'github' ? (
                    <i className="fa-brands fa-github" aria-hidden="true" />
                  ) : (
                    <ExternalLink size={16} />
                  )}
                  {project.linkLabel}
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
