// Build-time SEO plugin.
// Single source of truth = src/data/content.js. At build (and dev) time it:
//   1. injects crawlable, semantic HTML into #root (React replaces it on load),
//   2. injects JSON-LD structured data (WebSite, ProfilePage, Person, Services, Projects),
//   3. emits sitemap.xml with a fresh <lastmod>.
import { PROFILE, NAV_LINKS, ABOUT, SKILL_GROUPS, SERVICES, PROJECTS, TIMELINE } from './src/data/content.js'

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const ul = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`

function fallbackHtml() {
  const projects = PROJECTS.map(
    (p) => `<article><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
      <p><strong>Problem:</strong> ${esc(p.problem)}</p><p><strong>Solution:</strong> ${esc(p.solution)}</p>
      ${ul(p.features)}<p>Technologies: ${esc(p.tags.join(', '))}</p>
      ${p.link ? `<p><a href="${esc(p.link)}" rel="noopener">${esc(p.linkLabel)}: ${esc(p.title)}</a></p>` : ''}</article>`,
  ).join('')
  const services = SERVICES.map((s) => `<article><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p>${ul(s.points)}</article>`).join('')
  const skills = SKILL_GROUPS.map((g) => `<article><h3>${esc(g.title)}</h3><p>${esc(g.description)}</p>${ul(g.items)}</article>`).join('')
  const timeline = TIMELINE.map((t) => `<article><h3>${esc(t.title)}</h3><p>${esc(t.place)} · ${esc(t.date)}</p>${ul(t.bullets)}</article>`).join('')
  return `<div class="seo-static" style="max-width:56rem;margin:0 auto;padding:6rem 1.25rem;font-family:system-ui,sans-serif;line-height:1.6;color:#d4d4d8">
<header><nav aria-label="Main">${NAV_LINKS.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join(' · ')}</nav></header>
<main>
<section id="home"><h1>${esc(PROFILE.name)} — ${esc(PROFILE.title)} in ${esc(PROFILE.location)}</h1><p>${esc(PROFILE.tagline)}</p></section>
<section id="about"><h2>About ${esc(PROFILE.name)}</h2>${ABOUT.intro.map((p) => `<p>${esc(p)}</p>`).join('')}<h3>Interests</h3>${ul(ABOUT.interests)}</section>
<section id="skills"><h2>Skills &amp; Technologies</h2>${skills}</section>
<section id="services"><h2>AI, Automation &amp; Web Development Services</h2>${services}</section>
<section id="projects"><h2>Selected Projects</h2>${projects}</section>
<section id="experience"><h2>Experience &amp; Education</h2>${timeline}</section>
<section id="contact"><h2>Contact ${esc(PROFILE.name)}</h2><ul>
<li><a href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a></li>
<li><a href="${esc(PROFILE.whatsappLink)}" rel="noopener">WhatsApp ${esc(PROFILE.whatsapp)}</a></li>
<li><a href="${esc(PROFILE.linkedin)}" rel="me noopener">LinkedIn</a></li>
<li><a href="${esc(PROFILE.github)}" rel="me noopener">GitHub</a></li>
<li><a href="${esc(PROFILE.fiverr)}" rel="me noopener">Fiverr</a></li></ul></section>
</main>
<footer>© ${new Date().getFullYear()} ${esc(PROFILE.name)} · ${esc(PROFILE.location)}</footer>
</div>`
}

function jsonLd() {
  const url = PROFILE.siteUrl + '/'
  const personId = url + '#person'
  const graph = [
    { '@type': 'WebSite', '@id': url + '#website', url, name: `${PROFILE.name} — Portfolio`, inLanguage: 'en', publisher: { '@id': personId } },
    {
      '@type': 'ProfilePage', '@id': url + '#profilepage', url, name: `${PROFILE.name} — ${PROFILE.title}`,
      isPartOf: { '@id': url + '#website' }, mainEntity: { '@id': personId },
      primaryImageOfPage: { '@type': 'ImageObject', url: PROFILE.siteUrl + '/og-image.png', width: 1200, height: 630 },
    },
    {
      '@type': 'Person', '@id': personId, name: PROFILE.name, givenName: PROFILE.firstName, familyName: PROFILE.lastName,
      jobTitle: PROFILE.title, url, image: PROFILE.siteUrl + '/icon-512.png', email: `mailto:${PROFILE.email}`,
      description: PROFILE.tagline,
      address: { '@type': 'PostalAddress', addressLocality: 'Faisalabad', addressRegion: 'Punjab', addressCountry: 'PK' },
      knowsAbout: [...new Set(SKILL_GROUPS.flatMap((g) => g.items))],
      alumniOf: { '@type': 'EducationalOrganization', name: 'Punjab Group of Colleges' },
      sameAs: [PROFILE.linkedin, PROFILE.github, PROFILE.fiverr],
    },
    {
      '@type': 'ProfessionalService', '@id': url + '#service', name: `${PROFILE.name} — AI & Web Development`, url,
      image: PROFILE.siteUrl + '/og-image.png', provider: { '@id': personId },
      areaServed: 'Worldwide', address: { '@type': 'PostalAddress', addressLocality: 'Faisalabad', addressCountry: 'PK' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Services',
        itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.description } })),
      },
    },
    {
      '@type': 'ItemList', '@id': url + '#projects', name: 'Selected projects',
      itemListElement: PROJECTS.map((p, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'CreativeWork', name: p.title, description: p.description, keywords: p.tags.join(', '), creator: { '@id': personId }, ...(p.link ? { url: p.link } : {}) },
      })),
    },
  ]
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`
}

import fs from 'node:fs'
import path from 'node:path'

export default function seoPlugin() {
  let outDir = 'dist'
  return {
    name: 'portfolio-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replaceAll('%SITE_URL%', PROFILE.siteUrl).replace('<!--SEO_JSON_LD-->', jsonLd()).replace('<!--SEO_FALLBACK-->', fallbackHtml())
      },
    },
    configResolved(cfg) { outDir = path.resolve(cfg.root, cfg.build.outDir) },
    // closeBundle runs AFTER public/ is copied, so stale public/sitemap.xml or
    // public/robots.txt files can never override these generated ones.
    closeBundle() {
      const lastmod = new Date().toISOString().slice(0, 10)
      fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${PROFILE.siteUrl}/sitemap.xml\n`)
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${PROFILE.siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image><image:loc>${PROFILE.siteUrl}/og-image.png</image:loc></image:image>
  </url>
</urlset>
`)
    },
  }
}
