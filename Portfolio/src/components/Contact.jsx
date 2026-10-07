import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Reveal from './Reveal';
import { PROFILE } from '../data/content';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text =
      `New inquiry from portfolio website\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Subject: ${form.subject}\n\n` +
      `Message:\n${form.message}`;

    const whatsappUrl = `${PROFILE.whatsappLink}?text=${encodeURIComponent(text)}`;

    setStatus('Redirecting you to WhatsApp to send your inquiry…');
    setForm(initialForm);

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">
              <span className="bar" />
              Get in touch
            </span>
            <h2 className="section-title">Contact</h2>
          </div>
          <p className="section-note">Have a project in mind? Let's build something together.</p>
        </div>

        <div className="contact-grid">
          <Reveal as="form" className="contact-form glass" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
              Send via WhatsApp
            </button>

            {status && <p className="form-status" role="status">{status}</p>}
          </Reveal>

          <Reveal delay={0.1} className="contact-side">
            <div className="contact-lead">
              <h3>
                Have a project in mind?
                <br />
                Let's build something together.
              </h3>
              <p>Reach out directly and I'll get back to you as soon as I can.</p>
            </div>

            <div className="contact-info glass">
              <a className="contact-item" href={`mailto:${PROFILE.email}`}>
                <span className="icon-box">
                  <Mail size={16} />
                </span>
                {PROFILE.email}
              </a>
              <a className="contact-item" href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}>
                <span className="icon-box">
                  <Phone size={16} />
                </span>
                {PROFILE.phone}
              </a>
              <a
                className="contact-item"
                href={PROFILE.whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon-box">
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                </span>
                {PROFILE.whatsapp} (WhatsApp)
              </a>
              <span className="contact-item" style={{ cursor: 'default' }}>
                <span className="icon-box">
                  <MapPin size={16} />
                </span>
                {PROFILE.location}
              </span>
              <a
                className="contact-item"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon-box">
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
                </span>
                {PROFILE.linkedinLabel}
              </a>
              <a
                className="contact-item"
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon-box">
                  <i className="fa-brands fa-github" aria-hidden="true" />
                </span>
                {PROFILE.githubLabel}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
