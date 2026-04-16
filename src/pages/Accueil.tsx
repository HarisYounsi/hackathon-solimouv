/**
 * Page d'accueil Solimouv' — design Figma mobile-first.
 * 7 sections : Hero · Sports · Programme · Carte · Associations · CTA final
 */

import { Link } from 'react-router-dom'
import { useActivites, useAssociations } from '../hooks/useFirestore'
import type { Activite, Association } from '../types'
import styles from './Accueil.module.css'

// ── Assets Figma ──────────────────────────────────────────────
const LOGO_SRC      = 'https://www.figma.com/api/mcp/asset/53fc2480-a78a-4f33-8b52-3ccd1fca1cc9'
const ATHLETE_SRC   = 'https://www.figma.com/api/mcp/asset/79b7eedb-da1d-4f0d-b930-f1cb1ef26825'
const FLOWER_ORANGE = 'https://www.figma.com/api/mcp/asset/246975b9-5a17-426f-8557-4c3ccd2a227a'
const FLOWER_BLUE   = 'https://www.figma.com/api/mcp/asset/af1de315-0a77-4537-b0cb-9d9b829eb055'
const FLOWER_GREEN  = 'https://www.figma.com/api/mcp/asset/039c4d83-badd-4699-979c-3bc11027b302'
const FLOWER_PURPLE = 'https://www.figma.com/api/mcp/asset/e2d03ae7-083c-48b6-8a76-b83ab636dbea'
const MASCOT_SRC    = 'https://www.figma.com/api/mcp/asset/86ca9a5c-0fd4-4382-89b0-2250f3e191b1'

// Sport section — icônes dans carrés bordurés bleus
const SPORTS = [
  { label: 'Baseball',  icon: 'https://www.figma.com/api/mcp/asset/25264171-6817-43b5-9144-afd11ea667ce' },
  { label: 'Foot',      icon: 'https://www.figma.com/api/mcp/asset/8c755b3f-4260-40ab-9d6d-6c1a2fca32c1' },
  { label: 'Badminton', icon: 'https://www.figma.com/api/mcp/asset/c9bdb14c-aa6f-46e8-a7bf-33ea35d43124' },
  { label: 'Muscu',     icon: 'https://www.figma.com/api/mcp/asset/4bccb747-c0c8-4f0f-934d-521dfecd69d5' },
  { label: 'Tennis',    icon: 'https://www.figma.com/api/mcp/asset/f14e1242-0547-471d-93a9-6547035fe7b2' },
]

// Programme card assets
const CARD_WAVE   = 'https://www.figma.com/api/mcp/asset/62656dba-8039-438f-baf3-916203c03107'
const CARD_PERSON = 'https://www.figma.com/api/mcp/asset/47c17ede-3057-4714-af15-4fd5d8202c68'
const ICON_LOC    = 'https://www.figma.com/api/mcp/asset/5d789777-f3d3-469e-a5ff-5a0356bb80c6'
const ICON_CLOCK  = 'https://www.figma.com/api/mcp/asset/5928ebdf-bac0-447e-9ae0-ec6fbb8da2a9'

// Carte statique Figma — layers (node 99:50)
const MAP_LANDUSE          = 'https://www.figma.com/api/mcp/asset/37ce89ed-966a-4147-bc37-c8d3caffb221'
const MAP_BUILDING_OUTLINE = 'https://www.figma.com/api/mcp/asset/919f1286-5155-47de-a3f3-a7e57314c3d9'
const MAP_BUILDING         = 'https://www.figma.com/api/mcp/asset/8dceac13-de50-4496-b878-be11c9182814'
const MAP_ROAD_MINOR       = 'https://www.figma.com/api/mcp/asset/5398a17a-5042-4338-8553-b27a45d7ddfc'
const MAP_ROAD_STREET      = 'https://www.figma.com/api/mcp/asset/6ae06b4e-8205-4a55-9fdf-d6359a3f1a04'
const MAP_PIN              = 'https://www.figma.com/api/mcp/asset/90fe1470-a5c2-4247-839e-8c274967b019'
const MAP_ELLIPSE_OUTER    = 'https://www.figma.com/api/mcp/asset/4fbfa2ff-23a1-4785-9245-544fa53a0f93'
const MAP_ELLIPSE_INNER    = 'https://www.figma.com/api/mcp/asset/6a18949e-1f4b-4ca4-acc4-068d77bdcf95'

