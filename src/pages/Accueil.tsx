/**
 * Page d'accueil Solimouv' — design Figma mobile-first.
 * Sections : Hero · Au programme · Sport · Carte · Associations · CTA final
 *
 * Assets Figma : valides 7 jours depuis le 2026-04-17.
 * Sources : node 113:1876 (Home frame).
 */

import { Link } from 'react-router-dom'
import { useActivites, useAssociations } from '../hooks/useFirestore'
import type { Activite, Association } from '../types'
import styles from './Accueil.module.css'

// ── Assets hero ───────────────────────────────────────────────
const LOGO_SRC      = 'https://www.figma.com/api/mcp/asset/d4c6dbfa-3721-47f7-9cf4-bfa781f8f82e'
const ATHLETE_SRC   = 'https://www.figma.com/api/mcp/asset/2abfe27b-0f3e-46d6-8449-594854be8270'
const MASCOT_SRC    = 'https://www.figma.com/api/mcp/asset/a9a2fb96-00ea-4a93-b1bf-6b002ac83fc6'

// Fleurs décoratives hero
const FLOWER_ORANGE = 'https://www.figma.com/api/mcp/asset/36843d25-f8b3-4f10-8cd7-d8bec05bfc30'
const FLOWER_BLUE   = 'https://www.figma.com/api/mcp/asset/6e9db7df-d720-411a-bf80-bb7fbc7de8cf'
const FLOWER_GREEN  = 'https://www.figma.com/api/mcp/asset/59ec4c9e-366d-4fcc-a72a-028c7d0b65a4'
const FLOWER_PURPLE = 'https://www.figma.com/api/mcp/asset/bcbf9a72-4e98-44c0-aeb9-ecbac6c3cdb5'

// ── Sport section — fleurs colorées (node 113:1876) ───────────
// Chaque sport : fleur blob colorée (Vector5-8) + icône sport centrée dessus
const SPORTS = [
  {
    label: 'Baseball',
    flower: 'https://www.figma.com/api/mcp/asset/0977c7e1-25cf-41de-ae0c-691d64c384d0', // Vector5 orange
    icon:   'https://www.figma.com/api/mcp/asset/be536219-9870-41d6-b2fc-d078eeb8fe7f', // Tennis21
    flowerRotate: '180deg',
  },
  {
    label: 'Foot',
    flower: 'https://www.figma.com/api/mcp/asset/46ed203d-5375-48e4-916e-4cfdbab9a84f', // Vector6 bleu
    icon:   'https://www.figma.com/api/mcp/asset/72101672-453f-46e0-90fe-59f01eedf579', // Foot1
    flowerRotate: '0deg',
  },
  {
    label: 'Badminton',
    flower: 'https://www.figma.com/api/mcp/asset/5e5178f1-c742-4f8c-b32b-b2d20512e6b9', // Vector7 rouge
    icon:   'https://www.figma.com/api/mcp/asset/43f684c7-1c0b-4ed4-8a17-6e874ca9f87c', // Badminton1
    flowerRotate: '-90deg',
  },
  {
    label: 'Tennis',
    flower: 'https://www.figma.com/api/mcp/asset/c1d47e23-1137-4b06-b762-47895fb6af89', // Vector8 vert
    icon:   'https://www.figma.com/api/mcp/asset/a6a45fc7-e6e2-4032-aa22-eaf32dd95d25', // Tennis4
    flowerRotate: '180deg',
  },
]

// ── Programme card assets ─────────────────────────────────────
const CARD_WAVE   = 'https://www.figma.com/api/mcp/asset/b19c2b01-4629-4f0b-8ab1-294ed032d430'
const CARD_PERSON = 'https://www.figma.com/api/mcp/asset/2b2b1c80-d1cc-4971-bdbf-200e0c4b860a'
const ICON_LOC    = 'https://www.figma.com/api/mcp/asset/f12aa1ea-6243-45fb-a9fa-8ade9b2854ee'
const ICON_CLOCK  = 'https://www.figma.com/api/mcp/asset/aa1e5a1c-7f70-4a04-8e20-b8f8728faa6e'

