/**
 * Types TypeScript centralisés pour l'application Solimouv'
 * Les noms de champs correspondent exactement aux champs Firestore (snake_case).
 */

import type { Timestamp } from 'firebase/firestore'

// -------------------------------------------------------
// ASSOCIATION
// -------------------------------------------------------

/**
 * Une association partenaire du festival Solimouv'
 * Collection Firestore : /associations
 */
export interface Association {
  id: string
  nom: string
  description: string
  /** Disciplines sportives pratiquées */
  disciplines: string[]
  /** Publics cibles (ex: "seniors", "réfugiés", "handicap") */
  publics: string[]
  /** URL du logo (placeholder ou Firestore Storage) */
  logo?: string
  siteWeb?: string
  email?: string
  /** Ordre d'affichage dans la liste */
  ordre: number
}

// -------------------------------------------------------
// ACTIVITÉS
// -------------------------------------------------------

/** Type d'activité proposée */
export type TypeActivite = 'initiation' | 'atelier' | 'sensibilisation'

/**
 * Une activité du programme du festival
 * Collection Firestore : /activites
 */
export interface Activite {
  id: string
  titre: string
  description: string
  /** ID du document de l'association dans /associations */
  association_id: string
  /** Nom de l'association (dénormalisé pour éviter des jointures) */
  association_nom: string
  /** Heure de début au format "HH:MM" */
  heure_debut: string
  /** Heure de fin au format "HH:MM" */
  heure_fin: string
  /** Lieu précis dans le festival (ex: "Terrain A", "Gymnase") */
  lieu: string
  /** Nombre de places max (undefined = illimité) */
  places_max?: number
  /** Type d'activité */
  type: TypeActivite
  /** Publics cibles */
  publics: string[]
  /** Icône emoji représentant l'activité */
  emoji?: string
}

// -------------------------------------------------------
// INFOS PRATIQUES
// -------------------------------------------------------

/**
 * Informations pratiques du festival
 * Document Firestore : /config/infos
 */
export interface InfosFestival {
  id: string
  nom_lieu: string
  adresse: string
  ville: string
  code_postal: string
  /** Coordonnées GPS */
  latitude?: number
  longitude?: number
  /** Lignes de transport en commun */
  acces_transports: string[]
  /** Lien vers Google Maps */
  lien_carte?: string
  /** Date du festival au format ISO "YYYY-MM-DD" */
  date_festival: string
  /** Horaires d'ouverture en texte libre */
  horaires: string
  email_contact: string
  tel_contact?: string
  siteWeb?: string
  /** Informations d'accessibilité */
  accessibilite: string[]
}

// -------------------------------------------------------
// RÉSERVATIONS
// -------------------------------------------------------

/** Statut possible d'une réservation */
export type StatutReservation = 'confirmee' | 'annulee'

/**
 * Réservation d'un participant à une activité
 * Collection Firestore : /reservations
 * L'ID du document est auto-généré par Firestore (addDoc).
 */
export interface Reservation {
  id: string
  /** Email du participant */
  user_email: string
  /** Nom complet du participant */
  user_nom: string
  /** ID de l'activité réservée (référence /activites/{id}) */
  activite_id: string
  /** Titre de l'activité (dénormalisé) */
  activite_titre: string
  /** Nom de l'association (dénormalisé) */
  association_nom: string
  /** Heure de début de l'activité (dénormalisé) */
  heure_debut: string
  /** Heure de fin de l'activité (dénormalisé) */
  heure_fin: string
  /** Statut de la réservation */
  statut: StatutReservation
  /** Horodatage de la réservation */
  date_reservation: Timestamp
  /** Indique si la notification de confirmation a été envoyée */
  notif_envoyee: boolean
  /** Rappel activé depuis le quiz / programme (optionnel) */
  rappel_accepte?: boolean
}

// -------------------------------------------------------
// QUIZ — SPORT MATCHER (Brique G)
// -------------------------------------------------------

/**
 * Une option de réponse à une question du quiz Sport Matcher.
 * Chaque option est associée à des sports pour le matching.
 */
export interface QuizOption {
  /** Texte affiché à l'utilisateur */
  label: string
  /** Identifiant court utilisé pour le scoring (ex: "eleve", "solo") */
  valeur: string
  /** Liste de disciplines sportives associées à ce choix */
  sports_associes: string[]
}

/**
 * Une question du quiz Sport Matcher
 * Collection Firestore : /quiz
 */
export interface QuizQuestion {
  id: string
  /** Texte de la question affichée */
  question: string
  /** Ordre d'affichage dans le quiz */
  ordre: number
  /** Icône emoji illustrant la question */
  emoji: string
  /** Liste des options de réponse */
  options: QuizOption[]
}

// -------------------------------------------------------
// PROFILS UTILISATEURS
// -------------------------------------------------------

/**
 * Badge de gamification obtenu par un utilisateur
 */
export interface Badge {
  /** Identifiant du badge (ex: "premier-pas", "sportif-du-dimanche") */
  id: string
  /** Nom affiché du badge */
  nom: string
  /** Description courte */
  description: string
  /** Icône emoji */
  emoji: string
  /** Date d'obtention */
  date_obtention: Timestamp
}

/**
 * Profil d'un utilisateur inscrit sur l'application
 * Collection Firestore : /profils
 * L'ID du document correspond à l'uid Firebase Auth.
 */
export interface Profil {
  /** uid Firebase Auth */
  id: string
  prenom: string
  nom: string
  email: string
  /** URL de l'avatar (Firebase Storage ou placeholder) */
  avatar_url?: string
  /** Disciplines sportives favorites (issues du quiz ou saisie manuelle) */
  sports_favoris: string[]
  /** IDs des associations que l'utilisateur suit */
  associations_suivies: string[]
  /** IDs des activités mises en favoris */
  activites_favorites?: string[]
  /** IDs des réservations de l'utilisateur */
  reservations_ids: string[]
  /** Score de gamification (incrémenté par réservation, participation, etc.) */
  points_gamification: number
  /** Badges obtenus */
  badges: Badge[]
  /** Date de création du compte */
  date_inscription: Timestamp
}

// -------------------------------------------------------
// CONTACTS — Sport Matcher (Brique G)
// -------------------------------------------------------

/**
 * Demande de contact générée depuis la page résultats du matcher.
 * Collection Firestore : /contacts
 */
export interface Contact {
  /** ID de l'association contactée */
  association_id: string
  /** Nom de l'association (dénormalisé) */
  association_nom: string
  /** Sports recommandés par le quiz à cette session */
  sports_recommandes: string[]
  /** Prénom du demandeur */
  prenom: string
  /** Email du demandeur */
  email: string
  /** Consentement RGPD explicite — toujours true si stocké */
  consentement_rgpd: true
  /** Horodatage de la demande */
  created_at: Timestamp
}

// -------------------------------------------------------
// UTILITAIRES
// -------------------------------------------------------

/**
 * État générique d'un chargement de données depuis Firestore
 */
export interface LoadingState<T> {
  data: T | null
  loading: boolean
  error: string | null
}
