/**
 * Types TypeScript centralisés pour l'application Solimouv'
 * Les noms de champs correspondent exactement aux champs Firestore (snake_case).
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