// ── Carte statique — layers ───────────────────────────────────
const MAP_LANDUSE          = 'https://www.figma.com/api/mcp/asset/d47f3efc-78ea-4154-b9a4-3fe357bec8cf'
const MAP_BUILDING_OUTLINE = 'https://www.figma.com/api/mcp/asset/927eab77-9935-4e70-b09f-7c0a7bc85e5d'
const MAP_BUILDING         = 'https://www.figma.com/api/mcp/asset/a7f1c4f0-63f5-41c3-8cfa-b1956ca021b1'
const MAP_ROAD_MINOR_LOW   = 'https://www.figma.com/api/mcp/asset/adf14b82-b834-4034-8880-a5d201de8ff3'
const MAP_ROAD_STREET_LOW  = 'https://www.figma.com/api/mcp/asset/05c614fe-e23c-4a48-90c0-357336c45b78'
const MAP_ROAD_PATH        = 'https://www.figma.com/api/mcp/asset/ceba9930-523b-44f0-8dec-fc467ab8c33f'
const MAP_ROAD_MINOR       = 'https://www.figma.com/api/mcp/asset/1a2d18f7-adbc-4c51-b9f7-4c53c84c6412'
const MAP_ROAD_STREET      = 'https://www.figma.com/api/mcp/asset/e18b5fae-7ef8-4777-9a46-601158643b4c'
const MAP_ROAD_SECONDARY   = 'https://www.figma.com/api/mcp/asset/cdafe44e-64e1-438c-b64c-2e3dea3050ae'
const MAP_PIN              = 'https://www.figma.com/api/mcp/asset/7e5766a0-cb89-498c-a97f-7925d70813b6'
const MAP_ELLIPSE_OUTER    = 'https://www.figma.com/api/mcp/asset/d8b568f5-4dc0-442b-bb5f-5b0d48fa9842'
const MAP_ELLIPSE_INNER    = 'https://www.figma.com/api/mcp/asset/24160b26-cf3e-4df8-b981-ed0002de69ff'
const MAP_ARROW            = 'https://www.figma.com/api/mcp/asset/7abbbd80-aebd-4736-b214-4f50a2e83fa5'

// ── CTA final — grande fleur blob verte (node 113:1876) ───────
const CTA_FLOWER = 'https://www.figma.com/api/mcp/asset/325af25f-b37b-4099-bfdf-fa015d38a7cf'

// ── Association card — vague décorative ──────────────────────
const ASSO_WAVE = 'https://www.figma.com/api/mcp/asset/61524acc-b97a-4eb0-bbea-9b7ee980a9f8'

