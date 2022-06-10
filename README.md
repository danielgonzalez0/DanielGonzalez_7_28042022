# GROUPOMANIA P7 OpenClassrooms

## Langages et Outils utilisés

React, Redux, axios, sass, SQL (Mysql), JWT, EXPRESS, bcrypt, multer

## Installation backend

1. Après avoir cloner ou deziper le repo sur votre PC, placer vous dans le répertoire backend et utiliser la commande `npm install` dans le terminal pour installer les dépendances du package.json

2. Créer un fichier .env à la racine du répertoire backend pour mettre à jour les variables d'environnement suivantes:
   PORT = 5000   
   CLIENT_URL = http://localhost:3000  
   SQL_PASSWORD = (envoyez séparément)  
   ACCESS_TOKEN_SECRET = (envoyez séparément)

## Installation base de données (social_network)

prérequis: avoir installer Mysql

1. Ouvrir un terminal et lancer le serveur local : commande `chemin_acces\MySQL\BIN .\mysqld.exe --console`
   Ne pas fermer ce terminal pour ne pas couper le serveur

2. ouvrir un deuxieme terminal, se connecter à mysql avec le code d'accès fourni séparément et executer le fichier `data.sql` pour créer la base de données déjà pré-remplies

commande connection: `chemin_acces\MySQL\bin> .\mysql.exe -u root -p`
entrer le mot de passe
commande installation: `SOURCE chemin_acces\backend\SQL\data.sql`

## Usage Backend

Placer vous dans le répertoire backend et utiliser la commande `npm start` pour lancer le backend en local.
L"application utilise Nodemon et le serveur se relancera automatiquement à chaque changement dans le code.
Utiliser `Ctrl+C` dans le terminal pour arrêter le serveur.

## Installation Frontend

1. Après avoir installer le backend, placer vous dans le répertoire `client` et utiliser la commande `npm install` dans le terminal pour installer les dépendances du package.json

2. Créer un fichier .env à la racine du répertoire client pour mettre à jour la variable d'environnement suivante:
   REACT_APP_API_URL=http://localhost:5000/

## Usage Frontend

Placer vous dans le répertoire client et utiliser la commande `npm start` pour lancer le frontend.
Utiliser `Ctrl+C` dans le terminal pour arrêter le serveur.

## authentification

Les routes sont protégées par un token d'authentification.
Pour vérifier si l'utilisateur est autorisé ou non, il faudra que vous définissiez votre clé secrète dans les variables d'environnement (`ACCESS_TOKEN_SECRET`).
