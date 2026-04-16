/**
 * Barre de navigation principale de l'application.
 * Responsive : menu hamburger sur mobile, liens horizontaux sur desktop.
 */

import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
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
  const [menuOuvert, setMenuOuvert] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const fermerMenu = () => setMenuOuvert(false)

  const prenomAffiche = currentUser?.displayName?.split(' ')[0] ?? 'Mon profil'

  async function handleLogout() {
    await logout()
    navigate('/')
  }

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

        {/* Zone auth - desktop */}
        <div className={styles.authZone}>
          {currentUser ? (
            <>
              <NavLink to="/profil" className={styles.lienProfil} onClick={fermerMenu}>
                {prenomAffiche}
              </NavLink>
              <button
                className={styles.btnDeconnexion}
                onClick={handleLogout}
                type="button"
              >
                Deconnexion
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={styles.btnConnexion}
              onClick={fermerMenu}
            >
              Connexion
            </NavLink>
          )}
        </div>

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

            {/* Auth mobile */}
            {currentUser ? (
              <>
                <li>
                  <NavLink
                    to="/profil"
                    className={({ isActive }) =>
                      `${styles.lienMobile} ${isActive ? styles.lienMobileActif : ''}`
                    }
                    onClick={fermerMenu}
                  >
                    {prenomAffiche} — Mon profil
                  </NavLink>
                </li>
                <li>
                  <button
                    className={styles.lienMobileBtnDeconnexion}
                    onClick={() => { handleLogout(); fermerMenu() }}
                    type="button"
                  >
                    Deconnexion
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${styles.lienMobile} ${isActive ? styles.lienMobileActif : ''}`
                  }
                  onClick={fermerMenu}
                >
                  Connexion
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}
