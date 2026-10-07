import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import logo from '../assets/logo.png';
import { NAV_LINKS, PROFILE } from '../data/content';

export default function Navbar({ scrolled, active }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="nav-mark">
            <img src={logo} alt={`${PROFILE.name} logo`} className="nav-logo" />
            <span className="nav-mark-name">{PROFILE.name}</span>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link${active === link.href.slice(1) ? ' active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn btn-primary nav-cta">
            Contact Me
          </a>

          <button
            className={`nav-toggle${open ? ' is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={handleLinkClick}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary" onClick={handleLinkClick}>
              Contact Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
