/**
 * Barre de navigation fixe en bas — mobile uniquement (cachée sur desktop).
 * 5 onglets fixes : Accueil, Carte, Planning, Sport, Info
 */

import { NavLink } from 'react-router-dom'
import styles from './NavbarBottom.module.css'

const TABS = [
  {
    path: '/',
    label: 'Accueil',
    exact: true,
    icon: (
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
        <path d="M1 7L8 1L15 7V17H10.5V12H5.5V17H1V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    path: '/carte',
    label: 'Carte',
    exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M13 3.5L7 1.5L1 3.5V16.5L7 14.5L13 16.5L19 14.5V1.5L13 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <path d="M7 1.5V14.5M13 3.5V16.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    path: '/programme',
    label: 'Planning',
    exact: false,
    icon: (
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
        <rect x="1" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M5 1V5M13 1V5M1 9H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    path: '/associations',
    label: 'Sport',
    exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M3 7Q10 11 17 7M3 13Q10 9 17 13" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    path: '/infos',
    label: 'Info',
    exact: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function NavbarBottom() {
  return (
    <nav className={styles.navbar} aria-label="Navigation principale">
      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.exact}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActif : ''}`
          }
        >
          <span className={styles.tabIcon}>{tab.icon}</span>
          <span className={styles.tabLabel}>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
