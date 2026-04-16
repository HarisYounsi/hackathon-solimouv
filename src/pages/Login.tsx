/**
 * Page de connexion.
 * Formulaire email + mot de passe et bouton Google Sign-In.
 * Redirige vers la page demandée ou l'accueil après connexion.
 */

import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import type { FirebaseError } from 'firebase/app'
import { useAuth } from '../contexts/AuthContext'
import styles from './Auth.module.css'

// Traduction des codes d'erreur Firebase en messages lisibles
function messageErreur(code: string): string {
  const messages: Record<string, string> = {
    'auth/invalid-email': "Adresse email invalide.",
    'auth/user-not-found': "Aucun compte avec cet email.",
    'auth/wrong-password': "Mot de passe incorrect.",
    'auth/invalid-credential': "Email ou mot de passe incorrect.",
    'auth/too-many-requests': "Trop de tentatives. Reessayez plus tard.",
    'auth/network-request-failed': "Probleme de connexion reseau.",
    'auth/popup-closed-by-user': "Connexion Google annulee.",
  }
  return messages[code] ?? "Une erreur est survenue. Veuillez reessayer."
}

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)
  const [chargementGoogle, setChargementGoogle] = useState(false)

  // URL vers laquelle rediriger après connexion (ou accueil par défaut)
  const destination = (location.state as { from?: Location })?.from?.pathname ?? '/'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErreur('')
    setChargement(true)
    try {
      await login(email, password)
      navigate(destination, { replace: true })
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
      navigate(destination, { replace: true })
    } catch (err) {
      const fbErr = err as FirebaseError
      setErreur(messageErreur(fbErr.code))
    } finally {
      setChargementGoogle(false)
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.carte}>
        {/* En-tête */}
        <div className={styles.entete}>
          <span className={styles.emoji}>🏃</span>
          <h1 className={styles.titre}>Connexion</h1>
          <p className={styles.soustitre}>Bienvenue sur Solimouv'</p>
        </div>

        {/* Message d'erreur */}
        {erreur && (
          <div className={styles.erreur} role="alert">
            {erreur}
          </div>
        )}

        {/* Formulaire email / mot de passe */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
              autoFocus
            />
          </div>

          <div className={styles.champ}>
            <label htmlFor="password" className={styles.label}>Mot de passe</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={styles.btnPrimaire}
            disabled={chargement || !email || !password}
          >
            {chargement ? 'Connexion...' : 'Se connecter'}
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

        {/* Lien vers inscription */}
        <p className={styles.lienBas}>
          Pas encore de compte ?{' '}
          <Link to="/register" className={styles.lien}>
            S'inscrire
          </Link>
        </p>
      </div>
    </main>
  )
}
