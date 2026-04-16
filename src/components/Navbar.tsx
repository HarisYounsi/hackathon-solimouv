/**
 * Barre de navigation principale de l'application.
 * Responsive : menu hamburger sur mobile, liens horizontaux sur desktop.
 */

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

// Définition des liens de navigation
interface NavLink {
  path: string
  label: string
  exact?: boolean
}

const NAV_LINKS: NavLink[] = [
  { path: '/', label: 'Accueil', exact: true },
  { path: '/associations', label: 'Associations' },
  { path: '/programme', label: 'Programme' },
  { path: '/infos', label: 'Infos pratiques' },
]

export default function Navbar() {
  // État pour contrôler l'ouverture/fermeture du menu mobile
  const [menuOuvert, setMenuOuvert] = useState(false)

  const fermerMenu = () => setMenuOuvert(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navigation principale">
        {/* Logo / Nom de l'app */}
        <NavLink to="/" className={styles.logo} onClick={fermerMenu}>
          <span className={styles.logoEmoji}>🏃</span>
          <span className={styles.logoTexte}>
            Solimouv<span className={styles.logoAccent}>'</span>
          </span>
        </NavLink>

        {/* Liens de navigation - desktop */}
        <ul className={styles.liens} role="list">
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

        {/* Bouton hamburger - mobile uniquement */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-expanded={menuOuvert}
          aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span className={styles.hamburgerBarre} />
          <span className={styles.hamburgerBarre} />
          <span className={styles.hamburgerBarre} />
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      {menuOuvert && (
        <div className={styles.menuMobile} role="dialog" aria-label="Menu de navigation">
          <ul role="list">
            {NAV_LINKS.map((lien) => (
              <li key={lien.path}>
                <NavLink
                  to={lien.path}
                  end={lien.exact}
                  className={({ isActive }) =>
                    `${styles.lienMobile} ${isActive ? styles.lienMobileActif : ''}`
                  }
                  onClick={fermerMenu}
                >
                  {lien.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
