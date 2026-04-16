/**
 * Script d'initialisation de la base Firestore pour Solimouv'
 *
 * Injecte les collections :
 *   /associations, /activites, /config/infos
 *   /reservations, /quiz, /profils
 *
 * Usage :
 *   npm run seed
 *
 * Pre-requis :
 *   - Fichier .env a la racine avec les variables Firebase
 *   - Regles Firestore permettant les ecritures :
 *     allow write: if true;  (a securiser apres le seed !)
 */

import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  setDoc,
  writeBatch,
  collection,
  Timestamp,
} from 'firebase/firestore'

// -------------------------------------------------------
// Initialisation Firebase
// -------------------------------------------------------

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
})

const db = getFirestore(app)

// -------------------------------------------------------
// DONNEES — ASSOCIATIONS
// -------------------------------------------------------

const associations = [
  {
    id: 'handisport-paris',
    nom: 'HandiSport Paris',
    description:
      "Developpement des activites sportives pour les personnes en situation de handicap. Basket fauteuil, tennis de table adapte, para-athletisme. Nous prouvons que le sport ne connait pas de limite.",
    disciplines: ['Basket fauteuil', 'Tennis de table adapte', 'Para-athletisme'],
    publics: ['Personnes en situation de handicap', 'Tous publics'],
    logo: '',
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
    logo: '',
    email: 'contact@sport-refugies.fr',
    siteWeb: '',
    ordre: 2,
  },
  {
    id: 'femmes-en-mouvement',
    nom: 'Femmes en Mouvement',
    description:
      "Association dediee a la pratique sportive feminine dans toute sa diversite. Self-defense, running et sports collectifs dans des espaces bienveillants et securises, ouverts a toutes.",
    disciplines: ['Self-defense', 'Running', 'Sports collectifs'],
    publics: ['Femmes', 'Tous publics'],
    logo: '',
    email: 'contact@femmes-en-mouvement.fr',
    siteWeb: '',
    ordre: 3,
  },
  {
    id: 'cap-seniors',
    nom: "Cap'Seniors",
    description:
      "Activites physiques adaptees pour les 60 ans et plus. Maintien de la mobilite, prevention des chutes et lien social. L'activite physique comme cle d'un vieillissement actif et epanoui.",
    disciplines: ['Gym douce', 'Marche nordique', 'Yoga senior', 'Aquagym'],
    publics: ['Seniors 60+'],
    logo: '',
    email: 'contact@cap-seniors.fr',
    siteWeb: '',
    ordre: 4,
  },
  {
    id: 'arc-en-ciel-sport',
    nom: 'Arc-en-Ciel Sport',
    description:
      "Association LGBTQIA+-friendly qui cree des espaces sportifs securises et bienveillants. Toutes les disciplines, pour toutes les identites. Le sport comme espace de liberte pour tou·te·s.",
    disciplines: ['Volley-ball', 'Course a pied', 'Arts martiaux'],
    publics: ['LGBTQIA+', 'Tous publics'],
    logo: '',
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
    logo: '',
    email: 'contact@familles-actives.fr',
    siteWeb: '',
    ordre: 6,
  },
  {
    id: 'yoga-pour-tous',
    nom: 'Yoga Pour Tous',
    description:
      "Yoga accessible a tous les niveaux et toutes les morphologies. Cours adaptes aux seniors, aux personnes en situation de handicap et aux debutants complets. Venez comme vous etes.",
    disciplines: ['Yoga', 'Meditation', 'Respiration'],
    publics: ['Tous publics', 'Seniors', 'Personnes en situation de handicap'],
    logo: '',
    email: 'contact@yogapourtous.fr',
    siteWeb: '',
    ordre: 7,
  },
]

// -------------------------------------------------------
// DONNEES — ACTIVITES
// -------------------------------------------------------

