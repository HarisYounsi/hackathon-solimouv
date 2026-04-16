/**
 * Page profil utilisateur (protegee).
 * Affiche les infos du profil Firestore : prenom, email, points, badges, sports favoris.
 */

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import type { Profil as ProfilType } from '../types'
import styles from './Profil.module.css'

export default function Profil() {
  const { currentUser, logout } = useAuth()
  const [profil, setProfil] = useState<ProfilType | null>(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    if (!currentUser) return

    const chargerProfil = async () => {
      try {
        const snap = await getDoc(doc(db, 'profils', currentUser.uid))
        if (snap.exists()) {
          setProfil({ id: snap.id, ...snap.data() } as ProfilType)
        }
      } finally {
        setChargement(false)
      }
    }

    chargerProfil()
  }, [currentUser])

  const prenomAffiche = profil?.prenom
    ?? currentUser?.displayName?.split(' ')[0]
    ?? 'Utilisateur'

  const emailAffiche = profil?.email ?? currentUser?.email ?? ''

  if (chargement) {
    return (
      <div className={styles.page}>
        <div className={styles.chargement}>Chargement du profil...</div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.conteneur}>
        {/* En-tete profil */}
        <div className={styles.entete}>
          <div className={styles.avatar}>
            {prenomAffiche.charAt(0).toUpperCase()}
          </div>
          <div className={styles.identite}>
            <h1 className={styles.nom}>
              {profil ? `${profil.prenom} ${profil.nom}` : prenomAffiche}
            </h1>
            <p className={styles.email}>{emailAffiche}</p>
          </div>
        </div>

        {/* Points gamification */}
        <div className={styles.carte}>
          <h2 className={styles.titreCarte}>Points Solimouv'</h2>
          <div className={styles.points}>
            <span className={styles.pointsValeur}>
              {profil?.points_gamification ?? 0}
            </span>
            <span className={styles.pointsLabel}>points</span>
          </div>
        </div>

        {/* Badges */}
        <div className={styles.carte}>
          <h2 className={styles.titreCarte}>Badges obtenus</h2>
          {profil?.badges && profil.badges.length > 0 ? (
            <ul className={styles.listeBadges} role="list">
              {profil.badges.map((badge) => (
                <li key={badge.id} className={styles.badge}>
                  <span className={styles.badgeEmoji}>{badge.emoji}</span>
                  <div>
                    <p className={styles.badgeNom}>{badge.nom}</p>
                    <p className={styles.badgeDesc}>{badge.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.vide}>
              Pas encore de badges. Participe aux activites pour en gagner !
            </p>
          )}
        </div>

        {/* Sports favoris */}
        <div className={styles.carte}>
          <h2 className={styles.titreCarte}>Sports favoris</h2>
          {profil?.sports_favoris && profil.sports_favoris.length > 0 ? (
            <ul className={styles.tags} role="list">
              {profil.sports_favoris.map((sport) => (
                <li key={sport} className={styles.tag}>{sport}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.vide}>
              Aucun sport favori. Utilise le quiz Sport Matcher pour en ajouter !
            </p>
          )}
        </div>

        {/* Bouton deconnexion */}
        <button
          className={styles.btnDeconnexion}
          onClick={logout}
          type="button"
        >
          Se deconnecter
        </button>
      </div>
    </div>
  )
}
