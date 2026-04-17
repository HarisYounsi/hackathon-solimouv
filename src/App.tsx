/**
 * Composant racine de l'application Solimouv'
 * Routage + structure globale (Navbar top desktop · NavbarBottom mobile · Footer desktop).
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import NavbarBottom from './components/NavbarBottom'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Accueil from './pages/Accueil'
import Associations from './pages/Associations'
import Programme from './pages/Programme'
import Infos from './pages/Infos'
import Carte from './pages/Carte'
import Login from './pages/Login'
import Register from './pages/Register'
import Profil from './pages/Profil'
import Matcher from './pages/Matcher'
import MatcherResultats from './pages/MatcherResultats'
import MesFavoris from './pages/MesFavoris'
import Sport from './pages/Sport'
import ActiviteDetail from './pages/ActiviteDetail'
import Planning from './pages/Planning'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          {/* Navbar top — visible sur desktop uniquement (cachée sur mobile via CSS) */}
          <Navbar />

          {/* Contenu principal */}
          <main id="contenu-principal" className="contenu-principal">
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/associations" element={<Associations />} />
              <Route path="/sport" element={<Sport />} />
              <Route path="/activite/:activiteId" element={<ActiviteDetail />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/programme" element={<Programme />} />
              <Route path="/infos" element={<Infos />} />
              <Route path="/carte" element={<Carte />} />

              {/* Sport Matcher */}
              <Route path="/matcher" element={<Matcher />} />
              <Route path="/matcher/resultats" element={<MatcherResultats />} />

              {/* Mes favoris (protégé) */}
              <Route
                path="/mes-favoris"
                element={
                  <ProtectedRoute>
                    <MesFavoris />
                  </ProtectedRoute>
                }
              />

              {/* Authentification */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Profil (protégé) */}
              <Route
                path="/profil"
                element={
                  <ProtectedRoute>
                    <Profil />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '80px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <span style={{ fontSize: '4rem' }}>🤔</span>
                    <h1 style={{ fontSize: '1.5rem' }}>Page introuvable</h1>
                    <p style={{ color: '#6b7280' }}>
                      Cette page n'existe pas. Retournez à l'accueil !
                    </p>
                    <a
                      href="/"
                      style={{
                        color: '#3952d0',
                        fontWeight: 600,
                        textDecoration: 'underline',
                      }}
                    >
                      ← Retour à l'accueil
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Footer — visible sur desktop uniquement */}
          <Footer />

          {/* Navbar bottom — visible sur mobile uniquement */}
          <NavbarBottom />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