const activites = [
  {
    id: 'act-01',
    titre: 'Yoga matinal inclusif',
    description:
      "Commencez la journee en douceur avec une seance de yoga adaptee a tous les corps et capacites. Tapis fournis.",
    association_id: 'yoga-pour-tous',
    association_nom: 'Yoga Pour Tous',
    heure_debut: '09:00',
    heure_fin: '10:00',
    lieu: 'Espace zen - Pelouse nord',
    places_max: null,
    type: 'initiation',
    publics: ['Tous publics', 'Seniors'],
    emoji: '🧘',
  },
  {
    id: 'act-02',
    titre: 'Initiation basket fauteuil',
    description:
      "Decouvrez le basket en fauteuil roulant ! Fauteuils fournis sur place. Experience unique pour comprendre le sport adapte de l'interieur.",
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
      "Atelier pratique de self-defense dans un espace non-mixte bienveillant. Techniques de base, confiance en soi. Aucune experience requise.",
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
      "Parcours ludique en famille : jeux d'adresse, course d'obstacles adaptee. Pour les 3-14 ans accompagnes d'un adulte.",
    association_id: 'familles-actives',
    association_nom: 'Familles Actives',
    heure_debut: '10:00',
    heure_fin: '12:00',
    lieu: 'Esplanade centrale',
    places_max: null,
    type: 'initiation',
    publics: ['Familles', 'Enfants 3-14 ans'],
    emoji: '🎯',
  },
  {
    id: 'act-05',
    titre: 'Gym douce seniors',
    description:
      "Seance de gym douce pour les 60 ans et plus : equilibre, souplesse, renforcement leger. Chaises disponibles.",
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
      "Tournoi 5v5 mixte. Equipes constituees sur place. Trophee de la diversite pour l'equipe la plus fair-play.",
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
      "Conference-debat sur l'accessibilite dans le sport et la representation des athletes handicapes dans les medias.",
    association_id: 'handisport-paris',
    association_nom: 'HandiSport Paris',
    heure_debut: '14:00',
    heure_fin: '15:00',
    lieu: 'Scene principale',
    places_max: null,
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
      "Balade sportive avec batons de marche nordique. Parcours plat, rythme adapte a tous. Batons fournis.",
    association_id: 'cap-seniors',
    association_nom: "Cap'Seniors",
    heure_debut: '15:00',
    heure_fin: '16:30',
    lieu: "Rendez-vous - entree principale",
    places_max: 20,
    type: 'initiation',
    publics: ['Seniors 60+', 'Tous publics'],
    emoji: '🚶',
  },
  {
    id: 'act-10',
    titre: "Ceremonie de cloture et remise des trophees",
    description:
      "Cloture du festival : trophees de la diversite, discours des associations, gouter offert a tous les participants.",
    association_id: 'sport-refugies',
    association_nom: 'Up Sport!',
    heure_debut: '17:30',
    heure_fin: '19:00',
    lieu: 'Scene principale',
    places_max: null,
    type: 'sensibilisation',
    publics: ['Tous publics'],
    emoji: '🏆',
  },
]

// -------------------------------------------------------
// DONNEES — INFOS PRATIQUES
// -------------------------------------------------------

