/**
 * Page d'accueil Solimouv' — design Figma mobile-first.
 * 7 sections : Hero · Sports · Programme · Carte · Associations · CTA final
 */

import { Link } from 'react-router-dom'
import { useActivites, useAssociations } from '../hooks/useFirestore'
import type { Activite, Association } from '../types'
import styles from './Accueil.module.css'

// ── Assets Figma (valides 7 jours) ─────────────────────────────
const LOGO_SRC       = 'https://www.figma.com/api/mcp/asset/53fc2480-a78a-4f33-8b52-3ccd1fca1cc9'
const ATHLETE_SRC    = 'https://www.figma.com/api/mcp/asset/79b7eedb-da1d-4f0d-b930-f1cb1ef26825'
const FLOWER_ORANGE  = 'https://www.figma.com/api/mcp/asset/246975b9-5a17-426f-8557-4c3ccd2a227a'
const FLOWER_BLUE    = 'https://www.figma.com/api/mcp/asset/af1de315-0a77-4537-b0cb-9d9b829eb055'
const FLOWER_GREEN   = 'https://www.figma.com/api/mcp/asset/039c4d83-badd-4699-979c-3bc11027b302'
const FLOWER_PURPLE  = 'https://www.figma.com/api/mcp/asset/e2d03ae7-083c-48b6-8a76-b83ab636dbea'
const MASCOT_SRC     = 'https://www.figma.com/api/mcp/asset/86ca9a5c-0fd4-4382-89b0-2250f3e191b1'

// Sport section — fleurs colorées + icônes
const SPORTS = [
  {
    label: 'Baseball',
    flower: 'https://www.figma.com/api/mcp/asset/a23ba4c4-8161-4ebc-b667-11617ff98ad4',
    icon:   'https://www.figma.com/api/mcp/asset/0f3e880f-ee05-4cd4-b58d-76210ea00b19',
  },
  {
    label: 'Foot',
    flower: 'https://www.figma.com/api/mcp/asset/5636b782-650a-404f-8b87-458fbb08d576',
    icon:   'https://www.figma.com/api/mcp/asset/5aebbe78-030b-47f4-8588-f2ea901471d9',
  },
  {
    label: 'Badminton',
    flower: 'https://www.figma.com/api/mcp/asset/53412cdd-bc4c-44f4-9223-9a8b2c7d7c44',
    icon:   'https://www.figma.com/api/mcp/asset/9539d4d4-48c0-4b0c-aa19-7f85d928eca0',
  },
  {
    label: 'Tennis',
    flower: 'https://www.figma.com/api/mcp/asset/34390103-3a44-45ac-8372-00ea297b7444',
    icon:   'https://www.figma.com/api/mcp/asset/dd385d3b-9c64-44a1-9a48-743429274e63',
  },
]

// Programme card — assets
const CARD_WAVE   = 'https://www.figma.com/api/mcp/asset/62656dba-8039-438f-baf3-916203c03107'
const CARD_PERSON = 'https://www.figma.com/api/mcp/asset/47c17ede-3057-4714-af15-4fd5d8202c68'
const ICON_LOC    = 'https://www.figma.com/api/mcp/asset/5d789777-f3d3-469e-a5ff-5a0356bb80c6'
const ICON_CLOCK  = 'https://www.figma.com/api/mcp/asset/5928ebdf-bac0-447e-9ae0-ec6fbb8da2a9'

// Google Maps embed — Parc de la Villette
const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.27!2d2.3907!3d48.8938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dd47bf7ef2d%3A0x65a1c48c9a7c3572!2sParc%20de%20la%20Villette!5e0!3m2!1sfr!2sfr!4v1'

// ── Sous-composants ─────────────────────────────────────────────

function CarteActivite({ activite }: { activite: Activite }) {
  return (
    <article className={styles.progCard} aria-label={activite.titre}>
      {/* Fond décoratif */}
      <img className={styles.progCardWave} src={CARD_WAVE} alt="" aria-hidden="true" />
      <img className={styles.progCardPerson} src={CARD_PERSON} alt="" aria-hidden="true" />

      {/* Contenu */}
      <div className={styles.progCardContent}>
        <div className={styles.progCardHeader}>
          {activite.emoji && <span className={styles.progCardEmoji}>{activite.emoji}</span>}
          <div>
            <h3 className={styles.progCardTitre}>{activite.titre}</h3>
            <p className={styles.progCardAsso}>Par {activite.association_nom}</p>
          </div>
        </div>

        <div className={styles.progCardMeta}>
          <span className={styles.progCardMetaItem}>
            <img src={ICON_LOC} alt="" aria-hidden="true" width="14" height="17" />
            {activite.lieu}
          </span>
          <span className={styles.progCardMetaItem}>
            <img src={ICON_CLOCK} alt="" aria-hidden="true" width="16" height="16" />
            {activite.heure_debut}
          </span>
        </div>

        <div className={styles.progCardTags}>
          <span className={styles.tag}>{activite.type}</span>
          {activite.places_max && (
            <span className={styles.tag}>gratuit</span>
          )}
        </div>
      </div>
    </article>
  )
}

