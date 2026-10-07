import { Sparkles, BrainCircuit, Code2, LayoutTemplate, Building2, Workflow, Check } from 'lucide-react';
import Reveal from './Reveal';
import { SERVICES } from '../data/content';

const ICONS = { Sparkles, BrainCircuit, Code2, LayoutTemplate, Building2, Workflow };

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">
              <span className="bar" />
              How I can help
            </span>
            <h2 className="section-title">Services</h2>
          </div>
          <p className="section-note">
            From automating a workflow to shipping a full product.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal delay={(i % 3) * 0.08} key={service.key} className="service-card glass">
                <div className="service-icon">
                  <Icon size={22} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-points">
                  {service.points.map((point) => (
                    <li key={point}>
                      <Check size={14} />
                      {point}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="service-more">
                  Learn more →
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