const infosFestival = {
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

// -------------------------------------------------------
// DONNEES — RESERVATIONS
// -------------------------------------------------------

const reservations = [
  {
    id: 'res-01',
    user_email: 'sophie.martin@email.fr',
    user_nom: 'Sophie Martin',
    activite_id: 'act-02',
    activite_titre: 'Initiation basket fauteuil',
    association_nom: 'HandiSport Paris',
    heure_debut: '09:30',
    heure_fin: '11:00',
    statut: 'confirmee',
    date_reservation: Timestamp.fromDate(new Date('2024-06-10T14:23:00')),
    notif_envoyee: true,
  },
  {
    id: 'res-02',
    user_email: 'karim.diallo@email.fr',
    user_nom: 'Karim Diallo',
    activite_id: 'act-06',
    activite_titre: 'Tournoi football multiculturel',
    association_nom: 'Sport & Refugies',
    heure_debut: '11:00',
    heure_fin: '13:00',
    statut: 'confirmee',
    date_reservation: Timestamp.fromDate(new Date('2024-06-11T09:05:00')),
    notif_envoyee: true,
  },
  {
    id: 'res-03',
    user_email: 'amina.benali@email.fr',
    user_nom: 'Amina Benali',
    activite_id: 'act-03',
    activite_titre: 'Atelier self-defense femmes',
    association_nom: 'Femmes en Mouvement',
    heure_debut: '10:00',
    heure_fin: '11:30',
    statut: 'annulee',
    date_reservation: Timestamp.fromDate(new Date('2024-06-09T18:47:00')),
    notif_envoyee: false,
  },
]

// -------------------------------------------------------
// DONNEES — QUIZ SPORT MATCHER (Brique G)
// -------------------------------------------------------

const quizQuestions = [
  {
    id: 'quiz-01',
    question: "Quel est ton niveau d'energie habituel ?",
    ordre: 1,
    emoji: '⚡',
    options: [
      {
        label: 'Calme — je prefere les activites douces',
        valeur: 'faible',
        sports_associes: ['Yoga', 'Meditation', 'Gym douce', 'Marche nordique'],
      },
      {
        label: 'Modere — un bon equilibre effort/detente',
        valeur: 'modere',
        sports_associes: ['Volley-ball', 'Tennis de table adapte', 'Course a pied', 'Self-defense'],
      },
      {
        label: 'Eleve — je veux me depenser !',
        valeur: 'eleve',
        sports_associes: ['Football', 'Boxe', 'Basket fauteuil', 'Para-athletisme'],
      },
    ],
  },
  {
    id: 'quiz-02',
    question: 'Tu preferes pratiquer...',
    ordre: 2,
    emoji: '👥',
    options: [
      {
        label: 'Seul(e) — a mon rythme',
        valeur: 'solo',
        sports_associes: ['Yoga', 'Course a pied', 'Marche nordique', 'Meditation'],
      },
      {
        label: 'En duo ou petit groupe',
        valeur: 'duo',
        sports_associes: ['Tennis de table adapte', 'Self-defense', 'Gym douce'],
      },
      {
        label: 'En equipe — le collectif avant tout',
        valeur: 'collectif',
        sports_associes: ['Football', 'Volley-ball', 'Basket fauteuil', 'Jeux collectifs'],
      },
    ],
  },
  {
    id: 'quiz-03',
    question: 'Tu preferes les activites...',
    ordre: 3,
    emoji: '🌤️',
    options: [
      {
        label: 'En interieur — peu importe la meteo',
        valeur: 'interieur',
        sports_associes: ['Yoga', 'Gym douce', 'Basket fauteuil', 'Tennis de table adapte', 'Self-defense'],
      },
      {
        label: 'En exterieur — au grand air',
        valeur: 'exterieur',
        sports_associes: ['Football', 'Course a pied', 'Marche nordique', 'Para-athletisme'],
      },
      {
        label: 'Les deux, ca depend du jour',
        valeur: 'mixte',
        sports_associes: ['Volley-ball', 'Jeux collectifs', 'Boxe', 'Arts martiaux'],
      },
    ],
  },
  {
    id: 'quiz-04',
    question: 'Le contact physique avec les autres participants...',
    ordre: 4,
    emoji: '🤝',
    options: [
      {
        label: 'Non merci — je prefere sans contact',
        valeur: 'sans_contact',
        sports_associes: ['Yoga', 'Marche nordique', 'Course a pied', 'Tennis de table adapte'],
      },
      {
        label: 'Un peu — les contacts legers, ca va',
        valeur: 'contact_leger',
        sports_associes: ['Volley-ball', 'Football', 'Gym douce', 'Jeux collectifs'],
      },
      {
        label: 'Oui — pas de probleme avec le contact direct',
        valeur: 'contact_direct',
        sports_associes: ['Boxe', 'Self-defense', 'Arts martiaux', 'Basket fauteuil'],
      },
    ],
  },
  {
    id: 'quiz-05',
    question: 'Tu es disponible plutot...',
    ordre: 5,
    emoji: '🕐',
    options: [
      {
        label: 'Le matin (avant 12h)',
        valeur: 'matin',
        sports_associes: ['Yoga', 'Gym douce', 'Basket fauteuil', 'Marche nordique'],
      },
      {
        label: "L'apres-midi (apres 13h)",
        valeur: 'apres_midi',
        sports_associes: ['Volley-ball', 'Self-defense', 'Football', 'Boxe'],
      },
      {
        label: "Peu importe l'horaire",
        valeur: 'flexible',
        sports_associes: ['Course a pied', 'Jeux collectifs', 'Para-athletisme', 'Arts martiaux'],
      },
    ],
  },
  {
    id: 'quiz-06',
    question: 'Ton objectif principal en faisant du sport ?',
    ordre: 6,
    emoji: '🎯',
    options: [
      {
        label: 'Me detendre et prendre du plaisir',
        valeur: 'fun',
        sports_associes: ['Yoga', 'Jeux collectifs', 'Volley-ball', 'Marche nordique'],
      },
      {
        label: 'Prendre soin de ma sante',
        valeur: 'sante',
        sports_associes: ['Gym douce', 'Yoga', 'Course a pied', 'Marche nordique', 'Aquagym'],
      },
      {
        label: 'Me depasser et progresser',
        valeur: 'performance',
        sports_associes: ['Football', 'Boxe', 'Para-athletisme', 'Basket fauteuil', 'Arts martiaux'],
      },
    ],
  },
]

// -------------------------------------------------------
// DONNEES — PROFILS UTILISATEURS
// -------------------------------------------------------

const profils = [
  {
    id: 'uid-mock-sophie-001',
    prenom: 'Sophie',
    nom: 'Martin',
    email: 'sophie.martin@email.fr',
    avatar_url: '',
    sports_favoris: ['Yoga', 'Basket fauteuil', 'Marche nordique'],
    associations_suivies: ['handisport-paris', 'yoga-pour-tous'],
    reservations_ids: ['res-01'],
    points_gamification: 120,
    badges: [
      {
        id: 'premier-pas',
        nom: 'Premier pas',
        description: "A participe a sa premiere activite Solimouv'",
        emoji: '👟',
        date_obtention: Timestamp.fromDate(new Date('2024-06-15T11:00:00')),
      },
      {
        id: 'curieux',
        nom: 'Curieux·se',
        description: 'A decouvert le handisport',
        emoji: '🔍',
        date_obtention: Timestamp.fromDate(new Date('2024-06-15T11:00:00')),
      },
    ],
    date_inscription: Timestamp.fromDate(new Date('2024-06-08T10:00:00')),
  },
  {
    id: 'uid-mock-karim-002',
    prenom: 'Karim',
    nom: 'Diallo',
    email: 'karim.diallo@email.fr',
    avatar_url: '',
    sports_favoris: ['Football', 'Boxe'],
    associations_suivies: ['sport-refugies', 'arc-en-ciel-sport'],
    reservations_ids: ['res-02'],
    points_gamification: 85,
    badges: [
      {
        id: 'premier-pas',
        nom: 'Premier pas',
        description: "A participe a sa premiere activite Solimouv'",
        emoji: '👟',
        date_obtention: Timestamp.fromDate(new Date('2024-06-15T13:00:00')),
      },
    ],
    date_inscription: Timestamp.fromDate(new Date('2024-06-11T09:05:00')),
  },
]

// -------------------------------------------------------
// FONCTIONS D'INJECTION
// -------------------------------------------------------

async function seedAssociations() {
  console.log('\n Association injection...')
  const batch = writeBatch(db)
  for (const asso of associations) {
    const { id, ...data } = asso
    batch.set(doc(collection(db, 'associations'), id), data)
    console.log('  ok ' + asso.nom)
  }
  await batch.commit()
  console.log('  -> ' + associations.length + ' associations injectees')
}

async function seedActivites() {
  console.log('\n Activites injection...')
  const batch = writeBatch(db)
  for (const activite of activites) {
    const { id, ...data } = activite
    // Supprimer les champs null (Firestore n'aime pas null en mode strict)
    const dataClean = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== null)
    )
    batch.set(doc(collection(db, 'activites'), id), dataClean)
    console.log('  ok ' + activite.heure_debut + ' - ' + activite.titre)
  }
  await batch.commit()
  console.log('  -> ' + activites.length + ' activites injectees')
}

