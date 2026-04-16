/**
 * Point d'entrée de l'application Solimouv'
 * Enregistre le service worker PWA et monte le composant App.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

// Enregistrement du service worker pour le fonctionnement PWA offline
// Le service worker est généré automatiquement par vite-plugin-pwa (Workbox)
registerSW({
  onNeedRefresh() {
    // Une nouvelle version de l'app est disponible
    // TODO: Afficher une notification à l'utilisateur
    console.info('Nouvelle version disponible, rechargement...')
  },
  onOfflineReady() {
    // L'app est maintenant disponible offline
    console.info("L'application est disponible hors ligne.")
  },
})

// Montage de l'application React dans le DOM
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Élément root introuvable dans le DOM')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
