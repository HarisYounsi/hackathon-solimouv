/**
 * Données mock pour le développement et les démonstrations.
 * Ces données seront remplacées par les appels Firestore en production.
 * Structure identique aux types Firestore pour faciliter la migration.
 */

import type { Association, Activite, InfosFestival } from '../types'

// -------------------------------------------------------
// ASSOCIATIONS PARTENAIRES (mock)
// -------------------------------------------------------

export const mockAssociations: Association[] = [
  {
    id: '1',
    nom: 'Up Sport!',
    description:
      "Association organisatrice du festival Solimouv'. Depuis 2015, Up Sport! promeut le sport inclusif à Paris en réunissant des publics divers autour de valeurs communes : partage, dépassement de soi et inclusion.",
    disciplines: ['Sport collectif', 'Bien-être', 'Coordination'],
    publics: ['Tous publics'],
    siteWeb: 'https://upsport.fr',
    email: 'contact@upsport.fr',
  },
  {
    id: '2',
    nom: 'HandiSport Paris',
    description:
      'Développement des activités sportives pour les personnes en situation de handicap moteur et visuel. Basket fauteuil, tennis de table adapté, athlétisme para.',
    disciplines: ['Basket fauteuil', 'Tennis de table adapté', 'Athlétisme para'],
    publics: ['Personnes en situation de handicap', 'Tous publics'],
    email: 'contact@handisportparis.fr',
  },
  {
    id: '3',
    nom: 'Sport & Réfugiés',
    description:
      "Utilisation du sport comme vecteur d'intégration pour les personnes réfugiées et primo-arrivantes. Football, boxe et activités de plein air pour briser les barrières culturelles.",
    disciplines: ['Football', 'Boxe', 'Plein air'],
    publics: ['Réfugiés', 'Primo-arrivants', 'Tous publics'],
    email: 'contact@sport-refugies.fr',
  },
  {
    id: '4',
    nom: 'Seniors en Mouvement',
    description:
      'Activités physiques adaptées pour les personnes de 60 ans et plus. Prévention des chutes, maintien de la mobilité et lien social au cœur de notre mission.',
    disciplines: ['Gym douce', 'Yoga', 'Marche nordique', 'Aquagym'],
    publics: ['Seniors 60+'],
    email: 'contact@seniorsenmouvements.fr',
  },
  {
    id: '5',
    nom: 'Arc-en-Ciel Sport',
    description:
      'Association LGBTQIA+-friendly qui crée des espaces sportifs sécurisés et bienveillants. Toutes les disciplines, pour toutes les identités.',
    disciplines: ['Volley-ball', 'Course à pied', 'Arts martiaux'],
    publics: ['LGBTQIA+', 'Tous publics'],
    email: 'contact@arc-en-ciel-sport.fr',
  },
  {
    id: '6',
    nom: 'Familles en Jeu',
    description:
      'Activités sportives et ludiques pour les familles avec enfants de 3 à 14 ans. Créer du lien intergénérationnel par le jeu et le mouvement.',
    disciplines: ['Jeux collectifs', 'Parcours motricité', 'Sports de raquette'],
    publics: ['Familles', 'Enfants 3-14 ans'],
    email: 'contact@famillesenjeu.fr',
  },
  {
    id: '7',
    nom: 'Yoga Pour Tous',
    description:
      "Yoga accessible à tous les niveaux et toutes les morphologies. Cours adaptés aux personnes en surpoids, aux femmes enceintes et aux personnes en situation de handicap.",
    disciplines: ['Yoga', 'Méditation', 'Respiration'],
    publics: ['Tous publics', 'Femmes enceintes', 'Personnes en surpoids'],
    email: 'contact@yogapourtous.fr',
  },
  {
    id: '8',
    nom: 'Boxe & Confiance',
    description:
      "La boxe comme outil de développement personnel et de confiance en soi. Programme spécial pour les jeunes des quartiers prioritaires et les femmes victimes de violences.",
    disciplines: ['Boxe française', 'Boxe anglaise', 'Self-défense'],
    publics: ['Jeunes', 'Femmes', 'Quartiers prioritaires'],
    email: 'contact@boxe-confiance.fr',
  },
]

// -------------------------------------------------------
// PROGRAMME DES ACTIVITÉS (mock)
// -------------------------------------------------------

