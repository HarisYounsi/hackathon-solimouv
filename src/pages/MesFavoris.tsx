/**
 * Page /mes-favoris — liste des activités sauvegardées par l'utilisateur.
 * Protégée : accessible uniquement si connecté.
 */

import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useFavoris } from '../hooks/useFavoris'
import styles from './MesFavoris.module.css'

export default function MesFavoris() {
  const { currentUser } = useAuth()

  const userPrenom = currentUser?.displayName?.split(' ')[0] ?? null
  const { favoris, loading, removeFavori } = useFavoris(
    currentUser?.uid ?? null,
    currentUser?.email ?? null,
    userPrenom,
  )

  const items = Object.values(favoris).sort((a, b) =>
    a.heure_debut.localeCompare(b.heure_debut),
  )

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
        ) : items.length === 0 ? (
          <div className={styles.vide}>
            <p>Aucune activité sauvegardée pour l'instant.</p>
            <Link to="/programme" className={styles.btnProgramme}>
              Voir le programme →
            </Link>
          </div>
        ) : (
          <ul className={styles.liste} role="list">
            {items.map((item) => (
              <li key={item.activite_id} className={styles.carte} role="listitem">
                <div className={styles.carteHeader}>
                  <div className={styles.carteHeure}>{item.heure_debut}</div>
                  <div className={styles.carteTitre}>
                    {item.emoji && (
                      <span aria-hidden="true">{item.emoji} </span>
                    )}
                    {item.activite_titre}
                  </div>
                  {item.rappel_accepte && (
                    <span className={styles.badgeRappel} title="Rappel activé">🔔</span>
                  )}
                </div>

                <div className={styles.carteMeta}>
                  <span>📍 {item.lieu}</span>
                  <span>🤝 {item.association_nom}</span>
                  <span>⏱ {item.heure_debut} – {item.heure_fin}</span>
                </div>

                <button
                  className={styles.btnRetirer}
                  onClick={() => removeFavori(item.activite_id)}
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
