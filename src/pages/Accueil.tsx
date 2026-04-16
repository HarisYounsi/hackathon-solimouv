/**
 * Page d'accueil Solimouv' — design Figma mobile-first.
 * Sections : Hero · Sports · Programme · Carte · Associations · CTA final
 *
 * Assets Figma : valides 7 jours depuis le 2026-04-17.
 * Sources : node 99:31 (Home), 90:533 (iPhone 14 Plus - 15), 113:1876 (Home desktop).
 */

import { Link } from 'react-router-dom'
import { useActivites, useAssociations } from '../hooks/useFirestore'
import type { Activite, Association } from '../types'
import styles from './Accueil.module.css'

// ── Assets principaux (node 99:31) ───────────────────────────
const LOGO_SRC      = 'https://www.figma.com/api/mcp/asset/6c9faec6-ce1c-4f1b-8512-c9e679a1a39e'
const ATHLETE_SRC   = 'https://www.figma.com/api/mcp/asset/ea6b6832-64f5-47f8-a3d5-12c2a49905c0'
const MASCOT_SRC    = 'https://www.figma.com/api/mcp/asset/a9a2fb96-00ea-4a93-b1bf-6b002ac83fc6'

// Fleurs décoratives — vecteurs du hero
const FLOWER_ORANGE = 'https://www.figma.com/api/mcp/asset/36843d25-f8b3-4f10-8cd7-d8bec05bfc30'
const FLOWER_BLUE   = 'https://www.figma.com/api/mcp/asset/6e9db7df-d720-411a-bf80-bb7fbc7de8cf'
const FLOWER_GREEN  = 'https://www.figma.com/api/mcp/asset/59ec4c9e-366d-4fcc-a72a-028c7d0b65a4'
const FLOWER_PURPLE = 'https://www.figma.com/api/mcp/asset/bcbf9a72-4e98-44c0-aeb9-ecbac6c3cdb5'

// ── Sport section — icônes dans carrés bordurés bleus (node 90:533) ──
const SPORTS = [
  { label: 'Baseball',  icon: 'https://www.figma.com/api/mcp/asset/04274174-3d96-479a-a834-e4813a80c0b3' },
  { label: 'Foot',      icon: 'https://www.figma.com/api/mcp/asset/abc36638-0649-4745-921b-b81e90a223a5' },
  { label: 'Badminton', icon: 'https://www.figma.com/api/mcp/asset/c9532410-3b28-4ed0-9e32-7d6a7d88b27c' },
  { label: 'Muscu',     icon: 'https://www.figma.com/api/mcp/asset/7804cfc1-e0a0-4dbe-93fa-1e60812b829c' },
  { label: 'Tennis',    icon: 'https://www.figma.com/api/mcp/asset/72b11240-bc87-49f7-b340-4ed241b60088' },
]

// ── Programme card assets (node 99:31) ───────────────────────
const CARD_WAVE   = 'https://www.figma.com/api/mcp/asset/450d39b1-86a9-4c89-b9be-45bc4a9585ed'
const CARD_PERSON = 'https://www.figma.com/api/mcp/asset/b87aafbc-822f-4329-89e9-bd90aa23f80d'
const ICON_LOC    = 'https://www.figma.com/api/mcp/asset/145ecf13-7605-418e-b30c-869a016ce2d5'
const ICON_CLOCK  = 'https://www.figma.com/api/mcp/asset/3807526d-0e76-4f0e-9168-04557ef096c4'

// ── Carte statique — layers (node 99:50, dans 99:31) ─────────
// Frame 600×600 positionné à left=-104, top=-214 dans le conteneur 396×294
const MAP_LANDUSE          = 'https://www.figma.com/api/mcp/asset/d47f3efc-78ea-4154-b9a4-3fe357bec8cf'
const MAP_BUILDING_OUTLINE = 'https://www.figma.com/api/mcp/asset/927eab77-9935-4e70-b09f-7c0a7bc85e5d'
const MAP_BUILDING         = 'https://www.figma.com/api/mcp/asset/a7f1c4f0-63f5-41c3-8cfa-b1956ca021b1'
const MAP_ROAD_MINOR_LOW   = 'https://www.figma.com/api/mcp/asset/adf14b82-b834-4034-8880-a5d201de8ff3'
const MAP_ROAD_STREET_LOW  = 'https://www.figma.com/api/mcp/asset/05c614fe-e23c-4a48-90c0-357336c45b78'
const MAP_ROAD_PATH        = 'https://www.figma.com/api/mcp/asset/ceba9930-523b-44f0-8dec-fc467ab8c33f'
const MAP_ROAD_MINOR       = 'https://www.figma.com/api/mcp/asset/1a2d18f7-adbc-4c51-b9f7-4c53c84c6412'
const MAP_ROAD_STREET      = 'https://www.figma.com/api/mcp/asset/e18b5fae-7ef8-4777-9a46-601158643b4c'
const MAP_ROAD_SECONDARY   = 'https://www.figma.com/api/mcp/asset/cdafe44e-64e1-438c-b64c-2e3dea3050ae'
// Markers
const MAP_PIN              = 'https://www.figma.com/api/mcp/asset/fc6e4b4d-58b2-4274-814f-90be9218184c'
const MAP_ELLIPSE_OUTER    = 'https://www.figma.com/api/mcp/asset/061d5c80-0974-4e2c-a615-724772626c3f'
const MAP_ELLIPSE_INNER    = 'https://www.figma.com/api/mcp/asset/e7419a9a-db68-4a10-9a07-d7c2d7f7305e'
const MAP_ARROW            = 'https://www.figma.com/api/mcp/asset/3b317563-b2bd-48e5-8db1-e35de9aa15e2'

