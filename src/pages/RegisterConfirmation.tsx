/**
 * Page de confirmation après inscription réussie.
 * Redirige automatiquement vers l'accueil après 3 secondes.
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './RegisterConfirmation.module.css'

export default function RegisterConfirmation() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true })
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <main className={styles.page}>
      {/* Décorations de coins */}
      <div className={styles.decoTopRight} aria-hidden="true" />
      <div className={styles.decoTopRightSmall} aria-hidden="true" />
      <div className={styles.decoBottomLeft} aria-hidden="true" />
      <div className={styles.decoBottomRight} aria-hidden="true" />
      <div className={styles.decoTopLeft} aria-hidden="true" />

      <div className={styles.contenu}>
        {/* Badge checkmark */}
        <div className={styles.checkWrap} aria-hidden="true">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            {/* Forme étoilée / badge */}
            <path
              d="M40 4L47.3 15.5L60.5 12L62 25.5L74 32L67.5 44L74 56L62 62.5L60.5 76L47.3 72.5L40 84L32.7 72.5L19.5 76L18 62.5L6 56L12.5 44L6 32L18 25.5L19.5 12L32.7 15.5L40 4Z"
              fill="#1e1e1e"
            />
            <path
              d="M27 40L36 49L54 31"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Titre */}
        <h1 className={styles.titre}>Compte créé!</h1>

        {/* Sous-titre */}
        <p className={styles.sousTitre}>
          Bienvenue sur Solimouv, viens découvrir ce qu'il y a au programme
        </p>
      </div>
    </main>
  )
}
