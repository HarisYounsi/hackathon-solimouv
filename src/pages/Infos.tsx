/**
 * Page Infos — liste verticale des associations partenaires du festival.
 * Design : logo · cards avec bordure bleue · tag catégorie · bouton Découvrir.
 */

import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAssociations } from '../hooks/useFirestore'
import type { Association } from '../types'
import styles from './Infos.module.css'

const LOGO_SRC = 'https://www.figma.com/api/mcp/asset/d4c6dbfa-3721-47f7-9cf4-bfa781f8f82e'

function CardAssociation({ asso }: { asso: Association }) {
  const navigate = useNavigate()
  const categorie = asso.disciplines[0] ?? asso.publics[0] ?? 'Association'

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitres}>
          <span className={styles.cardSurtitle}>Association</span>
          <h2 className={styles.cardNom}>{asso.nom},</h2>
        </div>
        <span className={styles.cardTag}>{categorie}</span>
      </div>

      <p className={styles.cardDesc}>{asso.description}</p>

      <button
        className={styles.cardBtn}
        onClick={() => navigate('/associations')}
        type="button"
      >
        Découvrir →
      </button>
    </article>
  )
}

export default function Infos() {
  const { data: associations, loading, error } = useAssociations()

  if (loading) return <LoadingSpinner message="Chargement des associations..." />

  if (error) {
    return (
      <div className={styles.erreur} role="alert">
        <p>⚠️ Impossible de charger les associations : {error}</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* Logo */}
      <div className={styles.logoWrap}>
        <img src={LOGO_SRC} alt="Solimouv'" className={styles.logo} />
      </div>

      {/* Liste des associations */}
      <ul className={styles.liste} role="list">
        {(associations ?? []).map((asso) => (
          <li key={asso.id} role="listitem">
            <CardAssociation asso={asso} />
          </li>
        ))}
      </ul>
    </div>
  )
}