// ── Composant Carte Figma statique ────────────────────────────

function CarteStatique() {
  return (
    <div className={styles.mapContainer}>
      {/* Frame interne (600×600) avec gradient + tiles */}
      <div className={styles.mapFrame}>
        <img src={MAP_LANDUSE}          className={styles.mapLayer} style={{ zIndex: 1 }} alt="" aria-hidden="true" />
        <img src={MAP_BUILDING_OUTLINE} className={styles.mapLayer} style={{ zIndex: 2 }} alt="" aria-hidden="true" />
        <img src={MAP_BUILDING}         className={styles.mapLayer} style={{ zIndex: 3 }} alt="" aria-hidden="true" />
        <img src={MAP_ROAD_MINOR}       className={styles.mapLayer} style={{ zIndex: 4, opacity: 0.7 }} alt="" aria-hidden="true" />
        <img src={MAP_ROAD_STREET}      className={styles.mapLayer} style={{ zIndex: 5, opacity: 0.7 }} alt="" aria-hidden="true" />

        {/* Pin central */}
        <div className={styles.mapPinWrap} style={{ left: '136px', top: '83px', zIndex: 10 }}>
          <img src={MAP_PIN} alt="Point de rassemblement" width="30" height="37" />
        </div>

        {/* Marker 3 */}
        <div className={styles.mapMarker} style={{ left: '65px', top: '69px', zIndex: 10 }}>
          <img src={MAP_ELLIPSE_OUTER} className={styles.markerOuter} alt="" aria-hidden="true" />
          <img src={MAP_ELLIPSE_INNER} className={styles.markerInnerImg} alt="" aria-hidden="true" />
          <span className={styles.markerNum}>3</span>
        </div>

        {/* Marker 2 */}
        <div className={styles.mapMarker} style={{ left: '23px', top: '162px', zIndex: 10 }}>
          <img src={MAP_ELLIPSE_OUTER} className={styles.markerOuter} alt="" aria-hidden="true" />
          <img src={MAP_ELLIPSE_INNER} className={styles.markerInnerImg} alt="" aria-hidden="true" />
          <span className={styles.markerNum}>2</span>
        </div>

        {/* Marker 1 */}
        <div className={styles.mapMarker} style={{ left: '109px', top: '164px', zIndex: 10 }}>
          <img src={MAP_ELLIPSE_OUTER} className={styles.markerOuter} alt="" aria-hidden="true" />
          <img src={MAP_ELLIPSE_INNER} className={styles.markerInnerImg} alt="" aria-hidden="true" />
          <span className={styles.markerNum}>1</span>
        </div>

        {/* Rue Baudricourt label */}
        <span className={styles.mapLabel} style={{ right: '6px', bottom: '60px', transform: 'rotate(-64deg)' }}>
          Rue Baudricourt
        </span>
      </div>
    </div>
  )
}

// ── Carte activité (programme) ────────────────────────────────

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

// ── Carte association ─────────────────────────────────────────

