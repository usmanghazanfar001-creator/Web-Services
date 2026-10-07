// Pre-renders the React app to static HTML + injects JSON-LD so crawlers (Google, Bing,
// social scrapers, AI bots) see full content without running JavaScript.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE = 'https://usmanghazanfar.vercel.app'
const server = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href)
const { render, PROFILE, SERVICES, PROJECTS, SKILL_GROUPS, TIMELINE } = server

const edu = TIMELINE.find((t) => t.type === 'education')
const exp = TIMELINE.find((t) => t.type === 'experience')

const jsonld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: PROFILE.name,
      url: `${SITE}/`,
      image: `${SITE}/og-image.jpg`,
      jobTitle: PROFILE.title,
      description: PROFILE.tagline,
      email: `mailto:${PROFILE.email}`,
      telephone: PROFILE.phone,
      address: { '@type': 'PostalAddress', addressLocality: 'Faisalabad', addressRegion: 'Punjab', addressCountry: 'PK' },
      sameAs: [PROFILE.linkedin, PROFILE.github, PROFILE.fiverr],
      knowsAbout: [...new Set(SKILL_GROUPS.flatMap((g) => g.items))],
      alumniOf: { '@type': 'EducationalOrganization', name: edu.place.split(' · ')[0] },
      worksFor: { '@type': 'Organization', name: exp.place.split(' · ')[0] },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: `${PROFILE.name} — Portfolio`,
      inLanguage: 'en',
      publisher: { '@id': `${SITE}/#person` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE}/#service`,
      name: `${PROFILE.name} — AI & Web Development`,
      url: `${SITE}/`,
      image: `${SITE}/og-image.jpg`,
      email: PROFILE.email,
      telephone: PROFILE.phone,
      areaServed: 'Worldwide',
      address: { '@type': 'PostalAddress', addressLocality: 'Faisalabad', addressCountry: 'PK' },
      founder: { '@id': `${SITE}/#person` },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: s.description },
        })),
      },
    },
    {
      '@type': 'ItemList',
      name: 'Projects',
      itemListElement: PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.title,
          description: p.description,
          keywords: p.tags.join(', '),
          creator: { '@id': `${SITE}/#person` },
          ...(p.link ? { url: p.link } : {}),
        },
      })),
    },
  ],
}

const file = path.resolve('dist/index.html')
let html = fs.readFileSync(file, 'utf8')
html = html
  .replace('<!--app-->', render())
  .replace('<!--jsonld-->', `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>`)
fs.writeFileSync(file, html)
fs.rmSync('dist-server', { recursive: true, force: true })
console.log(`Pre-rendered ${(html.length / 1024).toFixed(1)} KB index.html with JSON-LD`)
