/**
 * Barre de navigation desktop — cachée sur mobile (NavbarBottom prend le relai).
 * Structure : logo gauche · liens centre · prénom utilisateur droite (si connecté).
 */

import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { path: '/',             label: 'Accueil',        exact: true },
  { path: '/carte',        label: 'Carte' },
  { path: '/programme',    label: 'Planning' },
  { path: '/sport',        label: 'Sport' },
  { path: '/infos',        label: 'Info' },
]

export default function Navbar() {
  const { currentUser } = useAuth()
  const prenom = currentUser?.displayName?.split(' ')[0] ?? null

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

        {/* Prénom — droite (si connecté) */}
        {prenom && (
          <NavLink
            to="/profil"
            className={({ isActive }) =>
              `${styles.lienProfil} ${isActive ? styles.lienProfilActif : ''}`
            }
          >
            {prenom}
          </NavLink>
        )}

      </nav>
    </header>
  )
}
