/**
 * Page d'inscription.
 * Formulaire prénom, nom, email, mot de passe + Google Sign-In.
 * Crée un compte Firebase Auth + profil Firestore à la validation.
 */

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { FirebaseError } from 'firebase/app'
import { useAuth } from '../contexts/AuthContext'
import styles from './Auth.module.css'

function messageErreur(code: string): string {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': "Un compte existe deja avec cet email.",
    'auth/invalid-email': "Adresse email invalide.",
    'auth/weak-password': "Mot de passe trop faible (6 caracteres minimum).",
    'auth/network-request-failed': "Probleme de connexion reseau.",
    'auth/popup-closed-by-user': "Connexion Google annulee.",
  }
  return messages[code] ?? "Une erreur est survenue. Veuillez reessayer."
}

export default function Register() {
  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)
  const [chargementGoogle, setChargementGoogle] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErreur('')

    if (password.length < 6) {
      setErreur("Le mot de passe doit contenir au moins 6 caracteres.")
      return
    }

    setChargement(true)
    try {
      await register(email, password, prenom.trim(), nom.trim())
      navigate('/', { replace: true })
    } catch (err) {
      const fbErr = err as FirebaseError
      setErreur(messageErreur(fbErr.code))
    } finally {
      setChargement(false)
    }
  }

  async function handleGoogle() {
    setErreur('')
    setChargementGoogle(true)
    try {
      await loginWithGoogle()
      navigate('/', { replace: true })
    } catch (err) {
      const fbErr = err as FirebaseError
      setErreur(messageErreur(fbErr.code))
    } finally {
      setChargementGoogle(false)
    }
  }

  const formulaireValide = prenom && nom && email && password.length >= 6

  return (
    <main className={styles.page}>
      <div className={styles.carte}>
        {/* En-tête */}
        <div className={styles.entete}>
          <span className={styles.emoji}>🏃</span>
          <h1 className={styles.titre}>Inscription</h1>
          <p className={styles.soustitre}>Rejoins la communaute Solimouv'</p>
        </div>

        {/* Message d'erreur */}
        {erreur && (
          <div className={styles.erreur} role="alert">
            {erreur}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Prénom + Nom sur la même ligne sur desktop */}
          <div className={styles.champDouble}>
            <div className={styles.champ}>
              <label htmlFor="prenom" className={styles.label}>Prenom</label>
              <input
                id="prenom"
                type="text"
                className={styles.input}
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Marie"
                required
                autoComplete="given-name"
                autoFocus
              />
            </div>
            <div className={styles.champ}>
              <label htmlFor="nom" className={styles.label}>Nom</label>
              <input
                id="nom"
                type="text"
                className={styles.input}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Dupont"
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className={styles.champ}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.champ}>
            <label htmlFor="password" className={styles.label}>
              Mot de passe
              <span className={styles.labelHint}>(6 caracteres min.)</span>
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className={styles.btnPrimaire}
            disabled={chargement || !formulaireValide}
          >
            {chargement ? 'Creation du compte...' : "Creer mon compte"}
          </button>
        </form>

        {/* Séparateur */}
        <div className={styles.separateur}>
          <span>ou</span>
        </div>

        {/* Bouton Google */}
        <button
          className={styles.btnGoogle}
          onClick={handleGoogle}
          disabled={chargementGoogle}
          type="button"
        >
          <span className={styles.googleIcon} aria-hidden="true">G</span>
          {chargementGoogle ? 'Connexion...' : 'Continuer avec Google'}
        </button>

        {/* Lien vers connexion */}
        <p className={styles.lienBas}>
          Deja un compte ?{' '}
          <Link to="/login" className={styles.lien}>
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  )
}
