/**
 * Quiz Sport Matcher — Page /matcher
 * Design Figma : logo · titre Caveat bicolore · grille 2 colonnes orange · CTA Suivant.
 */

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useQuiz } from '../hooks/useFirestore'
import type { QuizOption } from '../types'
import { getTop3Sports } from '../services/matcherService'
import styles from './Matcher.module.css'

const LOGO_SRC = 'https://www.figma.com/api/mcp/asset/d4c6dbfa-3721-47f7-9cf4-bfa781f8f82e'

/**
 * Découpe la question : le dernier mot (+ ponctuation finale) devient le mot-clé orange.
 * Ex: "Tu préfères pratiquer…" → ["Tu préfères ", "pratiquer…"]
 */
function splitQuestion(text: string): [string, string] {
  const trimmed = text.trimEnd()
  const lastSpace = trimmed.lastIndexOf(' ')
  if (lastSpace === -1) return ['', text]
  return [text.slice(0, lastSpace + 1), text.slice(lastSpace + 1)]
}

export default function Matcher() {
  const { data: questions, loading, error } = useQuiz()
  const navigate = useNavigate()

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
  const estDerniere = indexCourant === total - 1

  const [prefixe, motCle] = splitQuestion(question.question)

  function choisirOption(option: QuizOption) {
    setReponses((prev) => ({ ...prev, [question.id]: option }))
  }

  function suivant() {
    if (estDerniere) {
      const tousRepondus = { ...reponses, [question.id]: reponseActuelle! }
      const sportsRecommandes = getTop3Sports(tousRepondus)
      navigate('/matcher/resultats', { state: { sportsRecommandes, reponses: tousRepondus } })
    } else {
      setIndexCourant((i) => i + 1)
    }
  }

  return (
    <div className={styles.page}>
      {/* Blob vert décoratif */}
      <div className={styles.blobVert} aria-hidden="true" />

      <div className={styles.conteneur}>

        {/* Logo */}
        <div className={styles.logoWrap}>
          <img src={LOGO_SRC} alt="Solimouv'" className={styles.logo} />
        </div>

        {/* Titre bicolore */}
        <h1 className={styles.questionTitre}>
          <span className={styles.titrePrefixe}>{prefixe}</span>
          <span className={styles.titreMotCle}>{motCle}</span>
        </h1>

        {/* Grille d'options */}
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

        {/* Bouton Suivant */}
        <button
          className={styles.btnSuivant}
          onClick={suivant}
          disabled={!reponseActuelle}
          type="button"
        >
          Suivant
        </button>

      </div>
    </div>
  )
}
