/**
 * Page Planning (/planning) — timeline horaire des activités.
 * Accordion par heure (09:00 → 20:00), activités groupées par heure de début.
 * Clic sur une activité → /activite/:id
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { useActivites } from '../hooks/useFirestore'
import type { Activite } from '../types'
import styles from './Planning.module.css'

const LOGO_SRC = 'https://www.figma.com/api/mcp/asset/d4c6dbfa-3721-47f7-9cf4-bfa781f8f82e'

// Créneaux horaires affichés (09h → 20h)
const HEURES = Array.from({ length: 12 }, (_, i) => i + 9)

function padH(h: number) {
  return `${String(h).padStart(2, '0')}:00`
}

function formatHeure(h: string) {
  return h.replace(':', 'h')
}

function heureSlot(heure_debut: string): number {
  return Math.floor(parseInt(heure_debut.split(':')[0]))
}

// ── Bloc d'une activité dans la timeline ──────────────────────
function ActiviteBloc({
  activite,
  derniere,
  onClick,
}: {
  activite: Activite
  derniere: boolean
  onClick: () => void
}) {
  return (
    <>
      <button
        className={styles.activiteItem}
        onClick={onClick}
        type="button"
        aria-label={`Voir l'activité : ${activite.titre}`}
      >
        <div className={styles.activiteRow}>
          <span className={styles.activiteNom}>{activite.titre}</span>
          <span className={styles.activiteArrow}>→</span>
        </div>
        <div className={styles.activiteMeta}>
          {activite.lieu} · {formatHeure(activite.heure_debut)} {formatHeure(activite.heure_fin)}
        </div>
        <div className={styles.activitePublics}>
          {activite.publics.join(' · ')}
        </div>
      </button>
      {!derniere && <div className={styles.separateur} />}
    </>
  )
}

// ── Page principale ───────────────────────────────────────────
export default function Planning() {
  const navigate = useNavigate()
  const { data: activites, loading, error } = useActivites()
  const [expandedHours, setExpandedHours] = useState<Set<number>>(new Set())

  // Ouvrir par défaut les créneaux qui ont des activités
  useEffect(() => {
    if (activites) {
      const slots = new Set(activites.map((a) => heureSlot(a.heure_debut)))
      setExpandedHours(slots)
    }
  }, [activites])

  function toggle(h: number) {
    setExpandedHours((prev) => {
      const next = new Set(prev)
      next.has(h) ? next.delete(h) : next.add(h)
      return next
    })
  }

  if (loading) return <LoadingSpinner message="Chargement du planning..." />

  if (error) {
    return (
      <div className={styles.erreur} role="alert">
        <p>⚠️ Impossible de charger le planning : {error}</p>
      </div>
    )
  }

  // Grouper les activités par créneau horaire
  const parHeure = new Map<number, Activite[]>()
  HEURES.forEach((h) => parHeure.set(h, []))
  ;(activites ?? []).forEach((a) => {
    const h = heureSlot(a.heure_debut)
    if (parHeure.has(h)) parHeure.get(h)!.push(a)
  })

  return (
    <div className={styles.page}>

      {/* Logo */}
      <div className={styles.logoWrap}>
        <img src={LOGO_SRC} alt="Solimouv'" className={styles.logo} />
      </div>

      {/* En-tête */}
      <div className={styles.entete}>
        <h1 className={styles.titre}>Vos horaires</h1>
        <p className={styles.sousTitre}>
          Explorez la carte ci-dessous pour localiser vos activités préférées,
        </p>
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        {HEURES.map((h) => {
          const actsHeure = parHeure.get(h) ?? []
          const ouvert = expandedHours.has(h)

          return (
            <div key={h} className={styles.slot}>
              {/* En-tête du créneau */}
              <button
                className={styles.slotHeader}
                onClick={() => toggle(h)}
                aria-expanded={ouvert}
                aria-label={`Créneau ${padH(h)}${actsHeure.length > 0 ? `, ${actsHeure.length} activité(s)` : ''}`}
                type="button"
              >
                <span className={styles.slotHeure}>{padH(h)}</span>
                <span
                  className={`${styles.slotChevron} ${ouvert ? styles.slotChevronOpen : ''}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              {/* Activités dépliées */}
              {ouvert && actsHeure.length > 0 && (
                <div className={styles.activitesBloc}>
                  {actsHeure.map((activite, i) => (
                    <ActiviteBloc
                      key={activite.id}
                      activite={activite}
                      derniere={i === actsHeure.length - 1}
                      onClick={() => navigate(`/activite/${activite.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
