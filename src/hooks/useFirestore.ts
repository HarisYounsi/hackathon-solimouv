/**
 * Hooks personnalisés pour récupérer les données depuis Firestore.
 *
 * Pattern utilisé : chaque hook retourne { data, loading, error }
 * pour une gestion uniforme des états dans les composants.
 *
 * En développement (VITE_APP_ENV=development), les données mock
 * sont utilisées à la place de Firestore.
 */

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import {
  mockAssociations,
  mockActivites,
  mockInfosFestival,
} from '../firebase/mockData'
import type { Association, Activite, InfosFestival, LoadingState } from '../types'

// Détermine si on utilise les données mock ou Firestore réel
const USE_MOCK = import.meta.env.VITE_APP_ENV === 'development'

// -------------------------------------------------------
// HOOK : Liste des associations
// -------------------------------------------------------

/**
 * Récupère toutes les associations partenaires depuis Firestore.
 * Collection : /associations
 */
export function useAssociations(): LoadingState<Association[]> {
  const [state, setState] = useState<LoadingState<Association[]>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      // Mode développement : utiliser les données mock
      if (USE_MOCK) {
        // Simulation d'un délai réseau pour tester les états de chargement
        await new Promise((resolve) => setTimeout(resolve, 400))
        setState({ data: mockAssociations, loading: false, error: null })
        return
      }

      // Mode production : appel Firestore réel
      try {
        const snapshot = await getDocs(collection(db, 'associations'))
        const associations: Association[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Association[]
        setState({ data: associations, loading: false, error: null })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur inconnue'
        setState({ data: null, loading: false, error: message })
      }
    }

    fetchData()
  }, [])

  return state
}

// -------------------------------------------------------
// HOOK : Liste des activités du programme
// -------------------------------------------------------

/**
 * Récupère toutes les activités du programme depuis Firestore.
 * Collection : /activites
 * Les résultats sont triés par heure de début.
 */
export function useActivites(): LoadingState<Activite[]> {
  const [state, setState] = useState<LoadingState<Activite[]>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 400))
        // Tri par heure de début
        const sorted = [...mockActivites].sort(
          (a, b) => new Date(a.debut).getTime() - new Date(b.debut).getTime()
        )
        setState({ data: sorted, loading: false, error: null })
        return
      }

      try {
        const snapshot = await getDocs(collection(db, 'activites'))
        const activites: Activite[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Activite[]

        const sorted = activites.sort(
          (a, b) => new Date(a.debut).getTime() - new Date(b.debut).getTime()
        )
        setState({ data: sorted, loading: false, error: null })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur inconnue'
        setState({ data: null, loading: false, error: message })
      }
    }

    fetchData()
  }, [])

  return state
}

// -------------------------------------------------------
// HOOK : Infos pratiques du festival
// -------------------------------------------------------

/**
 * Récupère les informations pratiques du festival depuis Firestore.
 * Document : /config/infos
 */
export function useInfosFestival(): LoadingState<InfosFestival> {
  const [state, setState] = useState<LoadingState<InfosFestival>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 400))
        setState({ data: mockInfosFestival, loading: false, error: null })
        return
      }

      try {
        const docRef = doc(db, 'config', 'infos')
        const snapshot = await getDoc(docRef)

        if (snapshot.exists()) {
          const infos = { id: snapshot.id, ...snapshot.data() } as InfosFestival
          setState({ data: infos, loading: false, error: null })
        } else {
          setState({ data: null, loading: false, error: 'Infos introuvables' })
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur inconnue'
        setState({ data: null, loading: false, error: message })
      }
    }

    fetchData()
  }, [])

  return state
}
