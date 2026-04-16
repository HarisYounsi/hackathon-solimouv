/**
 * Page Programme du festival.
 * Affiche les activités triées par heure avec filtrage par créneau.
 */

import LoadingSpinner from '../components/LoadingSpinner'
import { useActivites } from '../hooks/useFirestore'
import type { Activite } from '../types'
import styles from './Programme.module.css'

// -------------------------------------------------------
// Fonctions utilitaires de formatage des dates
// -------------------------------------------------------

/** Formate une date ISO en heure locale (ex: "10:00") */
function formaterHeure(dateIso: string): string {
  return new Date(dateIso).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Formate une date ISO en date complète (ex: "Samedi 15 juin") */
function formaterDate(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

/** Retourne la couleur de badge selon le niveau */
function couleurNiveau(niveau: Activite['niveau']): string {
  const couleurs: Record<Activite['niveau'], string> = {
    'Tous niveaux': styles.niveauTous,
    Débutant: styles.niveauDebutant,
    Intermédiaire: styles.niveauIntermediaire,
    Avancé: styles.niveauAvance,
  }
  return couleurs[niveau]
}

// -------------------------------------------------------
// Composant carte d'activité
// -------------------------------------------------------

function CarteActivite({ activite }: { activite: Activite }) {
  return (
    <article className={styles.carteActivite} aria-label={activite.titre}>
      {/* Heure */}
      <div className={styles.carteHeure}>
        <span className={styles.heureDebut}>{formaterHeure(activite.debut)}</span>
        <span className={styles.heureSeparateur}>→</span>
        <span className={styles.heureFin}>{formaterHeure(activite.fin)}</span>
      </div>

      {/* Contenu */}
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
          {/* Association */}
          <span className={styles.metaItem}>
            🤝 <em>{activite.association}</em>
          </span>
          {/* Lieu */}
          <span className={styles.metaItem}>
            📍 {activite.lieu}
          </span>
          {/* Places max */}
          {activite.placesMax && (
            <span className={styles.metaItem}>
              👥 {activite.placesMax} places max
            </span>
          )}
        </div>

        <div className={styles.carteTags}>
          {/* Niveau */}
          <span className={`${styles.badge} ${couleurNiveau(activite.niveau)}`}>
            {activite.niveau}
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

  if (loading) {
    return <LoadingSpinner message="Chargement du programme..." />
  }

  if (error) {
    return (
      <div className={styles.erreur} role="alert">
        <p>⚠️ Impossible de charger le programme : {error}</p>
      </div>
    )
  }

  // Récupérer la date du festival depuis la première activité
  const dateFestival = activites?.[0]
    ? formaterDate(activites[0].debut)
    : 'Jour du festival'

  return (
    <main className={styles.main}>
      {/* En-tête */}
      <div className={styles.entete}>
        <div className={styles.conteneur}>
          <span className={styles.tag}>Programme</span>
          <h1 className={styles.titre}>Programme du festival</h1>
          <p className={styles.soustitre}>
            📅 {dateFestival} — {activites?.length ?? 0} activités au programme
          </p>
        </div>
      </div>

      <div className={`${styles.conteneur} ${styles.corps}`}>
        {/* Légende des niveaux */}
        <div className={styles.legende} aria-label="Légende des niveaux">
          <span className={styles.legendeLabel}>Niveaux :</span>
          <span className={`${styles.badge} ${styles.niveauTous}`}>Tous niveaux</span>
          <span className={`${styles.badge} ${styles.niveauDebutant}`}>Débutant</span>
          <span className={`${styles.badge} ${styles.niveauIntermediaire}`}>Intermédiaire</span>
          <span className={`${styles.badge} ${styles.niveauAvance}`}>Avancé</span>
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
