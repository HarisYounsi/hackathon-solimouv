/**
 * Page Carte — carte statique SVG du stade festival.
 * Design : logo · titre Caveat · stade SVG (piste + terrain + markers).
 * Pas de Google Maps.
 */

import styles from './Carte.module.css'

// Assets décoratifs (même source que Accueil.tsx)
const FLOWER_BLUE  = 'https://www.figma.com/api/mcp/asset/6e9db7df-d720-411a-bf80-bb7fbc7de8cf'
const FLOWER_GREEN = 'https://www.figma.com/api/mcp/asset/59ec4c9e-366d-4fcc-a72a-028c7d0b65a4'
const LOGO_SRC     = 'https://www.figma.com/api/mcp/asset/d4c6dbfa-3721-47f7-9cf4-bfa781f8f82e'

// ── Données des markers ──────────────────────────────────────
const MARKERS = [
  { id: 1, label: 'Run',          cx: 208, cy: 68  },
  { id: 2, label: 'Boxe',         cx: 110, cy: 122 },
  { id: 3, label: 'Foot',         cx: 168, cy: 134 },
  { id: 4, label: 'Badminton',    cx: 130, cy: 175 },
  { id: 5, label: 'Yoga',         cx: 170, cy: 218 },
  { id: 6, label: "Tir à l'arc", cx: 110, cy: 238 },
  { id: 7, label: 'Handball',     cx: 30,  cy: 272 },
]

export default function Carte() {
  return (
    <div className={styles.page}>

      {/* ── Décoration : fleur bleue — haut droite ── */}
      <img
        src={FLOWER_BLUE}
        className={styles.fleurBleue}
        alt=""
        aria-hidden="true"
      />

      {/* ── Décoration : blob vert — bas gauche ── */}
      <img
        src={FLOWER_GREEN}
        className={styles.blobVert}
        alt=""
        aria-hidden="true"
      />

      {/* ── Logo Solimouv' ── */}
      <div className={styles.logoWrap}>
        <img src={LOGO_SRC} alt="Solimouv'" className={styles.logo} />
      </div>

      {/* ── En-tête ── */}
      <div className={styles.entete}>
        <h1 className={styles.titre}>Carte</h1>
        <p className={styles.sousTitre}>
          Explorez la carte ci-dessous pour localiser vos activités préférées,
        </p>
      </div>

      {/* ── Stade SVG ── */}
      <div className={styles.carteWrap}>
        <svg
          viewBox="0 0 270 350"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.carteSvg}
          role="img"
          aria-label="Plan du stade festival Solimouv' — 7 zones d'activités numérotées"
        >
          {/* ─────────────────────────────────────
              Piste d'athlétisme (ovale, 6 couloirs)
          ───────────────────────────────────── */}
          {/* Fond blanc + contour extérieur */}
          <ellipse cx="140" cy="185" rx="120" ry="155" fill="white" stroke="#1e1e1e" strokeWidth="1.2"/>
          {/* Lignes de couloir */}
          <ellipse cx="140" cy="185" rx="110" ry="145" fill="none" stroke="#1e1e1e" strokeWidth="0.7"/>
          <ellipse cx="140" cy="185" rx="100" ry="135" fill="none" stroke="#1e1e1e" strokeWidth="0.7"/>
          <ellipse cx="140" cy="185" rx="90"  ry="125" fill="none" stroke="#1e1e1e" strokeWidth="0.7"/>
          <ellipse cx="140" cy="185" rx="80"  ry="115" fill="none" stroke="#1e1e1e" strokeWidth="0.7"/>
          <ellipse cx="140" cy="185" rx="70"  ry="105" fill="none" stroke="#1e1e1e" strokeWidth="0.7"/>
          {/* Infield blanc (cache les lignes de couloir à l'intérieur) */}
          <ellipse cx="140" cy="185" rx="68"  ry="103" fill="white"/>

          {/* ─────────────────────────────────────
              Terrain de football
          ───────────────────────────────────── */}
          <rect x="104" y="100" width="72" height="172" fill="white" stroke="#1e1e1e" strokeWidth="1.2"/>
          {/* Ligne médiane horizontale */}
          <line x1="104" y1="186" x2="176" y2="186" stroke="#1e1e1e" strokeWidth="0.8"/>
          {/* Surface de but — haut */}
          <rect x="116" y="100" width="48" height="13" fill="white" stroke="#1e1e1e" strokeWidth="0.7"/>
          {/* Surface de but — bas */}
          <rect x="116" y="259" width="48" height="13" fill="white" stroke="#1e1e1e" strokeWidth="0.7"/>

          {/* ─────────────────────────────────────
              Markers numérotés (bleu #3952d0)
          ───────────────────────────────────── */}
          {MARKERS.map(({ id, label, cx, cy }) => (
            <g key={id} role="listitem" aria-label={`Zone ${id} : ${label}`}>
              <circle cx={cx} cy={cy} r="14" fill="#3952d0"/>
              <text
                x={cx} y={cy + 5}
                textAnchor="middle"
                fill="white"
                fontSize="13"
                fontWeight="bold"
                fontFamily="Nunito, sans-serif"
              >
                {id}
              </text>
              <text
                x={cx} y={cy + 28}
                textAnchor="middle"
                fill="#1e1e1e"
                fontSize="10.5"
                fontFamily="Nunito, sans-serif"
              >
                {label}
              </text>
            </g>
          ))}

        </svg>
      </div>

    </div>
  )
}
