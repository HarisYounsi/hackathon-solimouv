/**
 * Quiz Sport Matcher — Page /matcher
 * Affiche les questions du quiz une par une avec un stepper visuel.
 * Les réponses sont stockées en session uniquement (pas dans Firestore).
 */

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useQuiz } from '../hooks/useFirestore'
import type { QuizOption } from '../types'
import { getTop3Sports } from '../services/matcherService'
import styles from './Matcher.module.css'

export default function Matcher() {
  const { data: questions, loading, error } = useQuiz()
  const navigate = useNavigate()

  // questionId → option choisie
  const [reponses, setReponses] = useState<Record<string, QuizOption>>({})
  const [indexCourant, setIndexCourant] = useState(0)

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.chargement}>Chargement du quiz…</div>
      </div>
    )
  }

  if (error || !questions || questions.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.erreur}>
          <p>Impossible de charger le quiz.</p>
          <Link to="/" className={styles.btnRetour}>← Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  const total = questions.length
  const question = questions[indexCourant]
  const reponseActuelle = reponses[question.id]
  const progression = ((indexCourant + 1) / total) * 100
  const estDerniere = indexCourant === total - 1

  function choisirOption(option: QuizOption) {
    setReponses((prev) => ({ ...prev, [question.id]: option }))
  }

  function aller(direction: 1 | -1) {
    setIndexCourant((i) => i + direction)
  }

  function terminer() {
    const tousRepondus = { ...reponses, [question.id]: reponseActuelle }
    const sportsRecommandes = getTop3Sports(tousRepondus)
    navigate('/matcher/resultats', { state: { sportsRecommandes, reponses: tousRepondus } })
  }

  return (
    <div className={styles.page}>
      <div className={styles.conteneur}>

        {/* ── Stepper ── */}
        <div className={styles.stepper} aria-label={`Question ${indexCourant + 1} sur ${total}`}>
          <div className={styles.stepperTexte}>
            <span className={styles.stepperLabel}>Question</span>
            <span className={styles.stepperCompte}>{indexCourant + 1}<span className={styles.stepperTotal}>/{total}</span></span>
          </div>
          <div className={styles.progressBar} role="progressbar" aria-valuenow={indexCourant + 1} aria-valuemin={1} aria-valuemax={total}>
            <div className={styles.progressFill} style={{ width: `${progression}%` }} />
          </div>
        </div>

        {/* ── Question ── */}
        <div className={styles.questionWrap}>
          <span className={styles.questionEmoji} aria-hidden="true">{question.emoji}</span>
          <h1 className={styles.questionTitre}>{question.question}</h1>
        </div>

        {/* ── Options ── */}
        <ul className={styles.options} role="list">
          {question.options.map((option) => {
            const selectionne = reponseActuelle?.valeur === option.valeur
            return (
              <li key={option.valeur} role="listitem">
                <button
                  className={`${styles.optionCard} ${selectionne ? styles.optionSelectionne : ''}`}
                  onClick={() => choisirOption(option)}
                  aria-pressed={selectionne}
                  type="button"
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>

        {/* ── Navigation ── */}
        <div className={styles.nav}>
          {indexCourant > 0 && (
            <button className={styles.btnPrecedent} onClick={() => aller(-1)} type="button">
              ← Précédent
            </button>
          )}

          {!estDerniere ? (
            <button
              className={styles.btnSuivant}
              onClick={() => aller(1)}
              disabled={!reponseActuelle}
              type="button"
            >
              Suivant →
            </button>
          ) : (
            <button
              className={styles.btnSuivant}
              onClick={terminer}
              disabled={!reponseActuelle}
              type="button"
            >
              Voir mes résultats ✨
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
