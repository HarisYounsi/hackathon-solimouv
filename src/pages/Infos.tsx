/**
 * Page Infos Pratiques du festival.
 * Affiche lieu, transports, accessibilité et contact.
 */

import LoadingSpinner from '../components/LoadingSpinner'
import Button from '../components/Button'
import { useInfosFestival } from '../hooks/useFirestore'
import styles from './Infos.module.css'

export default function Infos() {
  const { data: infos, loading, error } = useInfosFestival()

  if (loading) return <LoadingSpinner message="Chargement des informations..." />

  if (error || !infos) {
    return (
      <div className={styles.erreur} role="alert">
        <p>⚠️ Impossible de charger les informations pratiques : {error}</p>
      </div>
    )
  }

  const dateFestival = new Date(infos.date_festival + 'T12:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className={styles.main}>
      {/* En-tête */}
      <div className={styles.entete}>
        <div className={styles.conteneur}>
          <span className={styles.tag}>Infos pratiques</span>
          <h1 className={styles.titre}>Tout savoir pour venir</h1>
          <p className={styles.soustitre} style={{ textTransform: 'capitalize' }}>{dateFestival}</p>
        </div>
      </div>

      <div className={`${styles.conteneur} ${styles.corps}`}>
        <div className={styles.grille}>

          {/* ---- Lieu ---- */}
          <section className={styles.carte} aria-labelledby="titre-lieu">
            <div className={styles.carteEntete}>
              <span className={styles.carteEmoji}>📍</span>
              <h2 id="titre-lieu" className={styles.carteTitre}>Lieu</h2>
            </div>
            <div className={styles.carteCorps}>
              <p className={styles.lieuNom}>{infos.nom_lieu}</p>
              <p className={styles.lieuAdresse}>
                {infos.adresse}<br />
                {infos.code_postal} {infos.ville}
              </p>
              <p className={styles.lieuHoraires}>🕐 {infos.horaires}</p>
              {infos.lien_carte && (
                <Button as="externe" href={infos.lien_carte} variante="primaire">
                  📱 Ouvrir dans Google Maps
                </Button>
              )}
            </div>
          </section>

          {/* ---- Transports ---- */}
          <section className={styles.carte} aria-labelledby="titre-transports">
            <div className={styles.carteEntete}>
              <span className={styles.carteEmoji}>🚇</span>
              <h2 id="titre-transports" className={styles.carteTitre}>Comment venir</h2>
            </div>
            <div className={styles.carteCorps}>
              <ul className={styles.listeTransports} role="list">
                {infos.acces_transports.map((transport, i) => (
                  <li key={i} className={styles.transportItem}>
                    <span className={styles.transportPuce}>•</span>
                    {transport}
                  </li>
                ))}
              </ul>
              <p className={styles.transportNote}>
                🚲 Stationnement vélo sur site. Nous encourageons les transports en commun
                et les mobilités douces.
              </p>
            </div>
          </section>

          {/* ---- Accessibilité ---- */}
          <section className={styles.carte} aria-labelledby="titre-access">
            <div className={styles.carteEntete}>
              <span className={styles.carteEmoji}>♿</span>
              <h2 id="titre-access" className={styles.carteTitre}>Accessibilité</h2>
            </div>
            <div className={styles.carteCorps}>
              <ul className={styles.listeAccess} role="list">
                {infos.accessibilite.map((item, i) => (
                  <li key={i} className={styles.accessItem}>
                    <span className={styles.accessCheck}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ---- Contact ---- */}
          <section className={styles.carte} aria-labelledby="titre-contact">
            <div className={styles.carteEntete}>
              <span className={styles.carteEmoji}>📞</span>
              <h2 id="titre-contact" className={styles.carteTitre}>Contact</h2>
            </div>
            <div className={styles.carteCorps}>
              <div className={styles.contactListe}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email</span>
                  <a href={`mailto:${infos.email_contact}`} className={styles.contactValeur}>
                    {infos.email_contact}
                  </a>
                </div>
                {infos.tel_contact && (
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Téléphone</span>
                    <a href={`tel:${infos.tel_contact}`} className={styles.contactValeur}>
                      {infos.tel_contact}
                    </a>
                  </div>
                )}
                {infos.siteWeb && (
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Site web</span>
                    <a href={infos.siteWeb} target="_blank" rel="noopener noreferrer" className={styles.contactValeur}>
                      {infos.siteWeb.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>
              <p className={styles.contactNote}>
                Pour toute question sur le festival ou les activités, n'hésitez pas à nous contacter.
                Nous répondons sous 48h.
              </p>
            </div>
          </section>

        </div>

        {/* Section carte / plan */}
        <section className={styles.sectionCarte} aria-labelledby="titre-carte">
          <h2 id="titre-carte" className={styles.titreCarte}>Où nous trouver ?</h2>
          <div className={styles.carteIframe}>
            <div className={styles.carteIframeInfo}>
              <p>📍 <strong>{infos.nom_lieu}</strong></p>
              <p>{infos.adresse}, {infos.code_postal} {infos.ville}</p>
              {infos.lien_carte && (
                <Button as="externe" href={infos.lien_carte} variante="secondaire">
                  Ouvrir la carte
                </Button>
              )}
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
