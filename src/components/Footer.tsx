/**
 * Pied de page — desktop uniquement.
 * Logo Caveat orange · navigation centre · contact droite.
 */

import { NavLink } from 'react-router-dom'
import styles from './Footer.module.css'

const NAV_LINKS = [
  { path: '/',        label: 'Accueil',  exact: true },
  { path: '/carte',   label: 'Carte' },
  { path: '/planning',label: 'Planning' },
  { path: '/sport',   label: 'Sport' },
  { path: '/infos',   label: 'Info' },
]

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

        {/* Navigation */}
        <nav className={styles.colonne} aria-label="Navigation footer">
          <ul className={styles.liste} role="list">
            {NAV_LINKS.map((lien) => (
              <li key={lien.path}>
                <NavLink
                  to={lien.path}
                  end={lien.exact}
                  className={({ isActive }) =>
                    `${styles.lien} ${isActive ? styles.lienActif : ''}`
                  }
                >
                  {lien.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

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
