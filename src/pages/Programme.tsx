/**
 * Page Programme du festival.
 * Affiche les activités triées par heure de début.
 */

import LoadingSpinner from '../components/LoadingSpinner'
import { useActivites } from '../hooks/useFirestore'
import type { Activite, TypeActivite } from '../types'
import styles from './Programme.module.css'

// -------------------------------------------------------
// Utilitaires
// -------------------------------------------------------

/** Formate une date ISO "YYYY-MM-DD" en libellé français */
function formaterDate(dateIso: string): string {
  return new Date(dateIso + 'T12:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Badge couleur selon le type d'activité */
function classeType(type: TypeActivite): string {
  const map: Record<TypeActivite, string> = {
    initiation: styles.typeInitiation,
    atelier: styles.typeAtelier,
    sensibilisation: styles.typeSensibilisation,
  }
  return map[type]
}

/** Libellé affiché pour le type */
function libelleType(type: TypeActivite): string {
  const map: Record<TypeActivite, string> = {
    initiation: 'Initiation',
    atelier: 'Atelier',
    sensibilisation: 'Sensibilisation',
  }
  return map[type]
}

// -------------------------------------------------------
// Composant carte d'activité
// -------------------------------------------------------

function CarteActivite({ activite }: { activite: Activite }) {
  return (
    <article className={styles.carteActivite} aria-label={activite.titre}>
      {/* Colonne heure */}
      <div className={styles.carteHeure}>
        <span className={styles.heureDebut}>{activite.heure_debut}</span>
        <span className={styles.heureSeparateur}>→</span>
        <span className={styles.heureFin}>{activite.heure_fin}</span>
      </div>

      {/* Colonne contenu */}
      <div className={styles.carteCorps}>
        <div className={styles.carteTitreLigne}>
          {activite.emoji && (
            <span className={styles.carteEmoji} aria-hidden="true">
              {activite.emoji}
            </span>
          )}
          <h3 className={styles.carteTitre}>{activite.titre}</h3>
        </div>

        <p className={styles.carteDescription}>{activite.description}</p>

        <div className={styles.carteMeta}>
          <span className={styles.metaItem}>🤝 <em>{activite.association_nom}</em></span>
          <span className={styles.metaItem}>📍 {activite.lieu}</span>
          {activite.places_max && (
            <span className={styles.metaItem}>👥 {activite.places_max} places max</span>
          )}
        </div>

        <div className={styles.carteTags}>
          {/* Type d'activité */}
          <span className={`${styles.badge} ${classeType(activite.type)}`}>
            {libelleType(activite.type)}
          </span>
          {/* Publics */}
          {activite.publics.map((p) => (
            <span key={p} className={`${styles.badge} ${styles.badgePublic}`}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

// -------------------------------------------------------
// Page principale
// -------------------------------------------------------

export default function Programme() {
  const { data: activites, loading, error } = useActivites()

  if (loading) return <LoadingSpinner message="Chargement du programme..." />

  if (error) {
    return (
      <div className={styles.erreur} role="alert">
        <p>⚠️ Impossible de charger le programme : {error}</p>
      </div>
    )
  }

  return (
    <main className={styles.main}>
      {/* En-tête */}
      <div className={styles.entete}>
        <div className={styles.conteneur}>
          <span className={styles.tag}>Programme</span>
          <h1 className={styles.titre}>Programme du festival</h1>
          <p className={styles.soustitre}>
            📅 {activites?.[0] ? formaterDate('2024-06-15') : 'Jour du festival'}
            {' — '}{activites?.length ?? 0} activités au programme
          </p>
        </div>
      </div>

      <div className={`${styles.conteneur} ${styles.corps}`}>
        {/* Légende des types */}
        <div className={styles.legende} aria-label="Légende des types d'activité">
          <span className={styles.legendeLabel}>Types :</span>
          <span className={`${styles.badge} ${styles.typeInitiation}`}>Initiation</span>
          <span className={`${styles.badge} ${styles.typeAtelier}`}>Atelier</span>
          <span className={`${styles.badge} ${styles.typeSensibilisation}`}>Sensibilisation</span>
        </div>

        {/* Liste des activités */}
        {activites && activites.length > 0 ? (
          <div className={styles.listeActivites}>
            {activites.map((activite) => (
              <CarteActivite key={activite.id} activite={activite} />
            ))}
          </div>
        ) : (
          <p className={styles.vide}>Le programme n'est pas encore disponible.</p>
        )}
      </div>
    </main>
  )
}
