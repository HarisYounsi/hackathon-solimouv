/**
 * Composant racine de l'application Solimouv'
 * Définit le routage entre les pages et la structure globale (Navbar + Footer).
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Accueil from './pages/Accueil'
import Associations from './pages/Associations'
import Programme from './pages/Programme'
import Infos from './pages/Infos'
import Login from './pages/Login'
import Register from './pages/Register'
import Profil from './pages/Profil'

export default function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <div className="app">
        {/* Barre de navigation - présente sur toutes les pages */}
        <Navbar />

        {/* Contenu principal - change selon la route */}
        <main className="contenu-principal">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<Accueil />} />

            {/* Liste des associations partenaires */}
            <Route path="/associations" element={<Associations />} />

            {/* Programme du festival */}
            <Route path="/programme" element={<Programme />} />

            {/* Informations pratiques */}
            <Route path="/infos" element={<Infos />} />

            {/* Authentification */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Profil (protege) */}
            <Route
              path="/profil"
              element={
                <ProtectedRoute>
                  <Profil />
                </ProtectedRoute>
              }
            />

            {/* Route 404 - page non trouvée */}
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
                      color: '#1a1a2e',
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

        {/* Pied de page - présent sur toutes les pages */}
        <Footer />
      </div>
    </AuthProvider>
    </BrowserRouter>
  )
}
