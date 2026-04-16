/**
 * Contexte d'authentification Firebase pour toute l'application.
 *
 * Fournit :
 *   - currentUser     : l'utilisateur Firebase connecté (ou null)
 *   - loading         : true pendant la vérification initiale de session
 *   - login()         : connexion email + mot de passe
 *   - register()      : inscription + création du profil Firestore
 *   - loginWithGoogle(): connexion Google + création du profil si nouveau
 *   - logout()        : déconnexion
 */

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

// -------------------------------------------------------
// Types du contexte
// -------------------------------------------------------

interface AuthContextType {
  currentUser: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, prenom: string, nom: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

// -------------------------------------------------------
// Création du contexte
// -------------------------------------------------------

const AuthContext = createContext<AuthContextType | null>(null)

// Fournisseur du provider Google
const googleProvider = new GoogleAuthProvider()

// -------------------------------------------------------
// Fonction utilitaire : créer le profil Firestore si absent
// -------------------------------------------------------

async function creerProfilSiAbsent(
  uid: string,
  prenom: string,
  nom: string,
  email: string
): Promise<void> {
  const ref = doc(db, 'profils', uid)
  const snap = await getDoc(ref)

  // Ne pas écraser un profil existant (cas Google Sign-In sur compte existant)
  if (snap.exists()) return

  await setDoc(ref, {
    prenom,
    nom,
    email,
    avatar_url: '',
    sports_favoris: [],
    associations_suivies: [],
    reservations_ids: [],
    points_gamification: 0,
    badges: [],
    date_inscription: Timestamp.now(),
  })
}

// -------------------------------------------------------
// Provider
// -------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Écoute les changements d'état de connexion Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    // Nettoyage de l'écouteur au démontage
    return unsubscribe
  }, [])

  // --- Connexion email / mot de passe ---
  async function login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password)
  }

  // --- Inscription email / mot de passe ---
  async function register(
    email: string,
    password: string,
    prenom: string,
    nom: string
  ): Promise<void> {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    // Mettre à jour le displayName Firebase Auth
    await updateProfile(user, { displayName: `${prenom} ${nom}` })

    // Créer le document profil dans Firestore
    await creerProfilSiAbsent(user.uid, prenom, nom, email)
  }

  // --- Connexion Google ---
  async function loginWithGoogle(): Promise<void> {
    const { user } = await signInWithPopup(auth, googleProvider)

    // Extraire prénom / nom depuis le displayName Google
    const parts = (user.displayName ?? '').split(' ')
    const prenom = parts[0] ?? ''
    const nom = parts.slice(1).join(' ')
    const email = user.email ?? ''

    await creerProfilSiAbsent(user.uid, prenom, nom, email)
  }

  // --- Déconnexion ---
  async function logout(): Promise<void> {
    await signOut(auth)
  }

  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
  }

  // Ne rendre les enfants qu'une fois la session vérifiée
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// -------------------------------------------------------
// Hook d'accès au contexte
// -------------------------------------------------------

/**
 * Accède au contexte d'authentification depuis n'importe quel composant.
 * Doit être utilisé à l'intérieur d'un <AuthProvider>.
 */
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth doit etre utilise a l\'interieur d\'un <AuthProvider>')
  }
  return ctx
}
