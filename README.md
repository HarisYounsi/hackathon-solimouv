# Solimouv' — PWA Festival du Sport Inclusif

Application web progressive (PWA) officielle du festival **Solimouv'**, organisé par l'association **Up Sport!** — sport inclusif et solidaire à Paris.

> **Hackathon 24h** — 1ère édition du festival : 500 participants, 13 associations partenaires

**Démo** : [URL_VERCEL]

---

## Sommaire

- [Pages implémentées](#pages-implémentées)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Variables d'environnement](#variables-denvironnement)
- [Déploiement](#déploiement)
- [Firestore](#firestore)
- [Git Flow](#git-flow)

---

## Pages implémentées

| Route | Page | Accès |
|---|---|---|
| `/` | Accueil — présentation festival + CTA | Public |
| `/carte` | Carte statique SVG du stade avec 7 marqueurs d'activités | Public |
| `/planning` | Timeline horaire accordion (09h–20h) | Public |
| `/sport` | Grille des sports (fleurs cliquables) | Public |
| `/activite/:id` | Détail activité — horaires, réservation, rappel | Public |
| `/infos` | Liste verticale des associations partenaires | Public |
| `/matcher` | Quiz Sport Matcher — 5 questions, algo scoring | Public |
| `/matcher/resultats` | Top 3 sports recommandés + contact association | Public |
| `/login` | Connexion email + Google | Public |
| `/register` | Inscription avec profil complet | Public |
| `/register/succes` | Confirmation d'inscription (redirect 3s) | Public |
| `/profil` | Profil utilisateur, favoris, réservations, suppression compte | Protégé |
| `/mes-favoris` | Activités favorites de l'utilisateur | Protégé |

---

## Fonctionnalités

- **PWA installable** — service worker Workbox, manifest, icônes, mode offline
- **Firebase Auth** — connexion email/mot de passe + Google Sign-In
- **Firestore 6 collections** — `associations`, `activites`, `quiz`, `profils`, `reservations`, `rappels`
- **Sport Matcher** — algorithme de scoring sur 5 questions, recommande le top 3 sports
- **Système de favoris** — sauvegarde en Firestore, accessible depuis le profil
- **Rappels d'activités** — toggle notification → webhook Make
- **Webhooks Make prêts** — `VITE_MAKE_WEBHOOK_CONTACT` (contact asso) + `VITE_MAKE_WEBHOOK_RAPPEL` (rappel activité)
- **Accessibilité WCAG 2.1** — aria-labels, rôles, contraste, navigation clavier
- **Design mobile-first** — NavbarBottom mobile, Navbar desktop, Footer desktop
- **Mode mock** — `VITE_APP_ENV=development` active les données locales sans Firestore

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| **React** | 19 | UI framework |
| **TypeScript** | 5 | Typage strict |
| **Vite** | 8 | Bundler + dev server |
| **vite-plugin-pwa** | 1.x | Service worker + manifest |
| **React Router** | 7 | Navigation SPA |
| **Firebase** | 12 | Firestore + Auth |
| **CSS Modules** | — | Styles scopés par composant |

Polices : **Nunito** (corps) · **Caveat** (titres script)  
Couleurs : bleu `#3952d0` · orange `#f95625` · vert `#78c442`

---

## Structure du projet

```
src/
├── components/
│   ├── Navbar.tsx            # Navigation desktop
│   ├── NavbarBottom.tsx      # Navigation mobile (5 onglets fixes)
│   ├── Footer.tsx            # Footer desktop (logo + contact)
│   ├── ProtectedRoute.tsx    # Guard routes authentifiées
│   └── GoogleSignInButton.tsx
│
├── pages/
│   ├── Accueil.tsx / .module.css
│   ├── Carte.tsx             # Carte SVG statique
│   ├── Planning.tsx          # Timeline horaire accordion
│   ├── Sport.tsx             # Grille fleurs → détail
│   ├── ActiviteDetail.tsx    # Détail activité + réservation
│   ├── Infos.tsx             # Cards associations
│   ├── Matcher.tsx           # Quiz 5 questions
│   ├── MatcherResultats.tsx  # Top 3 + contact
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── RegisterConfirmation.tsx
│   ├── Profil.tsx
│   └── MesFavoris.tsx
│
├── contexts/
│   └── AuthContext.tsx       # Firebase Auth + profil Firestore
│
├── hooks/
│   └── useFirestore.ts       # useActivites, useAssociations, useQuiz…
│
├── services/
│   └── matcherService.ts     # Algorithme scoring Sport Matcher
│
├── firebase/
│   ├── config.ts
│   └── mockData.ts           # Données locales développement
│
└── types/
    └── index.ts
```

---

## Installation

### Prérequis

- Node.js >= 18
- Un projet Firebase (Firestore + Auth activés)

### 1. Cloner et installer

```bash
git clone https://github.com/HarisYounsi/hackathon-solimouv.git
cd hackathon-solimouv
npm install
```

### 2. Configurer l'environnement

```bash
cp .env.example .env.local
# Renseigner les valeurs Firebase dans .env.local
```

### 3. Lancer en développement

```bash
npm run dev        # http://localhost:5173 — données mock
```

Pour utiliser Firestore réel : passer `VITE_APP_ENV=production` dans `.env.local`.

### Scripts

```bash
npm run dev      # Serveur de développement (HMR)
npm run build    # Build production → /dist
npm run preview  # Prévisualiser le build
```

---

## Variables d'environnement

Copier `.env.example` → `.env.local` et renseigner :

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Mode : "development" (mock) | "production" (Firestore réel)
VITE_APP_ENV=development

# Webhooks Make.com (laisser "a_configurer" pour désactiver)
VITE_MAKE_WEBHOOK_CONTACT=a_configurer
VITE_MAKE_WEBHOOK_RAPPEL=a_configurer
```

> Ne jamais committer `.env.local` (dans `.gitignore`)

---

## Déploiement

### Vercel (recommandé)

```bash
npm install -g vercel
vercel
```

Créer `vercel.json` à la racine :

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Ajouter toutes les variables `VITE_*` dans le dashboard Vercel.

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy --only hosting
```

---

## Firestore

### Collections

| Collection | Description |
|---|---|
| `associations` | Associations partenaires (nom, disciplines, publics, contact) |
| `activites` | Activités du programme (heure, lieu, association, publics) |
| `quiz` | Questions + options du Sport Matcher |
| `profils` | Profils utilisateurs (prenom, nom, sports_favoris…) |
| `reservations` | Réservations d'activités par utilisateur |
| `rappels` | Rappels activités par utilisateur |

### Règles recommandées

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /associations/{id}  { allow read: if true; allow write: if request.auth != null; }
    match /activites/{id}     { allow read: if true; allow write: if request.auth != null; }
    match /quiz/{id}          { allow read: if true; allow write: if request.auth != null; }
    match /profils/{uid}      { allow read, write: if request.auth.uid == uid; }
    match /reservations/{id}  { allow read, write: if request.auth != null; }
    match /rappels/{id}       { allow read, write: if request.auth != null; }
  }
}
```

---

## Git Flow

```
main          ← production stable
develop       ← intégration continue
feature/socle-pwa  ← branche principale hackathon
release/*     ← préparation release
hotfix/*      ← correctifs urgents
```

---

Association **Up Sport!** — [upsport.fr](https://upsport.fr) · contact@upsport.fr