function CarteAssociation({ asso }: { asso: Association }) {
  const [premier, ...reste] = asso.nom.split(' ')
  return (
    <article className={styles.assoCard} aria-label={asso.nom}>
      {/* Wave bg */}
      <div className={styles.assoCardBg} aria-hidden="true" />
      <div className={styles.assoCardContent}>
        <h3 className={styles.assoCardNom}>
          <span className={styles.assoCardScript}>{premier}</span>
          {reste.length > 0 && (
            <span className={styles.assoCardNomSuite}> {reste.join(' ')}</span>
          )}
        </h3>
        <p className={styles.assoCardSoustitre}>{asso.disciplines.slice(0, 2).join(', ')}.</p>
        <div className={styles.assoCardFade} aria-hidden="true" />
        <p className={styles.assoCardDesc}>{asso.description.slice(0, 150)}…</p>
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

      {/* ═══════════════════════
          1. HERO
      ═══════════════════════ */}
      <section className={styles.hero} aria-label="Bienvenue au Solimouv'">
        <img className={styles.flowerTopRight}   src={FLOWER_ORANGE} alt="" aria-hidden="true" />
        <img className={styles.flowerTopLeft}    src={FLOWER_BLUE}   alt="" aria-hidden="true" />
        <img className={styles.flowerBottomLeft} src={FLOWER_GREEN}  alt="" aria-hidden="true" />
        <img className={styles.flowerRight}      src={FLOWER_PURPLE} alt="" aria-hidden="true" />
        <img className={styles.heroAthlete}      src={ATHLETE_SRC}   alt="Sportif festival" />
        <div className={styles.heroFade} aria-hidden="true" />

        <div className={styles.heroLogoWrap}>
          <img src={LOGO_SRC} alt="Solimouv'" className={styles.heroLogo} />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitre}>
            <span className={styles.heroTitreBleu}>Bienvenue</span>
            <br />
            <span className={styles.heroTitreScript}>au Solimouv</span>
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

      {/* ═══════════════════════
          2. SPORT — carrousel de carrés bordurés
      ═══════════════════════ */}
      <section className={styles.section} aria-labelledby="titre-sport">
        <h2 id="titre-sport" className={styles.titreSouligné}>Sport</h2>
        <div className={styles.sportCarousel}>
          {SPORTS.map((s) => (
            <div key={s.label} className={styles.sportItem}>
              <div className={styles.sportBox}>
                <img src={s.icon} alt={s.label} className={styles.sportIcon} />
              </div>
              <span className={styles.sportLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════
          3. AU PROGRAMME — carrousel
      ═══════════════════════ */}
      <section className={styles.section} aria-labelledby="titre-programme">
        <div className={styles.sectionHeader}>
          <h2 id="titre-programme" className={styles.titreSouligné}>Au programme</h2>
          <p className={styles.sectionSubtitle}>À découvrir lors du festival</p>
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

      {/* ═══════════════════════
          4. CARTE STATIQUE FIGMA
      ═══════════════════════ */}
      <section className={styles.section} aria-labelledby="titre-carte">
        <div className={styles.carteTitleRow}>
          <div>
            <h2 id="titre-carte" className={styles.titreSouligné}>Carte</h2>
            <p className={styles.sectionSubtitle}>
              Ne perdez pas une minute !<br />
              Localisez instantanément les stands
            </p>
          </div>
          <Link to="/carte" className={styles.voirPlus}>Voir plus</Link>
        </div>

        <CarteStatique />

        <div className={styles.carteCta}>
          <Link to="/carte" className={styles.btnPlusStand}>
            Plus de <span className={styles.btnScript}>stand</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════
          5. ASSOCIATIONS — carrousel
      ═══════════════════════ */}
      <section className={styles.section} aria-labelledby="titre-assos">
        <div className={styles.sectionHeader}>
          <h2 id="titre-assos" className={styles.titreSouligné}>Associations</h2>
          <p className={styles.sectionSubtitle}>
            Ne perdez pas une minute !<br />
            Localisez instantanément les stands
          </p>
        </div>
        {associations && associations.length > 0 ? (
          <div className={styles.carousel} role="list">
            {associations.slice(0, 5).map((a) => (
              <div key={a.id} role="listitem" className={styles.carouselItem}>
                <CarteAssociation asso={a} />
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.vide}>Associations bientôt disponibles…</p>
        )}
      </section>

      {/* ═══════════════════════
          6. CTA FINAL — grande fleur verte
      ═══════════════════════ */}
      <section className={styles.ctaFinal} aria-labelledby="titre-cta-final">
        <img className={styles.ctaBigFlower} src={FLOWER_GREEN} alt="" aria-hidden="true" />
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
