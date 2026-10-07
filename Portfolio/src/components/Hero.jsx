import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Briefcase, ChevronDown } from 'lucide-react';
import HeroBackground from './HeroBackground';
import profileImg from '../assets/images/profile.png';
import { PROFILE } from '../data/content';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <header className="hero" id="home">
      <HeroBackground />

      <div className="section-inner hero-inner">
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? undefined : 'hidden'}
          animate={reduceMotion ? undefined : 'show'}
        >
          <motion.div variants={item} className="hero-badge glass">
            <span className="dot" />
            {PROFILE.openToWork ? 'Open to work' : PROFILE.title}
          </motion.div>

          <motion.h1 variants={item} className="hero-title">
            {PROFILE.firstName}
            <br />
            <span className="hero-title-gradient">{PROFILE.lastName}</span>
          </motion.h1>

          <motion.p variants={item} className="hero-sub">
            {PROFILE.tagline}
          </motion.p>

          <motion.div variants={item} className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </motion.div>

          <motion.div variants={item} className="hero-social">
            <a href={`mailto:${PROFILE.email}`} aria-label="Email">
              <Mail size={18} />
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github" aria-hidden="true" />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
            </a>
            <a href={PROFILE.fiverr} target="_blank" rel="noreferrer" aria-label="Fiverr">
              <Briefcase size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-side"
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-photo-ring">
            <div className="hero-photo-glow" />
            <img src={profileImg} alt={PROFILE.name} className="hero-photo" />
          </div>

          <div className="hero-spec glass">
            <div className="hero-spec-row">
              <span className="hero-spec-key">Role</span>
              <span className="hero-spec-val">{PROFILE.title}</span>
            </div>
            <div className="hero-spec-row">
              <span className="hero-spec-key">Based</span>
              <span className="hero-spec-val">{PROFILE.location}</span>
            </div>
            <div className="hero-spec-row">
              <span className="hero-spec-key">Focus</span>
              <span className="hero-spec-val">AI agents · Automation · Web apps</span>
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#about" className="hero-scroll-cue" aria-label="Scroll to About section">
        Scroll
        <ChevronDown size={16} />
      </a>
    </header>
  );
}
