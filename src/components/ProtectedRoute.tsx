/**
 * Composant de protection de route.
 * Redirige vers /login si l'utilisateur n'est pas connecté.
 * Affiche un spinner pendant la vérification de session.
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from './LoadingSpinner'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  // Session en cours de vérification
  if (loading) {
    return <LoadingSpinner message="Verification de la session..." />
  }

  // Non connecté → redirection vers /login
  // On conserve l'URL demandée dans le state pour rediriger après connexion
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
