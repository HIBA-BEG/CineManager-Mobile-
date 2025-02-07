# 🎬 Application de Gestion de Cinéma - Node.js & Express.js
 
## 📋 Description du projet 
Cette application web permet la gestion complète d'un cinéma, incluant les films, les séances, les réservations, et les salles. Elle inclut une gestion des rôles avec des administrateurs pouvant créer d'autres administrateurs et des clients pouvant s'inscrire pour réserver des places. 

## ✨ Fonctionnalités principales 
 - Gestion des Utilisateurs : 
Inscription des clients : Les clients peuvent créer un compte avec des informations personnelles. 
Connexion & Authentification : Utilisation de JWT pour sécuriser l'accès à certaines fonctionnalités. 
Gestion des Administrateurs : Les administrateurs peuvent ajouter, modifier ou supprimer d'autres administrateurs. 
 - Gestion des Films : 
Ajouter/Modifier/Supprimer un film : Les administrateurs peuvent gérer le catalogue de films. 
Lister les films disponibles : Les clients et les administrateurs peuvent consulter la liste des films à l'affiche. 
 - Gestion des Salles & Séances : 
Créer une salle : Les administrateurs définissent les caractéristiques des salles. 
Planifier/Modifier/Annuler une séance : Gestion des séances avec horaire, film associé, salle, et tarifs. 
Consulter les séances disponibles : Les clients peuvent voir les séances associées à un film et vérifier la disponibilité des places. 
 - Gestion des Réservations : 
Réserver une place : Les clients authentifiés peuvent réserver des places pour une séance donnée. 
Confirmation de réservation : Un email est envoyé aux clients avec les détails de la réservation. 
Annulation/Modification de réservation : Les clients peuvent annuler ou modifier leurs réservations. 
 - Gestion des Places : 
Voir les places disponibles : Les clients peuvent vérifier la disponibilité des sièges. 
Sélection d'une place spécifique : Les clients peuvent choisir une place précise lors de la réservation. 

## 🚀 Technologies utilisées
 - Backend :
Node.js & Express.js : Pour la création d'une API RESTful. 
JWT (JSON Web Token) : Pour la gestion sécurisée des sessions et des utilisateurs. 
Gestion des erreurs : Des réponses claires et détaillées sont fournies lors des opérations CRUD. 
 - Base de données :
MongoDB : Pour le stockage des utilisateurs, films, séances, salles, et réservations. 
Mongoose : Pour la modélisation des données et la gestion des relations. 

## 🛠️ Installation et configuration
  1. Prérequis
Node.js 
MongoDB

  2. Installation du projet
Clonez ce dépôt sur votre machine locale :
`` git clone https://github.com/votre-utilisateur/gestion-cinema.git
cd gestion-cinema ``

Installez les dépendances :

``npm install``

  3. Configuration du projet
Créez un fichier .env à la racine du projet avec les variables suivantes :

``DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=cinema_management
PORT=3000
JWT_SECRET=secret``


  4. Lancer l'application
En mode développement :

``npm run dev``

## 📚 Endpoints API
Voici un aperçu des principaux endpoints de l'application :

- POST /api/auth/register : Inscription d'un nouveau client.
- POST /api/auth/login : Connexion d'un utilisateur (client ou administrateur).
- GET /api/films/AllFilms : Liste des films disponibles.
- POST /api/films/AddFilm : Ajout d'un nouveau film (admin).
- POST /api/reservations/AddReservation : Réservation de places pour une séance (authentification requise).

## 🔒 Sécurité
JWT est utilisé pour l'authentification et la protection des routes sensibles. 
Gestion des rôles (Administrateur, Client) pour limiter l'accès à certaines fonctionnalités.


## 🛠 Bibliothèques utilisées
- Bcryptjs : Pour le hachage des mots de passe.
- Dotenv : Pour la gestion des variables d'environnement.
- Mongoose : Pour l'interaction avec MongoDB.
- Nodemailer : Pour l'envoi des emails de confirmation de réservation.
- Cors : Middleware pour gérer le partage des ressources entre origines multiples (Cross-Origin Resource Sharing).
- Nodemon : Redémarre automatiquement le serveur lorsque des changements sont détectés.
- Express : Un framework minimaliste pour la création d'applications web avec Node.js.
- Jsonwebtoken : Permet de gérer l'authentification des utilisateurs via des tokens JWT (JSON Web Token) pour sécuriser les sessions.