// ── Composant : Carte statique Figma ─────────────────────────
function CarteStatique() {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapFrame}>
        <img src={MAP_LANDUSE}          className={styles.mapLayer} style={{ zIndex: 1 }}  alt="" aria-hidden="true" />
        <img src={MAP_BUILDING_OUTLINE} className={styles.mapLayer} style={{ zIndex: 2 }}  alt="" aria-hidden="true" />
        <img src={MAP_BUILDING}         className={styles.mapLayer} style={{ zIndex: 3 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_MINOR_LOW}   className={styles.mapLayer} style={{ zIndex: 4 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_STREET_LOW}  className={styles.mapLayer} style={{ zIndex: 5 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_PATH}        className={styles.mapLayer} style={{ zIndex: 6 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_MINOR}       className={styles.mapLayer} style={{ zIndex: 7 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_STREET}      className={styles.mapLayer} style={{ zIndex: 8 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_SECONDARY}   className={styles.mapLayer} style={{ zIndex: 9 }}  alt="" aria-hidden="true" />

        <div className={styles.mapPinWrap} style={{ left: '154px', top: '119px', zIndex: 10 }}>
          <img src={MAP_PIN} alt="Point de rassemblement" width="37" height="45" />
        </div>

        <div className={styles.mapMarker} style={{ left: '86px', top: '100px', zIndex: 11 }}>
          <img src={MAP_ELLIPSE_OUTER} className={styles.markerOuter} alt="" aria-hidden="true" />
          <img src={MAP_ELLIPSE_INNER} className={styles.markerInnerImg} alt="" aria-hidden="true" />
          <span className={styles.markerNum}>3</span>
        </div>

        <div className={styles.mapMarker} style={{ left: '44px', top: '183px', zIndex: 11 }}>
          <img src={MAP_ELLIPSE_OUTER} className={styles.markerOuter} alt="" aria-hidden="true" />
          <img src={MAP_ELLIPSE_INNER} className={styles.markerInnerImg} alt="" aria-hidden="true" />
          <span className={styles.markerNum}>2</span>
        </div>

        <div className={styles.mapMarker} style={{ left: '130px', top: '185px', zIndex: 11 }}>
          <img src={MAP_ELLIPSE_OUTER} className={styles.markerOuter} alt="" aria-hidden="true" />
          <img src={MAP_ELLIPSE_INNER} className={styles.markerInnerImg} alt="" aria-hidden="true" />
          <span className={styles.markerNum}>1</span>
        </div>

        <span className={styles.mapLabel} style={{ right: '6px', bottom: '60px', transform: 'rotate(-64deg)' }}>
          Rue Baudricourt
        </span>
      </div>
    </div>
  )
}

// ── Composant : Card activité (programme) ────────────────────
function CarteActivite({ activite }: { activite: Activite }) {
  return (
    <article className={styles.progCard} aria-label={activite.titre}>
      <img className={styles.progCardWave}   src={CARD_WAVE}   alt="" aria-hidden="true" />
      <img className={styles.progCardPerson} src={CARD_PERSON} alt="" aria-hidden="true" />
      <div className={styles.progCardContent}>
        <div className={styles.progCardHeader}>
          {activite.emoji && (
            <span className={styles.progCardEmoji}>{activite.emoji}</span>
          )}
          <div>
            <h3 className={styles.progCardTitre}>{activite.titre}</h3>
            <p className={styles.progCardAsso}>Par {activite.association_nom}</p>
          </div>
        </div>
        <div className={styles.progCardMeta}>
          <span className={styles.progCardMetaItem}>
            <img src={ICON_LOC}   alt="" aria-hidden="true" width="13" height="16" />
            {activite.lieu}
          </span>
          <span className={styles.progCardMetaItem}>
            <img src={ICON_CLOCK} alt="" aria-hidden="true" width="15" height="15" />
            {activite.heure_debut}
          </span>
        </div>
        <div className={styles.progCardTags}>
          <span className={styles.tag}>{activite.type}</span>
          {activite.places_max && <span className={styles.tag}>gratuit</span>}
        </div>
      </div>
    </article>
  )
}

// ── Composant : Card association ─────────────────────────────
function CarteAssociation({ asso }: { asso: Association }) {
  const [premier, ...reste] = asso.nom.split(' ')
  return (
    <article className={styles.assoCard} aria-label={asso.nom}>
      <img src={ASSO_WAVE} className={styles.assoCardWave} alt="" aria-hidden="true" />
      <div className={styles.assoCardContent}>
        <h3 className={styles.assoCardNom}>
          <span className={styles.assoCardScript}>{premier}</span>
          {reste.length > 0 && (
            <span className={styles.assoCardNomSuite}> {reste.join(' ')}</span>
          )}
        </h3>
        <p className={styles.assoCardSoustitre}>{asso.disciplines.slice(0, 2).join(', ')}.</p>
        <p className={styles.assoCardDesc}>{asso.description.slice(0, 160)}…</p>
      </div>
    </article>
  )
}

// ── Page principale ───────────────────────────────────────────
export default function Accueil() {
  const { data: activites }    = useActivites()
  const { data: associations } = useAssociations()

  return (
    <div className={styles.page}>

      {/* ═══════════════════════════════
          1. HERO
      ═══════════════════════════════ */}
      <section className={styles.hero} aria-label="Bienvenue au Solimouv'">
        <img className={styles.flowerTopRight}   src={FLOWER_ORANGE} alt="" aria-hidden="true" />
        <img className={styles.flowerTopLeft}    src={FLOWER_BLUE}   alt="" aria-hidden="true" />
        <img className={styles.flowerBottomLeft} src={FLOWER_GREEN}  alt="" aria-hidden="true" />
        <img className={styles.flowerRight}      src={FLOWER_PURPLE} alt="" aria-hidden="true" />

        <img className={styles.heroAthlete} src={ATHLETE_SRC} alt="Sportif festival" />
        <div className={styles.heroFade} aria-hidden="true" />

        <div className={styles.heroLogoWrap}>
          <img src={LOGO_SRC} alt="Solimouv'" className={styles.heroLogo} />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitre}>
            <span className={styles.heroTitreBleu}>Bienvenue</span>
            <br />
            <span className={styles.heroTitreVert}>au Solimouv</span>
          </h1>
          <p className={styles.heroDesc}>
            Et si on trouvait le sport qui te correspond vraiment&nbsp;?
            <br />
            Que tu sois là pour transpirer, pour rigoler ou pour rencontrer du monde,
            on a une place pour toi.
          </p>
          <Link to="/associations" className={styles.heroCta}>
            Trouver mon sport
          </Link>
        </div>

        <img className={styles.heroMascot} src={MASCOT_SRC} alt="" aria-hidden="true" />
      </section>

      {/* ═══════════════════════════════
          2. AU PROGRAMME — carrousel
      ═══════════════════════════════ */}
      <section className={styles.section} aria-labelledby="titre-programme">
        <div className={styles.sectionHeaderRow}>
          <div>
            <h2 id="titre-programme" className={styles.titreSouligné}>Au programme</h2>
            <p className={styles.sectionSubtitle}>À découvrir lors du festival</p>
          </div>
          <Link to="/programme" className={styles.voirPlusLink}>Voir plus</Link>
        </div>
        {activites && activites.length > 0 ? (
          <div className={styles.carousel} role="list">
            {activites.slice(0, 6).map((a) => (
              <div key={a.id} role="listitem" className={styles.carouselItem}>
                <CarteActivite activite={a} />
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.vide}>Programme bientôt disponible…</p>
        )}
      </section>

      {/* ═══════════════════════════════
          3. SPORT — fleurs colorées avec icônes
      ═══════════════════════════════ */}
      <section className={styles.section} aria-labelledby="titre-sport">
        <div className={styles.sectionHeaderRow}>
          <div>
            <h2 id="titre-sport" className={styles.titreSouligné}>Sport</h2>
          </div>
          <Link to="/associations" className={styles.voirPlusLink}>Voir plus</Link>
        </div>
        <div className={styles.sportCarousel}>
          {SPORTS.map((s) => (
            <div key={s.label} className={styles.sportItem}>
              <div className={styles.sportFlowerWrap}>
                <img
                  src={s.flower}
                  alt=""
                  aria-hidden="true"
                  className={styles.sportFlowerImg}
                  style={{ transform: `rotate(${s.flowerRotate})` }}
                />
                <img src={s.icon} alt={s.label} className={styles.sportIconOnFlower} />
              </div>
              <span className={styles.sportLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════
          4. CARTE STATIQUE FIGMA
      ═══════════════════════════════ */}
      <section className={styles.section} aria-labelledby="titre-carte">
        <div className={styles.carteTitleRow}>
          <div>
            <h2 id="titre-carte" className={styles.titreSouligné}>Carte</h2>
            <p className={styles.sectionSubtitle}>
              Ne perdez pas une minute !<br />
              Localisez instantanément les stands
            </p>
          </div>
          <Link to="/carte" className={styles.voirPlusLink}>Voir plus</Link>
        </div>

        <CarteStatique />

        <div className={styles.carteCta}>
          <Link to="/carte" className={styles.btnPlusStand}>
            Plus de <span className={styles.btnScript}>stand</span>
            <img src={MAP_ARROW} alt="" aria-hidden="true" width="15" height="15" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════
          5. ASSOCIATIONS — carrousel
      ═══════════════════════════════ */}
      <section className={styles.section} aria-labelledby="titre-assos">
        <div className={styles.sectionHeaderRow}>
          <div>
            <h2 id="titre-assos" className={styles.titreSouligné}>Associations</h2>
            <p className={styles.sectionSubtitle}>
              Ne perdez pas une minute !<br />
              Localisez instantanément les stands
            </p>
          </div>
          <Link to="/associations" className={styles.voirPlusLink}>Voir plus</Link>
        </div>
        {associations && associations.length > 0 ? (
          <div className={`${styles.carousel} ${styles.carouselAsso}`} role="list">
            {associations.slice(0, 6).map((a) => (
              <div key={a.id} role="listitem" className={styles.carouselItem}>
                <CarteAssociation asso={a} />
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.vide}>Associations bientôt disponibles…</p>
        )}
      </section>

      {/* ═══════════════════════════════
          6. CTA FINAL — fleur blob verte
      ═══════════════════════════════ */}
      <section className={styles.ctaFinal} aria-labelledby="titre-cta-final">
        <img className={styles.ctaBigFlower} src={CTA_FLOWER} alt="" aria-hidden="true" />
        <div className={styles.ctaFinalContent}>
          <h2 id="titre-cta-final" className={styles.ctaFinalTitre}>
            Ne restez pas
            <br />
            <span className={styles.ctaFinalScript}>sur la touche&nbsp;!</span>
          </h2>
          <p className={styles.ctaFinalSub}>Vous mourez déjà d'envie de revenir&nbsp;?</p>
          <Link to="/register" className={styles.ctaFinalBtn}>M'inscrire</Link>
        </div>
      </section>

    </div>
  )
}