export const mockActivites: Activite[] = [
  {
    id: '1',
    titre: 'Initiation Basket Fauteuil',
    description:
      'Venez découvrir le basket en fauteuil roulant ! Fauteuils fournis. Une expérience unique pour comprendre le sport adapté de l\'intérieur.',
    association: 'HandiSport Paris',
    debut: '2024-06-15T10:00:00',
    fin: '2024-06-15T11:30:00',
    lieu: 'Gymnase principal',
    placesMax: 20,
    niveau: 'Tous niveaux',
    publics: ['Tous publics'],
    emoji: '🏀',
  },
  {
    id: '2',
    titre: 'Yoga Inclusif',
    description:
      'Séance de yoga adaptée à tous les corps et toutes les capacités. Tapis fournis. Venez comme vous êtes.',
    association: 'Yoga Pour Tous',
    debut: '2024-06-15T09:00:00',
    fin: '2024-06-15T10:00:00',
    lieu: 'Espace zen - Jardin',
    niveau: 'Tous niveaux',
    publics: ['Tous publics', 'Seniors'],
    emoji: '🧘',
  },
  {
    id: '3',
    titre: 'Tournoi Football Multiculturel',
    description:
      'Tournoi de football 5v5 mixte. Équipes constituées sur place pour favoriser les rencontres. Trophée de la diversité à la clé !',
    association: 'Sport & Réfugiés',
    debut: '2024-06-15T11:00:00',
    fin: '2024-06-15T13:00:00',
    lieu: 'Terrain synthétique',
    placesMax: 40,
    niveau: 'Tous niveaux',
    publics: ['Tous publics'],
    emoji: '⚽',
  },
  {
    id: '4',
    titre: 'Gym Douce Seniors',
    description:
      'Activité physique adaptée pour les 60 ans et plus. Travail de l\'équilibre, de la souplesse et du renforcement musculaire en douceur.',
    association: 'Seniors en Mouvement',
    debut: '2024-06-15T10:30:00',
    fin: '2024-06-15T11:30:00',
    lieu: 'Salle polyvalente B',
    placesMax: 15,
    niveau: 'Tous niveaux',
    publics: ['Seniors 60+'],
    emoji: '🌸',
  },
  {
    id: '5',
    titre: 'Parcours Famille',
    description:
      'Parcours ludique et sportif à réaliser en famille. Jeux d\'adresse, course d\'obstacles adaptée, défis rigolos pour petits et grands !',
    association: 'Familles en Jeu',
    debut: '2024-06-15T10:00:00',
    fin: '2024-06-15T12:00:00',
    lieu: 'Esplanade centrale',
    niveau: 'Tous niveaux',
    publics: ['Familles', 'Enfants 3-14 ans'],
    emoji: '🎯',
  },
  {
    id: '6',
    titre: 'Initiation Boxe Française',
    description:
      'Découverte de la boxe savate en toute sécurité. Échauffement, techniques de base et sparring light. Gants fournis.',
    association: 'Boxe & Confiance',
    debut: '2024-06-15T14:00:00',
    fin: '2024-06-15T15:30:00',
    lieu: 'Ring extérieur',
    placesMax: 16,
    niveau: 'Débutant',
    publics: ['Jeunes', 'Adultes'],
    emoji: '🥊',
  },
  {
    id: '7',
    titre: 'Volley-Ball Arc-en-Ciel',
    description:
      'Match de volley-ball dans une ambiance festive et inclusive. Toutes les identités, tous les niveaux. Venez jouer et vous amuser !',
    association: 'Arc-en-Ciel Sport',
    debut: '2024-06-15T15:00:00',
    fin: '2024-06-15T17:00:00',
    lieu: 'Terrain extérieur',
    placesMax: 24,
    niveau: 'Tous niveaux',
    publics: ['LGBTQIA+', 'Tous publics'],
    emoji: '🏐',
  },
  {
    id: '8',
    titre: 'Cérémonie de clôture & Remise des prix',
    description:
      'Clôture du festival avec remise des trophées, discours des associations, moment de convivialité. Goûter offert à tous !',
    association: 'Up Sport!',
    debut: '2024-06-15T17:30:00',
    fin: '2024-06-15T19:00:00',
    lieu: 'Scène principale',
    niveau: 'Tous niveaux',
    publics: ['Tous publics'],
    emoji: '🏆',
  },
]

// -------------------------------------------------------
// INFOS PRATIQUES (mock)
// -------------------------------------------------------

export const mockInfosFestival: InfosFestival = {
  id: 'infos-2024',
  nomLieu: 'Parc de la Villette',
  adresse: '211 Avenue Jean Jaurès',
  ville: 'Paris',
  codePostal: '75019',
  latitude: 48.8938,
  longitude: 2.3907,
  transportsCommun: [
    'Métro ligne 5 - Station Porte de Pantin',
    'Métro ligne 7 - Station Porte de la Villette',
    'Bus 75, 151, 152',
    'Vélib\' : stations à proximité',
  ],
  lienCarte: 'https://goo.gl/maps/villette',
  dateDebut: '2024-06-15T09:00:00',
  dateFin: '2024-06-15T19:00:00',
  horaires: 'Samedi 15 juin 2024 - 9h à 19h (entrée libre et gratuite)',
  emailContact: 'contact@upsport.fr',
  telephoneContact: '01 XX XX XX XX',
  siteWeb: 'https://upsport.fr',
  accessibilite: [
    'Site entièrement accessible aux personnes en fauteuil roulant',
    'Interprètes en langue des signes française (LSF) disponibles',
    'Boucles magnétiques dans les espaces couverts',
    'Parcours tactile pour les personnes malvoyantes',
    'Toilettes adaptées PMR sur site',
  ],
}
