import { Mail, Briefcase, Phone } from 'lucide-react';
import { NAV_LINKS, PROFILE } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="section-inner">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>{PROFILE.name}</strong>
            <span>{PROFILE.title} · {PROFILE.location}</span>
          </div>

          <nav>
            <ul className="footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-social">
            <a href={`mailto:${PROFILE.email}`} aria-label="Email">
              <Mail size={16} />
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github" aria-hidden="true" />
            </a>
            <a href={PROFILE.fiverr} target="_blank" rel="noreferrer" aria-label="Fiverr">
              <Briefcase size={16} />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
            </a>
            <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} aria-label="Phone">
              <Phone size={16} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {year} {PROFILE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
