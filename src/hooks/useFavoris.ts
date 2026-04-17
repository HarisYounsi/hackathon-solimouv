/**
 * Hook useFavoris — gestion des activités favorites et rappels.
 *
 * Structure Firestore :
 *   - Favoris  → champ activites_favorites: string[] dans /profils/{userId}
 *   - Rappels  → document dans /reservations (rappel_accepte: true)
 *
 * Mock mode (VITE_APP_ENV=development) : état local en mémoire uniquement.
 */

import { useState, useEffect, useCallback } from 'react'
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import type { Activite } from '../types'
import { sendRappelWebhook } from '../services/makeWebhook'

const USE_MOCK = import.meta.env.VITE_APP_ENV === 'development'

export function useFavoris(
  userId: string | null,
  userEmail: string | null,
  userPrenom: string | null,
) {
  // IDs des activités favorites (depuis profils/{userId}.activites_favorites[])
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  // Rappels activés dans la session courante (en mémoire)
  const [rappelIds, setRappelIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  // Lecture initiale du champ activites_favorites dans le doc profil
  useEffect(() => {
    if (!userId) {
      setFavoriteIds(new Set())
      setLoading(false)
      return
    }
    if (USE_MOCK) {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'profils', userId))
        if (snap.exists()) {
          const ids: string[] = snap.data().activites_favorites ?? []
          setFavoriteIds(new Set(ids))
        }
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [userId])

  /**
   * Ajouter / retirer un favori.
   * Met à jour activites_favorites[] dans /profils/{userId} via arrayUnion / arrayRemove.
   * Utilise setDoc({ merge: true }) pour être sûr même si le doc profil n'a pas encore le champ.
   */
  const toggleFavori = useCallback(
    async (activiteId: string) => {
      if (!userId) return

      const estFavori = favoriteIds.has(activiteId)

      // Mise à jour optimiste
      setFavoriteIds((prev) => {
        const next = new Set(prev)
        estFavori ? next.delete(activiteId) : next.add(activiteId)
        return next
      })

      // Effacer le rappel local si on retire le favori
      if (estFavori) {
        setRappelIds((prev) => {
          const next = new Set(prev)
          next.delete(activiteId)
          return next
        })
      }

      if (!USE_MOCK) {
        await setDoc(
          doc(db, 'profils', userId),
          {
            activites_favorites: estFavori
              ? arrayRemove(activiteId)
              : arrayUnion(activiteId),
          },
          { merge: true },
        )
      }
    },
    [userId, favoriteIds],
  )

  /**
   * Activer / désactiver le rappel d'une activité favorite.
   * Si accept = true → crée un document dans /reservations (rappel_accepte: true)
   *                  → envoie le webhook Make.
   */
  const setRappel = useCallback(
    async (activite: Activite, accept: boolean) => {
      if (!userId) return

      // Mise à jour locale immédiate
      setRappelIds((prev) => {
        const next = new Set(prev)
        accept ? next.add(activite.id) : next.delete(activite.id)
        return next
      })

      if (accept) {
        if (!USE_MOCK) {
          await addDoc(collection(db, 'reservations'), {
            user_email:      userEmail ?? '',
            user_nom:        userPrenom ?? '',
            activite_id:     activite.id,
            activite_titre:  activite.titre,
            association_nom: activite.association_nom,
            heure_debut:     activite.heure_debut,
            heure_fin:       activite.heure_fin,
            statut:          'confirmee',
            date_reservation: Timestamp.now(),
            notif_envoyee:   false,
            rappel_accepte:  true,
          })
        }

        await sendRappelWebhook({
          prenom:         userPrenom ?? '',
          email:          userEmail ?? '',
          activite_titre: activite.titre,
          heure_debut:    activite.heure_debut,
          lieu:           activite.lieu,
          timestamp:      new Date().toISOString(),
        })
      }
    },
    [userId, userEmail, userPrenom],
  )

  return { favoriteIds, rappelIds, loading, toggleFavori, setRappel }
}
