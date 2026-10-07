import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export const render = () => renderToString(<App />)
export { PROFILE, SERVICES, PROJECTS, SKILL_GROUPS, TIMELINE } from './data/content.js'
