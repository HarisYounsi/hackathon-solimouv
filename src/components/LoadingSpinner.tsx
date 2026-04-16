/**
 * Indicateur de chargement animé.
 * Affiché pendant les appels Firestore ou tout chargement asynchrone.
 */

import styles from './LoadingSpinner.module.css'

interface LoadingSpinnerProps {
  /** Message affiché sous le spinner */
  message?: string
}

export default function LoadingSpinner({
  message = 'Chargement en cours...',
}: LoadingSpinnerProps) {
  return (
    <div className={styles.conteneur} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </div>
  )
}
