/**
 * Donnees mock alignees sur la structure Firestore reelle.
 * Utilisees en mode VITE_APP_ENV=development.
 * Les IDs correspondent aux document IDs du script seed.
 */

import type { Association, Activite, InfosFestival, QuizQuestion } from '../types'

// -------------------------------------------------------
// ASSOCIATIONS
// -------------------------------------------------------

export const mockAssociations: Association[] = [
  {
    id: 'handisport-paris',
    nom: 'HandiSport Paris',
    description:
      "Developpement des activites sportives pour les personnes en situation de handicap. Basket fauteuil, tennis de table adapte, para-athletisme. Nous prouvons que le sport ne connait pas de limite.",
    disciplines: ['Basket fauteuil', 'Tennis de table adapte', 'Para-athletisme'],
    publics: ['Personnes en situation de handicap', 'Tous publics'],
    logo: '/logos/handisport-paris.png',
    email: 'contact@handisportparis.fr',
    siteWeb: 'https://handisportparis.fr',
    ordre: 1,
  },
  {
    id: 'sport-refugies',
    nom: 'Sport & Refugies',
    description:
      "Utilisation du sport comme vecteur d'integration pour les personnes refugiees et primo-arrivantes. Football, boxe et plein air pour tisser des liens et briser les barrieres culturelles.",
    disciplines: ['Football', 'Boxe', 'Plein air'],
    publics: ['Refugies', 'Primo-arrivants', 'Tous publics'],
    logo: '/logos/sport-refugies.png',
    email: 'contact@sport-refugies.fr',
    ordre: 2,
  },
  {
    id: 'femmes-en-mouvement',
    nom: 'Femmes en Mouvement',
    description:
      "Association dediee a la pratique sportive feminine dans toute sa diversite. Self-defense, running et sports collectifs dans des espaces bienveillants et securises, ouverts a toutes.",
    disciplines: ['Self-defense', 'Running', 'Sports collectifs'],
    publics: ['Femmes', 'Tous publics'],
    logo: '/logos/femmes-en-mouvement.png',
    email: 'contact@femmes-en-mouvement.fr',
    ordre: 3,
  },
  {
    id: 'cap-seniors',
    nom: "Cap'Seniors",
    description:
      "Activites physiques adaptees pour les 60 ans et plus. Maintien de la mobilite, prevention des chutes et lien social. L'activite physique comme cle d'un vieillissement actif et epanoui.",
    disciplines: ['Gym douce', 'Marche nordique', 'Yoga senior', 'Aquagym'],
    publics: ['Seniors 60+'],
    logo: '/logos/cap-seniors.png',
    email: 'contact@cap-seniors.fr',
    ordre: 4,
  },
  {
    id: 'arc-en-ciel-sport',
    nom: 'Arc-en-Ciel Sport',
    description:
      "Association LGBTQIA+-friendly qui cree des espaces sportifs securises et bienveillants. Toutes les disciplines, pour toutes les identites. Le sport comme espace de liberte pour tou·te·s.",
    disciplines: ['Volley-ball', 'Course a pied', 'Arts martiaux'],
    publics: ['LGBTQIA+', 'Tous publics'],
    logo: '/logos/arc-en-ciel-sport.png',
    email: 'contact@arc-en-ciel-sport.fr',
    siteWeb: 'https://arc-en-ciel-sport.fr',
    ordre: 5,
  },
  {
    id: 'familles-actives',
    nom: 'Familles Actives',
    description:
      "Sports et jeux collectifs pour les familles avec enfants de 3 a 14 ans. Parcours motricite, jeux d'adresse et defis intergenerationnels pour partager le plaisir du mouvement.",
    disciplines: ['Jeux collectifs', 'Parcours motricite', 'Sports de raquette'],
    publics: ['Familles', 'Enfants 3-14 ans', 'Tous publics'],
    logo: '/logos/familles-actives.png',
    email: 'contact@familles-actives.fr',
    ordre: 6,
  },
  {
    id: 'yoga-pour-tous',
    nom: 'Yoga Pour Tous',
    description:
      "Yoga accessible a tous les niveaux et toutes les morphologies. Cours adaptes aux seniors, aux personnes en situation de handicap et aux debutants complets. Venez comme vous etes.",
    disciplines: ['Yoga', 'Meditation', 'Respiration'],
    publics: ['Tous publics', 'Seniors', 'Personnes en situation de handicap'],
    logo: '/logos/yoga-pour-tous.png',
    email: 'contact@yogapourtous.fr',
    ordre: 7,
  },
]

