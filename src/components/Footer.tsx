/**
 * Pied de page — desktop uniquement.
 * Logo Caveat orange · navigation centre · contact droite.
 */

import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contenu}>

        {/* Logo */}
        <div className={styles.colonne}>
          <span className={styles.logo}>
            Solimouv<span className={styles.logoAccent}>'</span>
          </span>
        </div>

        {/* Contact */}
        <div className={styles.colonne}>
          <p className={styles.contactTitre}>Contact</p>
          <ul className={styles.liste} role="list">
            <li>
              <a href="mailto:contact@upsport.fr" className={styles.lien}>
                contact@upsport.fr
              </a>
            </li>
            <li>
              <a
                href="https://upsport.fr"
                className={styles.lien}
                target="_blank"
                rel="noopener noreferrer"
              >
                upsport.fr
              </a>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  )
}
