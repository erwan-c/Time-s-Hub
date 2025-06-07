Times-Hub
# Time's Hub - README

Time's Hub est une application mobile inspirée du jeu Time's Up. Elle permet à des équipes de joueurs de s'affronter dans des manches où il faut faire deviner un maximum de mots dans un temps imparti.

---

## 🧱 Technologies utilisées

* **Frontend** : React Native (Expo)
* **Backend** : Node.js + Express
* **Base de données** : MongoDB Atlas
* **IA** : Gemini (pour la génération dynamique de mots)

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
* Expo CLI : `npm install`
* Compte MongoDB Atlas
* Clé API OpenAI ou Gemini

### 1. Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/times-hub.git
cd times-hub
```
> Ou directement le dossier ZIP fourni

### 2. Initialisation du frontend

```bash
cd frontend
npm install
npm start
```

> Pour Android comme IOS : scannez le QR code avec l’app Expo Go

### 3. Initialisation du backend

```bash
cd backend
npm install
```

> Le .env sont fournis dans le zip  

Puis lancer le backend :

```bash
npm start
```

---

## 🧪 Tester l’application

* Lancer `npm  start` dans `frontend`
* Lancer `npm start` dans `backend`
* Depuis l’app mobile Expo Go, scannez le QR code
* Tester : inscription, connexion, jeu avec ou sans thème personnalisé

---

## 👥 Auteurs

* Nolann Devignes
* Erwan Chaintron
* Mattéo Broquet

