/**
 * Résultats du Quiz Sport Matcher — Page /matcher/resultats
 * Affiche les associations dont les disciplines matchent le top 3 des sports recommandés.
 * Permet de contacter une association (RGPD + Firestore + webhook Make).
 *
 * - Utilisateur connecté  : champs Prénom/Email pré-remplis et grisés
 * - Utilisateur non connecté : champs Prénom/Email obligatoires à saisir
 * - Checkbox RGPD : décochée par défaut
 * - Bouton désactivé si checkbox décochée OU champs vides
 */

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import { useAssociations } from '../hooks/useFirestore'
import { sendContactWebhook } from '../services/makeWebhook'
import type { Association } from '../types'
import styles from './MatcherResultats.module.css'

// ── Utilitaire : match sport ─────────────────────────────────
function associationMatcheSports(asso: Association, sports: string[]): boolean {
  const disciplinesNorm = asso.disciplines.map((d) => d.toLowerCase())
  return sports.some((s) =>
    disciplinesNorm.some((d) => d.includes(s.toLowerCase()) || s.toLowerCase().includes(d))
  )
}

// ── Composant : Card association résultat ────────────────────
interface CardAssoProps {
  asso: Association
  sportsRecommandes: string[]
}

function CardAssoResultat({ asso, sportsRecommandes }: CardAssoProps) {
  const { currentUser } = useAuth()

  // Pré-remplir depuis le profil Firebase si connecté
  const prenomInitial = currentUser?.displayName?.split(' ')[0] ?? ''
  const emailInitial  = currentUser?.email ?? ''

  const [consentement, setConsentement] = useState(false)
  const [prenom, setPrenom]             = useState(prenomInitial)
  const [email, setEmail]               = useState(emailInitial)
  const [envoye, setEnvoye]             = useState(false)
  const [envoi, setEnvoi]               = useState(false)

  const estConnecte  = currentUser !== null
  const formulaireOk = consentement && prenom.trim() !== '' && email.trim() !== ''

  async function contacter() {
    if (!formulaireOk || envoi) return
    setEnvoi(true)

    try {
      await addDoc(collection(db, 'contacts'), {
        association_id:    asso.id,
        association_nom:   asso.nom,
        sports_recommandes: sportsRecommandes,
        prenom:            prenom.trim(),
        email:             email.trim(),
        consentement_rgpd: true,
        created_at:        Timestamp.now(),
      })

      await sendContactWebhook({
        association_id:    asso.id,
        association_nom:   asso.nom,
        sports_recommandes: sportsRecommandes,
        prenom:            prenom.trim(),
        email:             email.trim(),
        timestamp:         new Date().toISOString(),
      })

      setEnvoye(true)
    } catch (err) {
      console.error('[MatcherResultats] Erreur contact', err)
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <article className={styles.assoCard} aria-label={asso.nom}>
      <div className={styles.assoCardHeader}>
        <h2 className={styles.assoNom}>{asso.nom}</h2>
        <div className={styles.assoDisciplines}>
          {asso.disciplines.map((d) => (
            <span key={d} className={styles.disciplineTag}>{d}</span>
          ))}
        </div>
      </div>

      <p className={styles.assoDesc}>{asso.description}</p>

      <div className={styles.assoActions}>
        {asso.siteWeb && (
          <a
            href={asso.siteWeb}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSavoir}
          >
            En savoir plus →
          </a>
        )}

        {envoye ? (
          <p className={styles.confirmationMsg}>
            ✅ Demande envoyée ! L'association vous contactera bientôt.
          </p>
        ) : (
          <div className={styles.contactBlock}>
            {/* Champs Prénom / Email */}
            <div className={styles.champGroup}>
              <label className={styles.champLabel} htmlFor={`prenom-${asso.id}`}>
                Prénom <span aria-hidden="true">*</span>
              </label>
              <input
                id={`prenom-${asso.id}`}
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                disabled={estConnecte}
                placeholder="Votre prénom"
                className={`${styles.champInput} ${estConnecte ? styles.champGrise : ''}`}
                autoComplete="given-name"
              />
            </div>

            <div className={styles.champGroup}>
              <label className={styles.champLabel} htmlFor={`email-${asso.id}`}>
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id={`email-${asso.id}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={estConnecte}
                placeholder="votre@email.fr"
                className={`${styles.champInput} ${estConnecte ? styles.champGrise : ''}`}
                autoComplete="email"
              />
            </div>

            {/* Checkbox RGPD — décochée par défaut */}
            <label className={styles.rgpdLabel}>
              <input
                type="checkbox"
                checked={consentement}
                onChange={(e) => setConsentement(e.target.checked)}
                className={styles.rgpdCheckbox}
              />
              <span>J'accepte d'être contacté(e) par cette association</span>
            </label>

            <button
              className={styles.btnContacter}
              onClick={contacter}
              disabled={!formulaireOk || envoi}
              type="button"
            >
              {envoi ? 'Envoi…' : 'Contacter cette association'}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

// ── Page principale ───────────────────────────────────────────
export default function MatcherResultats() {
  const location = useLocation()
  const navigate  = useNavigate()
  const { data: toutesAssociations, loading } = useAssociations()

  const state = location.state as { sportsRecommandes?: string[] } | null

  // Accès direct sans state → rediriger vers le quiz
  if (!state?.sportsRecommandes) {
    navigate('/matcher', { replace: true })
    return null
  }

  const sportsRecommandes: string[] = state.sportsRecommandes

  const associationsMatchees: Association[] = (toutesAssociations ?? [])
    .filter((a) => associationMatcheSports(a, sportsRecommandes))
    .slice(0, 3)

  const associationsAffichees =
    associationsMatchees.length > 0
      ? associationsMatchees
      : (toutesAssociations ?? []).slice(0, 2)

  return (
    <div className={styles.page}>
      <div className={styles.conteneur}>

        {/* ── Titre ── */}
        <div className={styles.titreSect}>
          <h1 className={styles.titre}>Ton sport idéal ✨</h1>
          <p className={styles.sousTitre}>
            D'après tes réponses, voici les sports et associations faits pour toi.
          </p>
        </div>

        {/* ── Sports recommandés ── */}
        <div className={styles.sportsWrap}>
          <p className={styles.sportsLabel}>Tes sports recommandés</p>
          <div className={styles.sportsTags}>
            {sportsRecommandes.map((s) => (
              <span key={s} className={styles.sportTag}>{s}</span>
            ))}
          </div>
        </div>

        {/* ── Associations ── */}
        {loading ? (
          <p className={styles.chargement}>Recherche des associations…</p>
        ) : (
          <div className={styles.assoListe}>
            {associationsAffichees.map((asso) => (
              <CardAssoResultat
                key={asso.id}
                asso={asso}
                sportsRecommandes={sportsRecommandes}
              />
            ))}
          </div>
        )}

        {/* ── Actions bas de page ── */}
        <div className={styles.actionsFinales}>
          <button
            className={styles.btnRecommencer}
            onClick={() => navigate('/matcher')}
            type="button"
          >
            ↺ Recommencer
          </button>
          <Link to="/associations" className={styles.btnToutesAsso}>
            Voir toutes les associations →
          </Link>
        </div>

      </div>
    </div>
  )
}