// -------------------------------------------------------
// ACTIVITES
// -------------------------------------------------------

export const mockActivites: Activite[] = [
  {
    id: 'act-01',
    titre: 'Yoga matinal inclusif',
    description:
      "Commencez la journee en douceur avec une seance de yoga adaptee a tous les corps et capacites. Tapis fournis. Venez comme vous etes.",
    association_id: 'yoga-pour-tous',
    association_nom: 'Yoga Pour Tous',
    heure_debut: '09:00',
    heure_fin: '10:00',
    lieu: 'Espace zen - Pelouse nord',
    type: 'initiation',
    publics: ['Tous publics', 'Seniors'],
    emoji: '🧘',
  },
  {
    id: 'act-02',
    titre: 'Initiation basket fauteuil',
    description:
      "Decouvrez le basket en fauteuil roulant ! Fauteuils fournis sur place. Une experience unique pour comprendre le sport adapte de l'interieur.",
    association_id: 'handisport-paris',
    association_nom: 'HandiSport Paris',
    heure_debut: '09:30',
    heure_fin: '11:00',
    lieu: 'Gymnase principal',
    places_max: 20,
    type: 'initiation',
    publics: ['Tous publics'],
    emoji: '🏀',
  },
  {
    id: 'act-03',
    titre: 'Atelier self-defense femmes',
    description:
      "Atelier pratique de self-defense dans un espace non-mixte bienveillant. Techniques de base, confiance en soi, gestion du stress. Aucune experience requise.",
    association_id: 'femmes-en-mouvement',
    association_nom: 'Femmes en Mouvement',
    heure_debut: '10:00',
    heure_fin: '11:30',
    lieu: 'Salle polyvalente A',
    places_max: 16,
    type: 'atelier',
    publics: ['Femmes'],
    emoji: '🥋',
  },
  {
    id: 'act-04',
    titre: 'Parcours famille',
    description:
      "Parcours ludique a realiser en famille : jeux d'adresse, course d'obstacles adaptee. Pour les enfants de 3 a 14 ans accompagnes d'un adulte.",
    association_id: 'familles-actives',
    association_nom: 'Familles Actives',
    heure_debut: '10:00',
    heure_fin: '12:00',
    lieu: 'Esplanade centrale',
    type: 'initiation',
    publics: ['Familles', 'Enfants 3-14 ans'],
    emoji: '🎯',
  },
  {
    id: 'act-05',
    titre: 'Gym douce seniors',
    description:
      "Seance de gym douce adaptee aux 60 ans et plus : equilibre, souplesse, renforcement musculaire leger. Chaises disponibles pour les exercices assis.",
    association_id: 'cap-seniors',
    association_nom: "Cap'Seniors",
    heure_debut: '10:30',
    heure_fin: '11:30',
    lieu: 'Salle polyvalente B',
    places_max: 15,
    type: 'atelier',
    publics: ['Seniors 60+'],
    emoji: '🌸',
  },
  {
    id: 'act-06',
    titre: 'Tournoi football multiculturel',
    description:
      "Tournoi de football 5v5 mixte. Equipes constituees sur place. Trophee de la diversite remis a l'equipe la plus fair-play.",
    association_id: 'sport-refugies',
    association_nom: 'Sport & Refugies',
    heure_debut: '11:00',
    heure_fin: '13:00',
    lieu: 'Terrain synthetique',
    places_max: 40,
    type: 'initiation',
    publics: ['Tous publics'],
    emoji: '⚽',
  },
  {
    id: 'act-07',
    titre: 'Sensibilisation au handisport',
    description:
      "Conference-debat sur l'accessibilite dans le sport. Representation des personnes handicapees dans les medias sportifs. Animee par des athletes handisport.",
    association_id: 'handisport-paris',
    association_nom: 'HandiSport Paris',
    heure_debut: '14:00',
    heure_fin: '15:00',
    lieu: 'Scene principale',
    type: 'sensibilisation',
    publics: ['Tous publics'],
    emoji: '🎤',
  },
  {
    id: 'act-08',
    titre: 'Volley-ball arc-en-ciel',
    description:
      "Match de volley-ball festif et inclusif. Toutes les identites, tous les niveaux. Equipes mixtes constituees sur place.",
    association_id: 'arc-en-ciel-sport',
    association_nom: 'Arc-en-Ciel Sport',
    heure_debut: '14:30',
    heure_fin: '16:30',
    lieu: 'Terrain exterieur',
    places_max: 24,
    type: 'initiation',
    publics: ['LGBTQIA+', 'Tous publics'],
    emoji: '🏐',
  },
  {
    id: 'act-09',
    titre: 'Marche nordique en groupe',
    description:
      "Balade sportive autour du parc avec batons de marche nordique. Parcours plat, rythme adapte a tous. Batons fournis.",
    association_id: 'cap-seniors',
    association_nom: "Cap'Seniors",
    heure_debut: '15:00',
    heure_fin: '16:30',
    lieu: "Point de rendez-vous - entree principale",
    places_max: 20,
    type: 'initiation',
    publics: ['Seniors 60+', 'Tous publics'],
    emoji: '🚶',
  },
  {
    id: 'act-10',
    titre: "Ceremonie de cloture et remise des trophees",
    description:
      "Cloture du festival avec remise des trophees de la diversite, discours des associations. Gouter offert a tous les participants.",
    association_id: 'sport-refugies',
    association_nom: 'Up Sport!',
    heure_debut: '17:30',
    heure_fin: '19:00',
    lieu: 'Scene principale',
    type: 'sensibilisation',
    publics: ['Tous publics'],
    emoji: '🏆',
  },
]

