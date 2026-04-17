/**
 * Page détail activité (/activite/:activiteId)
 * Design : header fleur + titre Caveat · lieu · accessibilité · description ·
 *          section Programme · pills Horaires · toggle notification · CTA Réserver.
 */

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { useActivites } from '../hooks/useFirestore'
import styles from './ActiviteDetail.module.css'

// ── Fleurs colorées (mêmes assets que Sport.tsx) ─────────────
const FLOWERS = [
  {
    flower: 'https://www.figma.com/api/mcp/asset/c1d47e23-1137-4b06-b762-47895fb6af89', // vert
    icon:   'https://www.figma.com/api/mcp/asset/72101672-453f-46e0-90fe-59f01eedf579',
    rotate: '0deg',
  },
  {
    flower: 'https://www.figma.com/api/mcp/asset/0977c7e1-25cf-41de-ae0c-691d64c384d0', // orange
    icon:   'https://www.figma.com/api/mcp/asset/43f684c7-1c0b-4ed4-8a17-6e874ca9f87c',
    rotate: '180deg',
  },
  {
    flower: 'https://www.figma.com/api/mcp/asset/46ed203d-5375-48e4-916e-4cfdbab9a84f', // bleu
    icon:   'https://www.figma.com/api/mcp/asset/be536219-9870-41d6-b2fc-d078eeb8fe7f',
    rotate: '-90deg',
  },
  {
    flower: 'https://www.figma.com/api/mcp/asset/5e5178f1-c742-4f8c-b32b-b2d20512e6b9', // rouge
    icon:   'https://www.figma.com/api/mcp/asset/a6a45fc7-e6e2-4032-aa22-eaf32dd95d25',
    rotate: '90deg',
  },
]

const TYPE_TO_FLOWER: Record<string, number> = {
  initiation:      0,
  atelier:         1,
  sensibilisation: 2,
}

function formatHeure(h: string) {
  return h.replace(':', 'h')
}

export default function ActiviteDetail() {
  const { activiteId } = useParams<{ activiteId: string }>()
  const navigate = useNavigate()
  const { data: activites, loading, error } = useActivites()
  const [notifActive, setNotifActive] = useState(false)
  const [heureSelectee, setHeureSelectee] = useState<string | null>(null)

  if (loading) return <LoadingSpinner message="Chargement..." />

  if (error || !activites) {
    return (
      <div className={styles.erreur} role="alert">
        <p>⚠️ Impossible de charger l'activité.</p>
      </div>
    )
  }

  const activite = activites.find((a) => a.id === activiteId)

  if (!activite) {
    return (
      <div className={styles.erreur} role="alert">
        <p>Activité introuvable.</p>
        <button className={styles.btnRetour} onClick={() => navigate('/programme')}>
          ← Retour au programme
        </button>
      </div>
    )
  }

  const flower = FLOWERS[TYPE_TO_FLOWER[activite.type] ?? 0]
  const heureActive = heureSelectee ?? activite.heure_debut
  const estAccessible = activite.publics.some((p) =>
    p.toLowerCase().includes('tous') || p.toLowerCase() === 'all'
  )

  // Toutes les heures de début uniques pour les pills
  const toutesHeures = Array.from(
    new Set(activites.map((a) => a.heure_debut))
  ).sort()

  return (
    <div className={styles.page}>

      {/* ── Bouton fermer ── */}
      <button
        className={styles.btnFermer}
        onClick={() => navigate('/programme')}
        aria-label="Fermer et retourner au programme"
        type="button"
      >
        ✕
      </button>

      {/* ── Header : fleur + titre ── */}
      <div className={styles.header}>
        <div className={styles.fleurWrap} aria-hidden="true">
          <img
            src={flower.flower}
            className={styles.fleurImg}
            style={{ transform: `rotate(${flower.rotate})` }}
            alt=""
          />
          <img src={flower.icon} className={styles.iconeImg} alt="" />
        </div>
        <div className={styles.headerTexte}>
          <h1 className={styles.titre}>{activite.titre}</h1>
          <p className={styles.parAsso}>Par {activite.association_nom}</p>
        </div>
      </div>

      {/* ── Infos ── */}
      <ul className={styles.infosList}>
        <li className={styles.infosItem}>
          <span className={styles.infosIcone}>📍</span>
          <span>{activite.lieu}</span>
        </li>
        {estAccessible && (
          <li className={styles.infosItem}>
            <span className={styles.infosPointVert} aria-hidden="true" />
            <span>Accessible à tous</span>
          </li>
        )}
        {activite.places_max && (
          <li className={styles.infosItem}>
            <span className={styles.infosIcone}>👥</span>
            <span>{activite.places_max} places max</span>
          </li>
        )}
      </ul>

      {/* ── Description ── */}
      <p className={styles.description}>{activite.description}</p>

      {/* ── Section Programme ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitre}>Programme</h2>
        <p className={styles.sectionTexte}>{activite.description}</p>
      </section>

      {/* ── Section Horaires ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitre}>Horaires</h2>
        <div className={styles.horairePills} role="group" aria-label="Choisir un horaire">
          {toutesHeures.map((h) => (
            <button
              key={h}
              className={`${styles.pill} ${h === heureActive ? styles.pillActif : ''}`}
              onClick={() => setHeureSelectee(h)}
              aria-pressed={h === heureActive}
              type="button"
            >
              {formatHeure(h)}
            </button>
          ))}
        </div>
      </section>

      {/* ── Ligne notification ── */}
      <div className={styles.notifRow}>
        <span className={styles.notifIcone} aria-hidden="true">🔔</span>
        <span className={styles.notifTexte}>
          Activer notification 15 min avant l'activité
        </span>
        <button
          role="switch"
          aria-checked={notifActive}
          className={`${styles.toggle} ${notifActive ? styles.toggleOn : ''}`}
          onClick={() => setNotifActive((v) => !v)}
          aria-label="Activer la notification"
          type="button"
        >
          <span className={styles.toggleThumb} />
        </button>
      </div>

      {/* ── CTA Réserver ── */}
      <button
        className={styles.btnReserver}
        onClick={() => navigate(`/reservation/${activite.id}`)}
        type="button"
      >
        Réserver
      </button>

    </div>
  )
}
