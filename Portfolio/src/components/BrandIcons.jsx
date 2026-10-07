import { siGithub, siWhatsapp, siFiverr, siGmail } from 'simple-icons'

const fromSimple = (icon) =>
  function BrandIcon({ size = 20, ...p }) {
    return (
      <svg role="img" aria-label={icon.title} viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...p}>
        <path d={icon.path} />
      </svg>
    )
  }

export const GithubIcon = fromSimple(siGithub)
export const WhatsAppIcon = fromSimple(siWhatsapp)
export const FiverrIcon = fromSimple(siFiverr)
export const GmailIcon = fromSimple(siGmail)

// simple-icons no longer ships LinkedIn, so this is the standard "in" glyph drawn by hand.
export function LinkedInIcon({ size = 20, ...p }) {
  return (
    <svg role="img" aria-label="LinkedIn" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...p}>
      <circle cx="5.9" cy="5.3" r="2.2" />
      <path d="M3.9 9h4v11.2h-4zM10 9h3.8v1.6c.6-1.1 1.9-1.9 3.6-1.9 3.1 0 3.6 2.1 3.6 4.7v6.8h-4v-6c0-1.4 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v6.1h-4z" />
    </svg>
  )
}