// -------------------------------------------------------
// INFOS PRATIQUES
// -------------------------------------------------------

// -------------------------------------------------------
// QUIZ — Sport Matcher
// -------------------------------------------------------

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    ordre: 1,
    emoji: '🤝',
    question: 'Tu préfères pratiquer…',
    options: [
      { label: 'Seul(e)', valeur: 'solo', sports_associes: ['Running', 'Yoga', 'Gym douce', 'Marche nordique', 'Meditation'] },
      { label: 'En équipe', valeur: 'equipe', sports_associes: ['Football', 'Volley-ball', 'Basket fauteuil', 'Sports collectifs'] },
      { label: 'En petit groupe', valeur: 'groupe', sports_associes: ['Self-defense', 'Arts martiaux', 'Jeux collectifs', 'Aquagym'] },
      { label: 'Peu importe !', valeur: 'indifferent', sports_associes: ['Course a pied', 'Plein air', 'Sports de raquette', 'Yoga senior'] },
    ],
  },
  {
    id: 'q2',
    ordre: 2,
    emoji: '💪',
    question: "Ton niveau d'intensité préféré ?",
    options: [
      { label: 'Tout doux', valeur: 'doux', sports_associes: ['Yoga', 'Gym douce', 'Meditation', 'Respiration', 'Yoga senior'] },
      { label: 'Modéré', valeur: 'modere', sports_associes: ['Marche nordique', 'Running', 'Aquagym', 'Sports de raquette'] },
      { label: 'Intense', valeur: 'intense', sports_associes: ['Football', 'Boxe', 'Self-defense', 'Para-athletisme', 'Course a pied'] },
      { label: 'Je veux tout essayer', valeur: 'varie', sports_associes: ['Volley-ball', 'Arts martiaux', 'Jeux collectifs', 'Parcours motricite'] },
    ],
  },
  {
    id: 'q3',
    ordre: 3,
    emoji: '🎯',
    question: 'Ton principal objectif ?',
    options: [
      { label: 'Garder la forme', valeur: 'forme', sports_associes: ['Gym douce', 'Yoga', 'Aquagym', 'Running', 'Marche nordique'] },
      { label: 'Rencontrer des gens', valeur: 'social', sports_associes: ['Football', 'Volley-ball', 'Sports collectifs', 'Jeux collectifs'] },
      { label: 'Me défouler', valeur: 'defouler', sports_associes: ['Boxe', 'Self-defense', 'Arts martiaux', 'Para-athletisme'] },
      { label: 'Découvrir un sport', valeur: 'decouvrir', sports_associes: ['Basket fauteuil', 'Tennis de table adapte', 'Parcours motricite', 'Plein air'] },
    ],
  },
  {
    id: 'q4',
    ordre: 4,
    emoji: '🌿',
    question: 'Tu préfères quel environnement ?',
    options: [
      { label: 'En plein air', valeur: 'exterieur', sports_associes: ['Football', 'Plein air', 'Running', 'Marche nordique', 'Course a pied'] },
      { label: 'En salle / intérieur', valeur: 'interieur', sports_associes: ['Yoga', 'Gym douce', 'Basket fauteuil', 'Boxe', 'Self-defense'] },
      { label: 'Les deux, ça me va', valeur: 'les_deux', sports_associes: ['Arts martiaux', 'Volley-ball', 'Sports collectifs', 'Aquagym'] },
    ],
  },
  {
    id: 'q5',
    ordre: 5,
    emoji: '📅',
    question: 'À quelle fréquence veux-tu pratiquer ?',
    options: [
      { label: 'Une fois par semaine', valeur: 'une_fois', sports_associes: ['Yoga', 'Gym douce', 'Arts martiaux', 'Volley-ball'] },
      { label: '2 à 3 fois par semaine', valeur: 'deux_trois', sports_associes: ['Running', 'Football', 'Self-defense', 'Course a pied'] },
      { label: 'De temps en temps', valeur: 'ponctuel', sports_associes: ['Jeux collectifs', 'Parcours motricite', 'Plein air', 'Sports de raquette'] },
      { label: 'Tous les jours si possible !', valeur: 'quotidien', sports_associes: ['Yoga', 'Meditation', 'Marche nordique', 'Respiration'] },
    ],
  },
  {
    id: 'q6',
    ordre: 6,
    emoji: '😊',
    question: 'Tu te décris plutôt comme…',
    options: [
      { label: 'Un(e) compétiteur/trice', valeur: 'competiteur', sports_associes: ['Football', 'Boxe', 'Para-athletisme', 'Volley-ball', 'Tennis de table adapte'] },
      { label: 'Quelqu\'un qui cherche le bien-être', valeur: 'bienetre', sports_associes: ['Yoga', 'Meditation', 'Gym douce', 'Aquagym', 'Respiration'] },
      { label: 'Un(e) aventurier/ère', valeur: 'aventurier', sports_associes: ['Plein air', 'Course a pied', 'Marche nordique', 'Arts martiaux'] },
      { label: 'Un(e) joueur/joueuse', valeur: 'joueur', sports_associes: ['Jeux collectifs', 'Sports de raquette', 'Basket fauteuil', 'Parcours motricite'] },
    ],
  },
]

