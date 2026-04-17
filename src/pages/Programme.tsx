/**
 * Page Programme du festival.
 * Affiche les activités triées par heure de début.
 * Bouton cœur ❤️ pour sauvegarder une activité en favori.
 * Toggle rappel pour les activités favorites (utilisateur connecté).
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { useActivites } from '../hooks/useFirestore'
import { useFavoris } from '../hooks/useFavoris'
import { useAuth } from '../contexts/AuthContext'
import type { Activite, TypeActivite } from '../types'
import styles from './Programme.module.css'

// -------------------------------------------------------
// Utilitaires
// -------------------------------------------------------

function formaterDate(dateIso: string): string {
  return new Date(dateIso + 'T12:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function classeType(type: TypeActivite): string {
  const map: Record<TypeActivite, string> = {
    initiation: styles.typeInitiation,
    atelier: styles.typeAtelier,
    sensibilisation: styles.typeSensibilisation,
  }
  return map[type]
}

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

interface CarteActiviteProps {
  activite: Activite
  isFavori: boolean
  rappelAccepte: boolean
  estConnecte: boolean
  onToggleFavori: () => void
  onSetRappel: (accept: boolean) => void
}

function CarteActivite({
  activite,
  isFavori,
  rappelAccepte,
  estConnecte,
  onToggleFavori,
  onSetRappel,
}: CarteActiviteProps) {
  const navigate = useNavigate()
  const [showLoginMsg, setShowLoginMsg] = useState(false)

  function handleHeartClick() {
    if (!estConnecte) {
      setShowLoginMsg(true)
      setTimeout(() => setShowLoginMsg(false), 3000)
      return
    }
    onToggleFavori()
  }

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

          {/* Bouton favori */}
          <button
            className={`${styles.btnFavori} ${isFavori ? styles.btnFavoriActif : ''}`}
            onClick={handleHeartClick}
            aria-label={isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            aria-pressed={isFavori}
            type="button"
          >
            {isFavori ? '❤️' : '🤍'}
          </button>
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
          <span className={`${styles.badge} ${classeType(activite.type)}`}>
            {libelleType(activite.type)}
          </span>
          {activite.publics.map((p) => (
            <span key={p} className={`${styles.badge} ${styles.badgePublic}`}>
              {p}
            </span>
          ))}
          {isFavori && rappelAccepte && (
            <span className={styles.badgeRappel}>🔔 Rappel activé</span>
          )}
        </div>

        {/* Message connexion requise */}
        {showLoginMsg && (
          <p className={styles.loginMsg}>
            <button
              className={styles.loginMsgBtn}
              onClick={() => navigate('/login')}
              type="button"
            >
              Connecte-toi
            </button>{' '}
            pour sauvegarder tes favoris
          </p>
        )}

        {/* Panel rappel — uniquement si favori + connecté */}
        {isFavori && estConnecte && (
          <div className={styles.rappelPanel}>
            <label className={styles.rappelLabel}>
              <input
                type="checkbox"
                checked={rappelAccepte}
                onChange={(e) => onSetRappel(e.target.checked)}
                className={styles.rappelCheckbox}
              />
              <span>J'accepte de recevoir un rappel pour cette activité</span>
            </label>
          </div>
        )}
      </div>
    </article>
  )
}

// -------------------------------------------------------
// Page principale
// -------------------------------------------------------

export default function Programme() {
  const { currentUser } = useAuth()
  const { data: activites, loading, error } = useActivites()

  const userPrenom = currentUser?.displayName?.split(' ')[0] ?? null
  const { favoriteIds, rappelIds, toggleFavori, setRappel } = useFavoris(
    currentUser?.uid ?? null,
    currentUser?.email ?? null,
    userPrenom,
  )

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
        {/* Légende */}
        <div className={styles.legende}>
          <span className={styles.legendeLabel} id="legende-label">Types d'activite :</span>
          <ul role="list" aria-labelledby="legende-label" className={styles.legendeListe}>
            <li role="listitem" className={`${styles.badge} ${styles.typeInitiation}`}>Initiation</li>
            <li role="listitem" className={`${styles.badge} ${styles.typeAtelier}`}>Atelier</li>
            <li role="listitem" className={`${styles.badge} ${styles.typeSensibilisation}`}>Sensibilisation</li>
          </ul>
        </div>

        {/* Liste des activités */}
        {activites && activites.length > 0 ? (
          <div className={styles.listeActivites}>
            {activites.map((activite) => (
              <CarteActivite
                key={activite.id}
                activite={activite}
                isFavori={favoriteIds.has(activite.id)}
                rappelAccepte={rappelIds.has(activite.id)}
                estConnecte={currentUser !== null}
                onToggleFavori={() => toggleFavori(activite.id)}
                onSetRappel={(accept) => setRappel(activite, accept)}
              />
            ))}
          </div>
        ) : (
          <p className={styles.vide}>Le programme n'est pas encore disponible.</p>
        )}
      </div>
    </main>
  )
}
