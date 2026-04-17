/**
 * Hook useFavoris — gestion des activités favorites et rappels.
 *
 * Firestore : /profils/{userId}/activites_favorites/{activiteId}
 * Mock mode (VITE_APP_ENV=development) : état local en mémoire uniquement.
 */

import { useState, useEffect, useCallback } from 'react'
import { collection, doc, setDoc, deleteDoc, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import type { Activite } from '../types'
import { sendRappelWebhook } from '../services/makeWebhook'

const USE_MOCK = import.meta.env.VITE_APP_ENV === 'development'

// ── Type document favori ─────────────────────────────────────

export interface FavoriDoc {
  activite_id: string
  activite_titre: string
  heure_debut: string
  heure_fin: string
  lieu: string
  association_nom: string
  emoji?: string
  rappel_accepte: boolean
  user_email: string
  added_at: Timestamp
}

// ── Hook ─────────────────────────────────────────────────────

export function useFavoris(
  userId: string | null,
  userEmail: string | null,
  userPrenom: string | null,
) {
  const [favoris, setFavoris] = useState<Record<string, FavoriDoc>>({})
  const [loading, setLoading] = useState(true)

  // Chargement initial depuis Firestore
  useEffect(() => {
    if (!userId) {
      setFavoris({})
      setLoading(false)
      return
    }
    if (USE_MOCK) {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const snap = await getDocs(
          collection(db, 'profils', userId, 'activites_favorites'),
        )
        const map: Record<string, FavoriDoc> = {}
        snap.docs.forEach((d) => {
          map[d.id] = d.data() as FavoriDoc
        })
        setFavoris(map)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [userId])

  // Ajouter / retirer un favori
  const toggleFavori = useCallback(
    async (activite: Activite) => {
      if (!userId) return

      if (activite.id in favoris) {
        // Retirer
        setFavoris((prev) => {
          const next = { ...prev }
          delete next[activite.id]
          return next
        })
        if (!USE_MOCK) {
          await deleteDoc(
            doc(db, 'profils', userId, 'activites_favorites', activite.id),
          )
        }
      } else {
        // Ajouter
        const favDoc: FavoriDoc = {
          activite_id:    activite.id,
          activite_titre: activite.titre,
          heure_debut:    activite.heure_debut,
          heure_fin:      activite.heure_fin,
          lieu:           activite.lieu,
          association_nom: activite.association_nom,
          emoji:          activite.emoji,
          rappel_accepte: false,
          user_email:     userEmail ?? '',
          added_at:       Timestamp.now(),
        }
        setFavoris((prev) => ({ ...prev, [activite.id]: favDoc }))
        if (!USE_MOCK) {
          await setDoc(
            doc(db, 'profils', userId, 'activites_favorites', activite.id),
            favDoc,
          )
        }
      }
    },
    [userId, favoris, userEmail],
  )

  // Activer / désactiver le rappel d'une activité favorite
  const setRappel = useCallback(
    async (activite: Activite, accept: boolean) => {
      if (!userId || !(activite.id in favoris)) return

      const updated: FavoriDoc = { ...favoris[activite.id], rappel_accepte: accept }
      setFavoris((prev) => ({ ...prev, [activite.id]: updated }))

      if (!USE_MOCK) {
        await setDoc(
          doc(db, 'profils', userId, 'activites_favorites', activite.id),
          updated,
        )
      }

      if (accept) {
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
    [userId, favoris, userEmail, userPrenom],
  )

  // Retirer un favori depuis la page /mes-favoris (par ID uniquement)
  const removeFavori = useCallback(
    async (activiteId: string) => {
      if (!userId) return
      setFavoris((prev) => {
        const next = { ...prev }
        delete next[activiteId]
        return next
      })
      if (!USE_MOCK) {
        await deleteDoc(
          doc(db, 'profils', userId, 'activites_favorites', activiteId),
        )
      }
    },
    [userId],
  )

  return { favoris, loading, toggleFavori, setRappel, removeFavori }
}
