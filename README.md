Times-Hub
# Time's Hub - README

Time's Hub est une application mobile inspirée du jeu Time's Up. Elle permet à des équipes de joueurs de s'affronter dans des manches où il faut faire deviner un maximum de mots dans un temps imparti.

---

## 🧱 Technologies utilisées

* **Frontend** : React Native (Expo)
* **Backend** : Node.js + Express
* **Base de données** : MongoDB Atlas
* **IA** : OpenAI ou Gemini (pour la génération dynamique de mots)

---

## 📁 Structure du projet

```
.
├── frontend/            # Code source mobile (Expo)
│   ├── components/
│   ├── pages/
│   ├── hook/
│   ├── constantes/
│   └── App.js
│
├── backend/             # API Express (Node.js)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.js

.env                    # Clés d’API (backend)
README.md               # Ce fichier
```

---

## 🚀 Initialisation du projet

### Prérequis

* Node.js >= 18
* Expo CLI : `npm install -g expo-cli`
* Compte MongoDB Atlas
* Clé API OpenAI ou Gemini

### 1. Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/times-hub.git
cd times-hub
```

### 2. Initialisation du frontend

```bash
cd frontend
npm install
npx expo start
```

> Pour Android : scannez le QR code avec l’app Expo Go

### 3. Initialisation du backend

```bash
cd backend
npm install
```

Créer un fichier `.env` dans `/backend` avec :

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_api_key
```

Puis lancer le backend :

```bash
npm start
```

---

## ⚙️ Variables d’environnement (frontend)

Dans `frontend/.env` :

```env
BASE_URL=http://localhost:5000/api
```

> En production, remplacez par l’URL de votre backend déployé.

---

## 🧪 Tester l’application

* Lancer `npx expo start`
* Lancer `npm start` dans `backend`
* Depuis l’app mobile Expo Go, scannez le QR code
* Tester : inscription, connexion, jeu avec ou sans thème personnalisé

---

## 📤 Déploiement

### Mobile (Expo)

```bash
npx expo export --platform android/ios
```

### Backend (Vercel, Render ou Heroku)

* Déployer l’API
* Mettre à jour `BASE_URL` dans le frontend

---

## 🧰 Dépendances clés

### Frontend

```json
"react-native": "~0.74.x",
"expo": "^53.x.x",
"axios": "^1.x",
"@react-navigation/native": "^7.x"
```

### Backend

```json
"express": "^4.x",
"mongoose": "^7.x",
"jsonwebtoken": "^9.x",
"axios": "^1.x"
```

---

## 👥 Auteurs

* Nolann Devignes
* Erwan Chaintron
* Mattéo Broquet

---

## 📄 Licence

Ce projet est distribué sous licence MIT.