async function seedConfig() {
  console.log('\n Config injection...')
  await setDoc(doc(db, 'config', 'infos'), infosFestival)
  console.log('  ok /config/infos injecte')
}

async function seedReservations() {
  console.log('\n Reservations injection...')
  const batch = writeBatch(db)
  for (const res of reservations) {
    const { id, ...data } = res
    batch.set(doc(collection(db, 'reservations'), id), data)
    console.log('  ok ' + res.user_nom + ' -> ' + res.activite_titre + ' (' + res.statut + ')')
  }
  await batch.commit()
  console.log('  -> ' + reservations.length + ' reservations injectees')
}

async function seedQuiz() {
  console.log('\n Quiz injection...')
  const batch = writeBatch(db)
  for (const question of quizQuestions) {
    const { id, ...data } = question
    batch.set(doc(collection(db, 'quiz'), id), data)
    console.log('  ok Q' + question.ordre + ' : ' + question.question.slice(0, 45) + '...')
  }
  await batch.commit()
  console.log('  -> ' + quizQuestions.length + ' questions injectees')
}

async function seedProfils() {
  console.log('\n Profils injection...')
  const batch = writeBatch(db)
  for (const profil of profils) {
    const { id, ...data } = profil
    batch.set(doc(collection(db, 'profils'), id), data)
    console.log('  ok ' + profil.prenom + ' ' + profil.nom + ' (' + profil.points_gamification + ' pts)')
  }
  await batch.commit()
  console.log('  -> ' + profils.length + ' profils injectes')
}

// -------------------------------------------------------
// POINT D'ENTREE
// -------------------------------------------------------

async function main() {
  console.log("Demarrage du seed Firestore — Solimouv'")
  console.log('Projet : ' + process.env.VITE_FIREBASE_PROJECT_ID)

  try {
    await seedAssociations()
    await seedActivites()
    await seedConfig()
    await seedReservations()
    await seedQuiz()
    await seedProfils()
    console.log('\nSeed termine avec succes !')
    console.log('Collections injectees : associations, activites, config, reservations, quiz, profils')
    console.log('Verifiez vos donnees sur https://console.firebase.google.com')
  } catch (err) {
    console.error('\nErreur pendant le seed :', err)
    console.error('\nVerifiez :')
    console.error('  1. Que .env est bien renseigne')
    console.error('  2. Que les regles Firestore autorisent les ecritures')
    process.exit(1)
  }

  process.exit(0)
}

main()
