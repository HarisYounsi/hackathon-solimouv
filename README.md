# 🏃 Solimouv' — Application PWA du Festival

Application web progressive (PWA) officielle du festival **Solimouv'**, organisé par l'association **Up Sport!** — sport inclusif et solidaire à Paris.

> **Hackathon 24h** — 1ère édition du festival : 500 participants, 13 associations partenaires

---

## 📋 Sommaire

- [Description](#description)
- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Installation et développement](#installation-et-développement)
- [Variables d'environnement](#variables-denvironnement)
- [Déploiement Firebase Hosting](#déploiement-firebase-hosting)
- [Déploiement Vercel (alternative)](#déploiement-vercel-alternative)
- [Gestion des données Firestore](#gestion-des-données-firestore)
- [PWA et mode offline](#pwa-et-mode-offline)

---

## Description

Solimouv' est la 1ère édition d'un festival annuel du sport inclusif et solidaire, organisé par **Up Sport!** à Paris. L'application permet aux participants de :

- Découvrir les **associations partenaires** et leurs disciplines
- Consulter le **programme** des activités du festival
- Accéder aux **infos pratiques** (lieu, transports, accessibilité, contact)
- Utiliser l'app **hors ligne** (PWA installable)

**Publics cibles** : familles, jeunes, seniors, réfugiés, LGBTQIA+, personnes en situation de handicap.

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| **React** | 19 | UI framework |
| **TypeScript** | 5 | Typage strict |
| **Vite** | 6 | Bundler + dev server |
| **vite-plugin-pwa** | latest | Génération service worker + manifest |
| **React Router** | 7 | Navigation SPA |
| **Firebase** | 11 | Firestore (données) + Auth + Hosting |
| **CSS Modules** | — | Styles scopés par composant |

---

## Structure du projet

```
hackathon-solimouv/
├── public/                    # Assets statiques
│   ├── favicon.svg
│   ├── pwa-192x192.png        # Icône PWA (à générer)
│   └── pwa-512x512.png        # Icône PWA (à générer)
│
├── src/
│   ├── components/            # Composants réutilisables
│   │   ├── Navbar.tsx         # Barre de navigation (responsive)
│   │   ├── Footer.tsx         # Pied de page
│   │   ├── Card.tsx           # Carte générique
│   │   ├── Button.tsx         # Bouton multi-variantes
│   │   └── LoadingSpinner.tsx # Indicateur de chargement
│   │
│   ├── pages/                 # Pages de l'application
│   │   ├── Accueil.tsx        # /  → Présentation festival + Up Sport!
│   │   ├── Associations.tsx   # /associations → Liste partenaires
│   │   ├── Programme.tsx      # /programme → Planning activités
│   │   └── Infos.tsx          # /infos → Lieu, accès, contact
│   │
│   ├── firebase/
│   │   ├── config.ts          # Initialisation Firebase
│   │   └── mockData.ts        # Données mock pour développement
│   │
│   ├── hooks/
│   │   └── useFirestore.ts    # Hooks de récupération données Firestore
│   │
│   ├── types/
│   │   └── index.ts           # Types TypeScript (Association, Activite, etc.)
│   │
│   ├── App.tsx                # Routage principal
│   ├── main.tsx               # Point d'entrée + enregistrement PWA
│   └── index.css              # Styles globaux + variables CSS
│
├── firebase.json              # Configuration Firebase Hosting
├── .firebaserc                # Projet Firebase lié
├── .env.example               # Template des variables d'environnement
├── vite.config.ts             # Config Vite + PWA plugin
└── tsconfig.app.json          # Config TypeScript strict
```

---

## Installation et développement

### Prérequis

- **Node.js** >= 18
- **npm** >= 9 (ou pnpm / yarn)
- Un projet **Firebase** créé (voir section variables d'env)

### 1. Cloner et installer

```bash
git clone https://github.com/<votre-org>/hackathon-solimouv.git
cd hackathon-solimouv
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env.local
# Éditer .env.local avec vos valeurs Firebase
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

L'app est accessible sur [http://localhost:5173](http://localhost:5173)

> **Mode mock** : En développement (`VITE_APP_ENV=development`), les données viennent de `src/firebase/mockData.ts`. Pour utiliser Firestore réel, passez `VITE_APP_ENV=production`.

### Scripts disponibles

```bash
npm run dev      # Serveur de développement (avec HMR)
npm run build    # Build de production dans /dist
npm run preview  # Prévisualiser le build de production
npm run lint     # Vérification ESLint
```

---

## Variables d'environnement

Copier `.env.example` en `.env.local` et renseigner les valeurs :

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

VITE_APP_ENV=development  # Mettre "production" pour utiliser Firestore réel
```

**Où trouver ces valeurs** : Firebase Console → Paramètres du projet → Vos applications → Configuration SDK

> ⚠️ Ne jamais committer `.env.local` — il est dans `.gitignore`

---

## Déploiement Firebase Hosting

### 1. Installer Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Lier le projet Firebase

Modifier `.firebaserc` :

```json
{
  "projects": {
    "default": "votre-project-id"
  }
}
```

### 3. Builder et déployer

```bash
npm run build
firebase deploy --only hosting
```

L'URL sera : `https://votre-project-id.web.app`

### CI/CD GitHub Actions (optionnel)

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Firebase Hosting
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_APP_ENV: production
          # ... autres secrets
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
```

---

## Déploiement Vercel (alternative)

```bash
npm install -g vercel
vercel
```

Ajouter les variables d'environnement dans le dashboard Vercel, puis créer `vercel.json` :

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Gestion des données Firestore

### Collections Firestore

| Collection | Description |
|---|---|
| `/associations` | Associations partenaires du festival |
| `/activites` | Activités du programme, triées par heure |
| `/config/infos` | Infos pratiques (lieu, transports, contact) |

### Exemple de document `/associations/{id}`

```json
{
  "nom": "HandiSport Paris",
  "description": "Sport adapté pour les personnes en situation de handicap",
  "disciplines": ["Basket fauteuil", "Tennis de table adapté"],
  "publics": ["Personnes en situation de handicap", "Tous publics"],
  "email": "contact@handisportparis.fr",
  "siteWeb": "https://handisportparis.fr"
}
```

### Règles de sécurité Firestore recommandées

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /associations/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /activites/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /config/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## PWA et mode offline

### Tester l'installation PWA

1. `npm run build && npm run preview`
2. Chrome DevTools → Onglet **Lighthouse** → Audit "Progressive Web App"
3. Le score PWA doit être vert ✅

### Icônes PWA à générer

Utiliser [PWA Builder](https://www.pwabuilder.com/) ou [Favicon.io](https://favicon.io/) pour générer :

- `public/pwa-192x192.png` (192×192px)
- `public/pwa-512x512.png` (512×512px)
- `public/apple-touch-icon.png` (180×180px)
- `public/favicon.ico`

---

## Équipe

Projet réalisé lors du hackathon Up Sport! 2024.

Association **Up Sport!** — [upsport.fr](https://upsport.fr)
