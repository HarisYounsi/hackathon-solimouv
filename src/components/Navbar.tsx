/**
 * Barre de navigation desktop — cachée sur mobile (NavbarBottom prend le relai).
 * Structure : logo gauche · liens centre · bouton connexion droite.
 */

import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { path: '/',             label: 'Accueil',        exact: true },
  { path: '/associations', label: 'Associations' },
  { path: '/programme',    label: 'Programme' },
  { path: '/infos',        label: 'Infos pratiques' },
]

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const prenomAffiche = currentUser?.displayName?.split(' ')[0] ?? 'Mon profil'

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navigation principale">

        {/* Logo — gauche */}
        <NavLink to="/" className={styles.logo} aria-label="Solimouv' - Accueil">
          <span className={styles.logoTexte}>
            Solimouv<span className={styles.logoAccent}>'</span>
          </span>
        </NavLink>

        {/* Liens — centre */}
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

        {/* Auth — droite */}
        <div className={styles.authZone}>
          {currentUser ? (
            <>
              <NavLink to="/profil" className={styles.lienProfil}>
                {prenomAffiche}
              </NavLink>
              <button
                className={styles.btnDeconnexion}
                onClick={handleLogout}
                type="button"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <NavLink to="/login" className={styles.btnConnexion}>
              Connexion
            </NavLink>
          )}
        </div>

      </nav>
    </header>
  )
}
