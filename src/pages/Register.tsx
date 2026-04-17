/**
 * Page d'inscription — Design Figma maquette
 */

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { FirebaseError } from 'firebase/app'
import { useAuth } from '../contexts/AuthContext'
import styles from './Auth.module.css'

function messageErreur(code: string): string {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': "Un compte existe déjà avec cet email.",
    'auth/invalid-email': "Adresse email invalide.",
    'auth/weak-password': "Mot de passe trop faible (6 caractères minimum).",
    'auth/network-request-failed': "Problème de connexion réseau.",
    'auth/popup-closed-by-user': "Connexion Google annulée.",
  }
  return messages[code] ?? "Une erreur est survenue. Veuillez réessayer."
}

const AGES = Array.from({ length: 83 }, (_, i) => i + 8) // 8 à 90 ans

export default function Register() {
  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [genre, setGenre] = useState<'homme' | 'femme' | ''>('')
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErreur('')

    if (password.length < 6) {
      setErreur("Le mot de passe doit contenir au moins 6 caractères.")
      return
    }

    if (password !== confirmPassword) {
      setErreur("Les mots de passe ne correspondent pas.")
      return
    }

    setChargement(true)
    try {
      await register(email, password, prenom.trim(), nom.trim())
      navigate('/register/succes', { replace: true })
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
      navigate('/', { replace: true })
    } catch (err) {
      const fbErr = err as FirebaseError
      setErreur(messageErreur(fbErr.code))
    }
  }

  async function handleFacebook() {
    setErreur("Connexion Facebook bientôt disponible.")
  }

  async function handleApple() {
    setErreur("Connexion Apple bientôt disponible.")
  }

  const formulaireValide =
    prenom && nom && email && password.length >= 6 && password === confirmPassword

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
        <Link to="/login" className={styles.btnRetour} aria-label="Retour à la connexion">
          ‹
        </Link>

        {/* Titre */}
        <div className={styles.titreWrap}>
          <h1 className={styles.titre}>Bienvenue sur</h1>
          <span className={`${styles.titreCaveat} ${styles.titreCaveatVert}`}>
            Solimouv
          </span>
        </div>

        {/* Message d'erreur */}
        {erreur && (
          <div id="erreur-register" className={styles.erreur} role="alert" aria-live="assertive">
            {erreur}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Genre */}
          <div className={styles.radioGroup} role="group" aria-label="Genre">
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="genre"
                value="homme"
                checked={genre === 'homme'}
                onChange={() => setGenre('homme')}
              />
              Homme
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="genre"
                value="femme"
                checked={genre === 'femme'}
                onChange={() => setGenre('femme')}
              />
              Femme
            </label>
          </div>

          {/* Prénom + Nom */}
          <div className={styles.champDouble}>
            <div className={styles.champ}>
              <input
                id="prenom"
                type="text"
                className={styles.input}
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Prénom"
                required
                aria-required="true"
                autoComplete="given-name"
                autoFocus
              />
            </div>
            <div className={styles.champ}>
              <input
                id="nom"
                type="text"
                className={styles.input}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Nom"
                required
                aria-required="true"
                autoComplete="family-name"
              />
            </div>
          </div>

          {/* Âge */}
          <div className={styles.champ}>
            <select
              id="age"
              className={`${styles.select} ${age ? styles.selectValide : ''}`}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              aria-label="Âge"
            >
              <option value="" disabled>Âge</option>
              {AGES.map((a) => (
                <option key={a} value={String(a)}>{a} ans</option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div className={styles.champ}>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ton email"
              required
              aria-required="true"
              autoComplete="email"
            />
          </div>

          {/* Mot de passe */}
          <div className={styles.champ}>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
              aria-required="true"
              autoComplete="new-password"
            />
          </div>

          {/* Confirmer mot de passe */}
          <div className={styles.champ}>
            <input
              id="confirm-password"
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmer le mot de passe"
              required
              aria-required="true"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className={styles.btnPrimaire}
            disabled={chargement || !formulaireValide}
          >
            {chargement ? 'Création…' : "S'inscrire"}
          </button>
        </form>

        {/* Séparateur */}
        <div className={styles.separateur}>
          <span>ou</span>
        </div>

        {/* Boutons sociaux */}
        <div className={styles.sociaux}>
          {/* Facebook */}
          <button
            type="button"
            className={styles.btnSocial}
            onClick={handleFacebook}
            aria-label="S'inscrire avec Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

          {/* Google */}
          <button
            type="button"
            className={styles.btnSocial}
            onClick={handleGoogle}
            aria-label="S'inscrire avec Google"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>

          {/* Apple */}
          <button
            type="button"
            className={styles.btnSocial}
            onClick={handleApple}
            aria-label="S'inscrire avec Apple"
          >
            <svg width="18" height="22" viewBox="0 0 814 1000" fill="#1e1e1e">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.7C46 425.7 0 323.4 0 228.7c0-122.4 86.6-190.5 176.3-190.5 47.6 0 87.5 31.2 117.5 31.2 29.5 0 75.8-33.3 133.3-33.3 48.1 0 109.2 16.7 150.7 57.4zm-56.9-149.3c-28 33.2-76 58.8-117.1 58.8-5.1 0-10.2-.5-14.8-1.6 2.4-34.3 17.6-69.2 45.3-96.9 28-27.7 74.6-50.7 115.8-52.5 3.9 34.3-6.9 66.7-29.2 92.2z"/>
            </svg>
          </button>
        </div>

        {/* Lien vers connexion */}
        <p className={styles.lienBas}>
          Tu as un compte ?{' '}
          <Link to="/login" className={styles.lien}>
            Connecte-toi
          </Link>
        </p>
      </div>
    </main>
  )
}
