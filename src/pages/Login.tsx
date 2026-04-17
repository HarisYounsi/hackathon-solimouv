/**
 * Page de connexion — Design Figma maquette
 */

import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import type { FirebaseError } from 'firebase/app'
import { useAuth } from '../contexts/AuthContext'
import styles from './Auth.module.css'

function messageErreur(code: string): string {
  const messages: Record<string, string> = {
    'auth/invalid-email': "Adresse email invalide.",
    'auth/user-not-found': "Aucun compte avec cet email.",
    'auth/wrong-password': "Mot de passe incorrect.",
    'auth/invalid-credential': "Email ou mot de passe incorrect.",
    'auth/too-many-requests': "Trop de tentatives. Réessayez plus tard.",
    'auth/network-request-failed': "Problème de connexion réseau.",
    'auth/popup-closed-by-user': "Connexion Google annulée.",
  }
  return messages[code] ?? "Une erreur est survenue. Veuillez réessayer."
}

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

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
    try {
      await loginWithGoogle()
      navigate(destination, { replace: true })
    } catch (err) {
      const fbErr = err as FirebaseError
      setErreur(messageErreur(fbErr.code))
    }
  }

  return (
    <main className={styles.page}>
      {/* Décorations de coins */}
      <div className={styles.decoTopRight} aria-hidden="true" />
      <div className={styles.decoTopRightSmall} aria-hidden="true" />
      <div className={styles.decoBottomLeft} aria-hidden="true" />
      <div className={styles.decoBottomRight} aria-hidden="true" />
      <div className={styles.decoTopLeft} aria-hidden="true" />

      <div className={styles.contenu}>
        {/* Flèche retour */}
        <Link to="/" className={styles.btnRetour} aria-label="Retour à l'accueil">
          ‹
        </Link>

        {/* Titre */}
        <div className={styles.titreWrap}>
          <h1 className={styles.titre}>Content de te revoir!</h1>
          <span className={`${styles.titreCaveat} ${styles.titreCaveatOrange}`}>
            Connecte-toi
          </span>
        </div>

        {/* Message d'erreur */}
        {erreur && (
          <div id="erreur-login" className={styles.erreur} role="alert" aria-live="assertive">
            {erreur}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.champ}>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entre ton email"
              required
              aria-required="true"
              aria-invalid={erreur ? 'true' : undefined}
              aria-describedby={erreur ? 'erreur-login' : undefined}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className={styles.champ}>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entre le mot de passe"
              required
              aria-required="true"
              aria-invalid={erreur ? 'true' : undefined}
              aria-describedby={erreur ? 'erreur-login' : undefined}
              autoComplete="current-password"
            />
          </div>

          {/* Mot de passe oublié */}
          <Link to="/mot-de-passe-oublie" className={styles.mdpOublie}>
            Mot de passe oublié ?
          </Link>

          <button
            type="submit"
            className={styles.btnPrimaire}
            disabled={chargement || !email || !password}
          >
            {chargement ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        {/* Séparateur */}
        <div className={styles.separateur}>
          <span>ou</span>
        </div>

        {/* Bouton Google */}
        <div className={styles.sociaux}>
          <button
            type="button"
            className={styles.btnSocial}
            onClick={handleGoogle}
            aria-label="Connexion avec Google"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>
        </div>

        {/* Lien vers inscription */}
        <p className={styles.lienBas}>
          Tu n'as pas de compte ?{' '}
          <Link to="/register" className={styles.lien}>
            inscris-toi
          </Link>
        </p>
      </div>
    </main>
  )
}
