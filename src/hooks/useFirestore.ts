/**
 * Hooks personnalisés pour récupérer les données depuis Firestore.
 * Chaque hook retourne { data, loading, error }.
 *
 * En mode VITE_APP_ENV=development → données mock locales.
 * En mode production → appels Firestore réels.
 */

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, getDoc, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/config'
import { mockAssociations, mockActivites, mockInfosFestival, mockQuizQuestions } from '../firebase/mockData'
import type { Association, Activite, InfosFestival, QuizQuestion, LoadingState } from '../types'

const USE_MOCK = import.meta.env.VITE_APP_ENV === 'development'

// -------------------------------------------------------
// HOOK : Associations (triées par champ `ordre`)
// -------------------------------------------------------

export function useAssociations(): LoadingState<Association[]> {
  const [state, setState] = useState<LoadingState<Association[]>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 400))
        const sorted = [...mockAssociations].sort((a, b) => a.ordre - b.ordre)
        setState({ data: sorted, loading: false, error: null })
        return
      }

      try {
        const q = query(collection(db, 'associations'), orderBy('ordre'))
        const snapshot = await getDocs(q)
        const data: Association[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Association[]
        setState({ data, loading: false, error: null })
      } catch (err) {
        setState({ data: null, loading: false, error: err instanceof Error ? err.message : 'Erreur inconnue' })
      }
    }

    fetchData()
  }, [])

  return state
}

// -------------------------------------------------------
// HOOK : Activités (triées par heure_debut)
// -------------------------------------------------------

export function useActivites(): LoadingState<Activite[]> {
  const [state, setState] = useState<LoadingState<Activite[]>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 400))
        const sorted = [...mockActivites].sort((a, b) =>
          a.heure_debut.localeCompare(b.heure_debut)
        )
        setState({ data: sorted, loading: false, error: null })
        return
      }

      try {
        const q = query(collection(db, 'activites'), orderBy('heure_debut'))
        const snapshot = await getDocs(q)
        const data: Activite[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Activite[]
        setState({ data, loading: false, error: null })
      } catch (err) {
        setState({ data: null, loading: false, error: err instanceof Error ? err.message : 'Erreur inconnue' })
      }
    }

    fetchData()
  }, [])

  return state
}

// -------------------------------------------------------
// HOOK : Questions du quiz Sport Matcher (triées par ordre)
// -------------------------------------------------------

export function useQuiz(): LoadingState<QuizQuestion[]> {
  const [state, setState] = useState<LoadingState<QuizQuestion[]>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300))
        const sorted = [...mockQuizQuestions].sort((a, b) => a.ordre - b.ordre)
        setState({ data: sorted, loading: false, error: null })
        return
      }

      try {
        const q = query(collection(db, 'quiz'), orderBy('ordre'))
        const snapshot = await getDocs(q)
        const data: QuizQuestion[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as QuizQuestion[]
        setState({ data, loading: false, error: null })
      } catch (err) {
        setState({ data: null, loading: false, error: err instanceof Error ? err.message : 'Erreur inconnue' })
      }
    }

    fetchData()
  }, [])

  return state
}

// -------------------------------------------------------
// HOOK : Infos pratiques du festival
// -------------------------------------------------------

export function useInfosFestival(): LoadingState<InfosFestival> {
  const [state, setState] = useState<LoadingState<InfosFestival>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 400))
        setState({ data: mockInfosFestival, loading: false, error: null })
        return
      }

      try {
        const snapshot = await getDoc(doc(db, 'config', 'infos'))
        if (snapshot.exists()) {
          setState({ data: { id: snapshot.id, ...snapshot.data() } as InfosFestival, loading: false, error: null })
        } else {
          setState({ data: null, loading: false, error: 'Document infos introuvable' })
        }
      } catch (err) {
        setState({ data: null, loading: false, error: err instanceof Error ? err.message : 'Erreur inconnue' })
      }
    }

    fetchData()
  }, [])

  return state
}
