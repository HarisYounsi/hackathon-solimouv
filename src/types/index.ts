/**
 * Types TypeScript centralisés pour l'application Solimouv'
 * Tous les types qui reflètent la structure Firestore sont définis ici.
 */

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
  siteWeb?: string
  logoUrl?: string
  email?: string
  telephone?: string
}

// -------------------------------------------------------
// PROGRAMME / ACTIVITÉS
// -------------------------------------------------------

/**
 * Une activité ou un créneau du programme du festival
 * Collection Firestore : /activites
 */
export interface Activite {
  id: string
  titre: string
  description: string
  /** Nom de l'association qui anime l'activité */
  association: string
  /** Date et heure de début (timestamp ISO string) */
  debut: string
  /** Date et heure de fin (timestamp ISO string) */
  fin: string
  /** Lieu précis dans le festival (ex: "Terrain A", "Gymnase") */
  lieu: string
  /** Nombre de places disponibles (undefined = illimité) */
  placesMax?: number
  /** Niveau requis */
  niveau: 'Tous niveaux' | 'Débutant' | 'Intermédiaire' | 'Avancé'
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
  nomLieu: string
  adresse: string
  ville: string
  codePostal: string
  /** Coordonnées GPS pour l'intégration carte */
  latitude?: number
  longitude?: number
  /** Lignes de métro/RER/bus à proximité */
  transportsCommun: string[]
  /** Lien Google Maps ou Apple Maps */
  lienCarte?: string
  /** Date de début du festival (ISO string) */
  dateDebut: string
  /** Date de fin du festival (ISO string) */
  dateFin: string
  /** Horaires d'ouverture */
  horaires: string
  /** Email de contact */
  emailContact: string
  /** Numéro de téléphone de contact */
  telephoneContact?: string
  /** URL du site web Up Sport! */
  siteWeb?: string
  /** Informations d'accessibilité */
  accessibilite: string[]
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
