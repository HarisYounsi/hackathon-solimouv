/**
 * Pied de page de l'application.
 * Affiche les informations de contact Up Sport! et les liens utiles.
 */

import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  const annee = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.contenu}>
        {/* Colonne 1 : À propos */}
        <div className={styles.colonne}>
          <h3 className={styles.titre}>
            🏃 Solimouv<span className={styles.accent}>'</span>
          </h3>
          <p className={styles.description}>
            Festival du sport inclusif organisé par l'association <strong>Up Sport!</strong>.
            Pour un sport accessible à toutes et à tous.
          </p>
        </div>

        {/* Colonne 2 : Navigation rapide */}
        <div className={styles.colonne}>
          <h3 className={styles.titre}>Navigation</h3>
          <ul className={styles.liste} role="list">
            <li><Link to="/" className={styles.lien}>Accueil</Link></li>
            <li><Link to="/associations" className={styles.lien}>Associations</Link></li>
            <li><Link to="/programme" className={styles.lien}>Programme</Link></li>
            <li><Link to="/infos" className={styles.lien}>Infos pratiques</Link></li>
          </ul>
        </div>

        {/* Colonne 3 : Contact */}
        <div className={styles.colonne}>
          <h3 className={styles.titre}>Contact</h3>
          <ul className={styles.liste} role="list">
            <li>
              <a href="mailto:contact@upsport.fr" className={styles.lien}>
                📧 contact@upsport.fr
              </a>
            </li>
            <li>
              <a href="https://upsport.fr" className={styles.lien} target="_blank" rel="noopener noreferrer">
                🌐 upsport.fr
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Ligne de bas de page */}
      <div className={styles.bas}>
        <p>
          © {annee} Up Sport! — Tous droits réservés.
          Fait avec ❤️ pour le sport pour tous.
        </p>
      </div>
    </footer>
  )
}