function CarteAssociation({ asso }: { asso: Association }) {
  return (
    <article className={styles.assoCard} aria-label={asso.nom}>
      <div className={styles.assoCardContent}>
        <h3 className={styles.assoCardNom}>
          <span className={styles.assoCardScript}>{asso.nom.split(' ')[0]}</span>
          {asso.nom.split(' ').length > 1 && (
            <span className={styles.assoCardNomSuite}>{' ' + asso.nom.split(' ').slice(1).join(' ')}</span>
          )}
        </h3>
        <p className={styles.assoCardSoustitre}>
          {asso.disciplines.slice(0, 2).join(', ')}
        </p>
        <p className={styles.assoCardDesc}>{asso.description.slice(0, 120)}…</p>
      </div>
    </article>
  )
}

// ── Page principale ──────────────────────────────────────────────

export default function Accueil() {
  const { data: activites } = useActivites()
  const { data: associations } = useAssociations()

  return (
    <div className={styles.page}>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className={styles.hero} aria-label="Bienvenue au Solimouv'">
        {/* Fleurs décoratives */}
        <img className={styles.flowerTopRight}   src={FLOWER_ORANGE} alt="" aria-hidden="true" />
        <img className={styles.flowerTopLeft}    src={FLOWER_BLUE}   alt="" aria-hidden="true" />
        <img className={styles.flowerBottomLeft} src={FLOWER_GREEN}  alt="" aria-hidden="true" />
        <img className={styles.flowerRight}      src={FLOWER_PURPLE} alt="" aria-hidden="true" />

        {/* Photo sportif */}
        <img className={styles.heroAthlete} src={ATHLETE_SRC} alt="Sportif festival" />

        {/* Dégradé fade */}
        <div className={styles.heroFade} aria-hidden="true" />

        {/* Logo */}
        <div className={styles.heroLogoWrap}>
          <img src={LOGO_SRC} alt="Solimouv'" className={styles.heroLogo} />
        </div>

        {/* Texte + CTA */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitre}>
            <span className={styles.heroTitreBleu}>Bienvenue</span>
            <br />
            <span className={styles.heroTitreScript}>au Solimouv</span>
          </h1>
          <p className={styles.heroDesc}>
            Et si on trouvait le sport qui te correspond vraiment&nbsp;?<br />
            Que tu sois là pour transpirer,{' '}
            pour rigoler ou pour rencontrer du monde, on a une place pour toi.
          </p>
          <Link to="/associations" className={styles.heroCta}>
            Trouver mon sport
          </Link>
        </div>

        {/* Mascotte */}
        <img className={styles.heroMascot} src={MASCOT_SRC} alt="" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════
          2. SPORTS
      ══════════════════════════════════════════ */}
      <section className={styles.section} aria-labelledby="titre-sport">
        <h2 id="titre-sport" className={styles.titreSouligné}>Sport</h2>
        <div className={styles.sportGrid}>
          {SPORTS.map((s) => (
            <div key={s.label} className={styles.sportItem}>
              <div className={styles.sportFlower}>
                <img src={s.flower} alt="" aria-hidden="true" className={styles.sportFlowerImg} />
                <img src={s.icon}   alt="" aria-hidden="true" className={styles.sportIconImg} />
              </div>
              <span className={styles.sportLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. AU PROGRAMME
      ══════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════
          4. CARTE
      ══════════════════════════════════════════ */}
      <section className={styles.section} aria-labelledby="titre-carte">
        <div className={styles.sectionHeader}>
          <h2 id="titre-carte" className={styles.titreSouligné}>Carte</h2>
          <p className={styles.sectionSubtitle}>
            Ne perdez pas une minute !<br />
            Localisez instantanément les stands
          </p>
        </div>

        <div className={styles.carteEmbed}>
          <iframe
            title="Carte du festival Solimouv'"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className={styles.carteIframe}
          />
        </div>

        <div className={styles.carteCta}>
          <Link to="/carte" className={styles.btnOutline}>
            Plus de stand
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. ASSOCIATIONS
      ══════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════
          6. CTA FINAL (fond vert)
      ══════════════════════════════════════════ */}
      <section className={styles.ctaFinal} aria-labelledby="titre-cta-final">
        {/* Fleur décorative */}
        <img className={styles.ctaFlower} src={FLOWER_ORANGE} alt="" aria-hidden="true" />

        <div className={styles.ctaFinalContent}>
          <h2 id="titre-cta-final" className={styles.ctaFinalTitre}>
            Ne restez pas
            <br />
            <span className={styles.ctaFinalScript}>sur la touche&nbsp;!</span>
          </h2>
          <p className={styles.ctaFinalSub}>Vous n'avez pas encore envie de revenir&nbsp;?</p>
          <Link to="/register" className={styles.ctaFinalBtn}>
            M'inscrire
          </Link>
        </div>
      </section>

    </div>
  )
}