export const mockInfosFestival: InfosFestival = {
  id: 'infos',
  nom_lieu: 'Parc de la Villette',
  adresse: '211 Avenue Jean Jaures',
  ville: 'Paris',
  code_postal: '75019',
  latitude: 48.8938,
  longitude: 2.3907,
  acces_transports: [
    "Metro ligne 5 - Station Porte de Pantin (5 min a pied)",
    "Metro ligne 7 - Station Porte de la Villette (8 min a pied)",
    "Bus 75, 151, 152 - Arret Porte de Pantin",
    "Velib' - Stations a proximite de l'entree principale",
    "RER B - Gare du Nord puis metro ligne 5",
  ],
  lien_carte: 'https://maps.google.com/?q=Parc+de+la+Villette+Paris',
  date_festival: '2024-06-15',
  horaires: "Samedi 15 juin 2024 - 9h00 a 19h00 - Entree libre et gratuite",
  email_contact: 'contact@upsport.fr',
  tel_contact: '01 40 03 75 75',
  siteWeb: 'https://upsport.fr',
  accessibilite: [
    "Site entierement accessible aux personnes en fauteuil roulant",
    "Interpretes en langue des signes francaise (LSF) disponibles",
    "Boucles magnetiques dans les espaces couverts",
    "Parcours tactile pour les personnes malvoyantes",
    "Toilettes PMR sur site (signalees sur le plan)",
    "Stationnement adapte a l'entree principale",
  ],
}