// ── CTA final — grande fleur blob verte (node 113:1876) ──────
const CTA_FLOWER = 'https://www.figma.com/api/mcp/asset/03ec5962-c778-4b9b-b682-e480f2140337'

// ── Association card — vague décorative (node 113:1876) ──────
const ASSO_WAVE = 'https://www.figma.com/api/mcp/asset/d3c1659b-3735-4822-a7d7-f2dcc30dfca8'

// ── Composant : Carte statique Figma ─────────────────────────
// Positions des markers (frame 600×600, offset -104/-214 vers conteneur 396×294) :
//   Pin      : frame (258, 333) → conteneur (154, 119)
//   Marker 3 : frame (190, 314) → conteneur (86, 100)
//   Marker 2 : frame (148, 397) → conteneur (44, 183)
//   Marker 1 : frame (234, 399) → conteneur (130, 185)

function CarteStatique() {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapFrame}>
        {/* Fond dégradé + tuiles cartographiques */}
        <img src={MAP_LANDUSE}          className={styles.mapLayer} style={{ zIndex: 1 }}  alt="" aria-hidden="true" />
        <img src={MAP_BUILDING_OUTLINE} className={styles.mapLayer} style={{ zIndex: 2 }}  alt="" aria-hidden="true" />
        <img src={MAP_BUILDING}         className={styles.mapLayer} style={{ zIndex: 3 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_MINOR_LOW}   className={styles.mapLayer} style={{ zIndex: 4 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_STREET_LOW}  className={styles.mapLayer} style={{ zIndex: 5 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_PATH}        className={styles.mapLayer} style={{ zIndex: 6 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_MINOR}       className={styles.mapLayer} style={{ zIndex: 7 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_STREET}      className={styles.mapLayer} style={{ zIndex: 8 }}  alt="" aria-hidden="true" />
        <img src={MAP_ROAD_SECONDARY}   className={styles.mapLayer} style={{ zIndex: 9 }}  alt="" aria-hidden="true" />

        {/* Pin de localisation central */}
        <div className={styles.mapPinWrap} style={{ left: '154px', top: '119px', zIndex: 10 }}>
          <img src={MAP_PIN} alt="Point de rassemblement" width="37" height="45" />
        </div>

        {/* Marker 3 */}
        <div className={styles.mapMarker} style={{ left: '86px', top: '100px', zIndex: 11 }}>
          <img src={MAP_ELLIPSE_OUTER} className={styles.markerOuter} alt="" aria-hidden="true" />
          <img src={MAP_ELLIPSE_INNER} className={styles.markerInnerImg} alt="" aria-hidden="true" />
          <span className={styles.markerNum}>3</span>
        </div>

        {/* Marker 2 */}
        <div className={styles.mapMarker} style={{ left: '44px', top: '183px', zIndex: 11 }}>
          <img src={MAP_ELLIPSE_OUTER} className={styles.markerOuter} alt="" aria-hidden="true" />
          <img src={MAP_ELLIPSE_INNER} className={styles.markerInnerImg} alt="" aria-hidden="true" />
          <span className={styles.markerNum}>2</span>
        </div>

        {/* Marker 1 */}
        <div className={styles.mapMarker} style={{ left: '130px', top: '185px', zIndex: 11 }}>
          <img src={MAP_ELLIPSE_OUTER} className={styles.markerOuter} alt="" aria-hidden="true" />
          <img src={MAP_ELLIPSE_INNER} className={styles.markerInnerImg} alt="" aria-hidden="true" />
          <span className={styles.markerNum}>1</span>
        </div>

        {/* Label Rue Baudricourt */}
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
        {/* Fleurs décoratives */}
        <img className={styles.flowerTopRight}   src={FLOWER_ORANGE} alt="" aria-hidden="true" />
        <img className={styles.flowerTopLeft}    src={FLOWER_BLUE}   alt="" aria-hidden="true" />
        <img className={styles.flowerBottomLeft} src={FLOWER_GREEN}  alt="" aria-hidden="true" />
        <img className={styles.flowerRight}      src={FLOWER_PURPLE} alt="" aria-hidden="true" />

        {/* Sportif */}
        <img className={styles.heroAthlete} src={ATHLETE_SRC} alt="Sportif festival" />
        <div className={styles.heroFade} aria-hidden="true" />

        {/* Logo centré en haut */}
        <div className={styles.heroLogoWrap}>
          <img src={LOGO_SRC} alt="Solimouv'" className={styles.heroLogo} />
        </div>

        {/* Texte + CTA */}
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
          2. SPORT — carrousel de carrés bordurés
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
              <div className={styles.sportBox}>
                <img src={s.icon} alt={s.label} className={styles.sportIcon} />
              </div>
              <span className={styles.sportLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════
          3. AU PROGRAMME — carrousel
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
