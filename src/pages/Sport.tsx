/**
 * Page Sport (/sport) — grille de sports avec fleurs colorées.
 * Disciplines extraites depuis Firestore /associations, dupliquées pour remplir la grille.
 */

import LoadingSpinner from '../components/LoadingSpinner'
import { useAssociations } from '../hooks/useFirestore'
import styles from './Sport.module.css'

const LOGO_SRC = 'https://www.figma.com/api/mcp/asset/d4c6dbfa-3721-47f7-9cf4-bfa781f8f82e'

// 4 combinaisons fleur+icône cyclées sur les sports
const FLOWER_COMBOS = [
  {
    flower: 'https://www.figma.com/api/mcp/asset/0977c7e1-25cf-41de-ae0c-691d64c384d0', // orange
    icon:   'https://www.figma.com/api/mcp/asset/be536219-9870-41d6-b2fc-d078eeb8fe7f',
    rotate: '180deg',
  },
  {
    flower: 'https://www.figma.com/api/mcp/asset/46ed203d-5375-48e4-916e-4cfdbab9a84f', // bleu
    icon:   'https://www.figma.com/api/mcp/asset/72101672-453f-46e0-90fe-59f01eedf579',
    rotate: '0deg',
  },
  {
    flower: 'https://www.figma.com/api/mcp/asset/5e5178f1-c742-4f8c-b32b-b2d20512e6b9', // rouge
    icon:   'https://www.figma.com/api/mcp/asset/43f684c7-1c0b-4ed4-8a17-6e874ca9f87c',
    rotate: '-90deg',
  },
  {
    flower: 'https://www.figma.com/api/mcp/asset/c1d47e23-1137-4b06-b762-47895fb6af89', // vert
    icon:   'https://www.figma.com/api/mcp/asset/a6a45fc7-e6e2-4032-aa22-eaf32dd95d25',
    rotate: '180deg',
  },
]

export default function Sport() {
  const { data: associations, loading, error } = useAssociations()

  if (loading) return <LoadingSpinner message="Chargement des sports..." />

  if (error) {
    return (
      <div className={styles.erreur} role="alert">
        <p>⚠️ Impossible de charger les sports : {error}</p>
      </div>
    )
  }

  // Extraire disciplines uniques
  const disciplines = Array.from(
    new Set((associations ?? []).flatMap((a) => a.disciplines))
  )

  // Dupliquer pour remplir la grille (min 12 items)
  const items: { label: string; combo: typeof FLOWER_COMBOS[0] }[] = []
  const base = disciplines.length > 0 ? disciplines : ['Baseball', 'Foot', 'Badminton', 'Tennis']
  while (items.length < 12) {
    base.forEach((label) => {
      items.push({ label, combo: FLOWER_COMBOS[items.length % FLOWER_COMBOS.length] })
    })
  }
  const grid = items.slice(0, Math.ceil(items.length / 4) * 4)

  return (
    <div className={styles.page}>
      {/* Logo */}
      <div className={styles.logoWrap}>
        <img src={LOGO_SRC} alt="Solimouv'" className={styles.logo} />
      </div>

      {/* En-tête */}
      <div className={styles.entete}>
        <h1 className={styles.titre}>Nos sports</h1>
        <p className={styles.sousTitre}>
          Explorez la carte ci-dessous pour localiser vos activités préférées,
        </p>
      </div>

      {/* Grille */}
      <ul className={styles.grille} role="list">
        {grid.map((item, i) => (
          <li key={i} className={styles.item} role="listitem">
            <div className={styles.fleurWrap}>
              <img
                src={item.combo.flower}
                className={styles.fleurImg}
                style={{ transform: `rotate(${item.combo.rotate})` }}
                alt=""
                aria-hidden="true"
              />
              <img
                src={item.combo.icon}
                className={styles.iconeImg}
                alt=""
                aria-hidden="true"
              />
            </div>
            <span className={styles.label}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
