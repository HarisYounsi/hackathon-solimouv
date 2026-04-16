/**
 * Page d'accueil du festival Solimouv'
 * Présente le festival, Up Sport!, les chiffres clés et un appel à l'action.
 */

import Button from '../components/Button'
import styles from './Accueil.module.css'

// Valeurs affichées dans la section chiffres clés
const CHIFFRES_CLES = [
  { valeur: '500+', label: 'Participants attendus', emoji: '🏃' },
  { valeur: '13', label: 'Associations partenaires', emoji: '🤝' },
  { valeur: '1 jour', label: '9h → 19h', emoji: '📅' },
  { valeur: 'Gratuit', label: 'Entrée libre pour tous', emoji: '🎉' },
] as const

// Valeurs portées par le festival
const VALEURS = [
  { titre: 'Inclusif', description: 'Sport pour tous les corps, toutes les identités, tous les âges', emoji: '♿' },
  { titre: 'Gratuit', description: 'Accès libre, sans inscription préalable pour la plupart des activités', emoji: '🆓' },
  { titre: 'Convivial', description: 'Un festival de rencontres entre associations, familles et sportifs', emoji: '🌍' },
  { titre: 'Engagé', description: 'Valeurs de solidarité, diversité et respect au cœur de chaque activité', emoji: '✊' },
] as const

export default function Accueil() {
  return (
    <main className={styles.main}>

      {/* === HERO === */}
      <section className={styles.hero} aria-labelledby="titre-hero">
        <div className={styles.heroContenu}>
          <span className={styles.heroTag}>1ère édition • Paris 2024</span>
          <h1 id="titre-hero" className={styles.heroTitre}>
            Solimouv<span className={styles.heroAccent}>'</span>
          </h1>
          <p className={styles.heroSoustitre}>
            Le festival du sport inclusif et solidaire
          </p>
          <p className={styles.heroDescription}>
            Une journée festive organisée par <strong>Up Sport!</strong> pour célébrer
            le sport accessible à tous — familles, seniors, réfugiés, personnes en
            situation de handicap, communauté LGBTQIA+.
          </p>
          <div className={styles.heroBoutons}>
            <Button as="link" to="/programme" variante="secondaire" taille="lg">
              Voir le programme
            </Button>
            <Button as="link" to="/infos" variante="contour" taille="lg">
              Infos pratiques
            </Button>
          </div>
        </div>
      </section>

      {/* === CHIFFRES CLÉS === */}
      <section className={styles.section} aria-labelledby="titre-chiffres">
        <div className={styles.conteneur}>
          <h2 id="titre-chiffres" className={styles.titreSectionCentre}>
            Le festival en chiffres
          </h2>
          <div className={styles.grilleChiffres}>
            {CHIFFRES_CLES.map((item) => (
              <div key={item.label} className={styles.carteChiffre}>
                <span className={styles.chiffreEmoji}>{item.emoji}</span>
                <span className={styles.chiffreValeur}>{item.valeur}</span>
                <span className={styles.chiffreLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === NOS VALEURS === */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="titre-valeurs">
        <div className={styles.conteneur}>
          <h2 id="titre-valeurs" className={styles.titreSectionCentre}>
            Nos valeurs
          </h2>
          <div className={styles.grilleValeurs}>
            {VALEURS.map((valeur) => (
              <div key={valeur.titre} className={styles.carteValeur}>
                <span className={styles.valeurEmoji}>{valeur.emoji}</span>
                <h3 className={styles.valeurTitre}>{valeur.titre}</h3>
                <p className={styles.valeurDescription}>{valeur.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === À PROPOS UP SPORT! === */}
      <section className={styles.section} aria-labelledby="titre-asso">
        <div className={styles.conteneur}>
          <div className={styles.apropos}>
            <div className={styles.aproposTexte}>
              <span className={styles.aproposTag}>À propos</span>
              <h2 id="titre-asso" className={styles.titreSection}>
                Up Sport! — Sport inclusif depuis 2015
              </h2>
              <p>
                Up Sport! est une association parisienne qui œuvre depuis 2015 pour rendre
                le sport accessible à tous. Nous fédérons des associations partenaires autour
                d'un objectif commun : briser les barrières — sociales, physiques, culturelles —
                qui empêchent certains publics d'accéder à la pratique sportive.
              </p>
              <p>
                Solimouv' est notre 1ère édition d'un festival annuel du sport solidaire,
                inclusif et festif. 13 associations partenaires, 500 participants attendus,
                une journée entière d'activités gratuites et ouvertes à tous.
              </p>
              <Button as="link" to="/associations" variante="primaire">
                Découvrir les associations →
              </Button>
            </div>
            <div className={styles.aproposVisuel} aria-hidden="true">
              <div className={styles.emojiGrille}>
                <span>🏀</span><span>⚽</span><span>🧘</span>
                <span>🥊</span><span>🏐</span><span>🏃</span>
                <span>♿</span><span>🌈</span><span>🤝</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA PROGRAMME === */}
      <section className={`${styles.section} ${styles.sectionCta}`} aria-labelledby="titre-cta">
        <div className={styles.conteneur}>
          <div className={styles.cta}>
            <h2 id="titre-cta">Prêt à participer ?</h2>
            <p>Retrouvez toutes les activités du jour et venez comme vous êtes !</p>
            <div className={styles.ctaBoutons}>
              <Button as="link" to="/programme" variante="secondaire" taille="lg">
                📅 Voir le programme
              </Button>
              <Button as="link" to="/infos" variante="contour" taille="lg">
                📍 Comment venir
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
