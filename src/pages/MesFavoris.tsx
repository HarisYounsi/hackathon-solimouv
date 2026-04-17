/**
 * Page /mes-favoris — liste des activités sauvegardées par l'utilisateur.
 * Protégée : accessible uniquement si connecté.
 *
 * Les IDs sont lus depuis profils/{userId}.activites_favorites[].
 * Les détails des activités viennent de useActivites().
 */

import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useActivites } from '../hooks/useFirestore'
import { useFavoris } from '../hooks/useFavoris'
import styles from './MesFavoris.module.css'

export default function MesFavoris() {
  const { currentUser } = useAuth()

  const userPrenom = currentUser?.displayName?.split(' ')[0] ?? null
  const { data: activites, loading: loadingActivites } = useActivites()
  const { favoriteIds, rappelIds, loading: loadingFavoris, toggleFavori } = useFavoris(
    currentUser?.uid ?? null,
    currentUser?.email ?? null,
    userPrenom,
  )

  const loading = loadingActivites || loadingFavoris

  // Activités dont l'ID est dans favoriteIds, triées par heure de début
  const favorites = (activites ?? [])
    .filter((a) => favoriteIds.has(a.id))
    .sort((a, b) => a.heure_debut.localeCompare(b.heure_debut))

  return (
    <div className={styles.page}>
      <div className={styles.conteneur}>

        {/* En-tête */}
        <div className={styles.entete}>
          <Link to="/profil" className={styles.retour}>← Mon profil</Link>
          <h1 className={styles.titre}>Mes favoris ❤️</h1>
          <p className={styles.sousTitre}>Les activités que tu as sauvegardées</p>
        </div>

        {/* Contenu */}
        {loading ? (
          <p className={styles.chargement}>Chargement…</p>
        ) : favorites.length === 0 ? (
          <div className={styles.vide}>
            <p>Aucune activité sauvegardée pour l'instant.</p>
            <Link to="/programme" className={styles.btnProgramme}>
              Voir le programme →
            </Link>
          </div>
        ) : (
          <ul className={styles.liste} role="list">
            {favorites.map((activite) => (
              <li key={activite.id} className={styles.carte} role="listitem">
                <div className={styles.carteHeader}>
                  <div className={styles.carteHeure}>{activite.heure_debut}</div>
                  <div className={styles.carteTitre}>
                    {activite.emoji && <span aria-hidden="true">{activite.emoji} </span>}
                    {activite.titre}
                  </div>
                  {rappelIds.has(activite.id) && (
                    <span className={styles.badgeRappel} title="Rappel activé">🔔</span>
                  )}
                </div>

                <div className={styles.carteMeta}>
                  <span>📍 {activite.lieu}</span>
                  <span>🤝 {activite.association_nom}</span>
                  <span>⏱ {activite.heure_debut} – {activite.heure_fin}</span>
                </div>

                <button
                  className={styles.btnRetirer}
                  onClick={() => toggleFavori(activite.id)}
                  type="button"
                >
                  Retirer des favoris
                </button>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  )
}
