/**
 * Composant Card générique et réutilisable.
 * Utilisé pour afficher les associations, les activités du programme, etc.
 */

import styles from './Card.module.css'

interface CardProps {
  /** Titre principal de la carte */
  titre: string
  /** Texte descriptif */
  description: string
  /** Emoji ou icône en haut de la carte */
  emoji?: string
  /** Tags/badges affichés en bas de la carte */
  tags?: string[]
  /** Contenu supplémentaire (ex: liens, boutons) */
  children?: React.ReactNode
  /** Classe CSS supplémentaire */
  className?: string
}

export default function Card({
  titre,
  description,
  emoji,
  tags,
  children,
  className,
}: CardProps) {
  return (
    <article className={`${styles.card} ${className ?? ''}`}>
      {/* Emoji / icône */}
      {emoji && (
        <div className={styles.emoji} role="img" aria-label={titre}>
          {emoji}
        </div>
      )}

      {/* Contenu principal */}
      <div className={styles.corps}>
        <h3 className={styles.titre}>{titre}</h3>
        <p className={styles.description}>{description}</p>

        {/* Tags / badges */}
        {tags && tags.length > 0 && (
          <div className={styles.tags} role="list" aria-label="Catégories">
            {tags.map((tag) => (
              <span key={tag} className={styles.tag} role="listitem">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Contenu optionnel (boutons, liens, etc.) */}
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </article>
  )
}
