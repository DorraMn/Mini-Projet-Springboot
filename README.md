
# 🏬 Système de Gestion des Stocks Multi-Entrepôts

Ce projet est une application web permettant de gérer les stocks de plusieurs entrepôts de manière centralisée.  
Il comprend un back-end développé avec **Spring Boot** et un front-end en **HTML/CSS/JavaScript**, le tout conteneurisé avec **Docker**.

---

## 🧾 Description du projet

L’objectif de cette application est d'automatiser et d’optimiser la gestion des stocks à travers plusieurs fonctionnalités clés :

- 📦 **Suivi en temps réel des produits par entrepôt**
- 🔄 **Gestion des mouvements de stock (entrées/sorties)**
- 🚨 **Alertes automatiques en cas de stock bas**
- 📊 **Tableau de bord synthétique**
- 🔐 **Authentification sécurisée**
- 📜 **Historique détaillé des mouvements**

---

## ⚙️ Technologies utilisées

### 🔧 Back-end (`BackSpring`)
-  Java 17  
-  Spring Boot  
-  MySQL Database  
-  Docker  
-  Architecture : Model - Service - Controller - View  

### 🎨 Front-end (`FrontSpring`)
- HTML / CSS / JavaScript  
- Docker

---

## 🚀 Instructions d'installation et d'exécution

> ✅ **Prérequis** :  
> -  Docker Desktop installé  
> -  Git installé

---

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/DorraMn/Mini-Projet-Springboot.git
cd Mini-Projet-Springboot
```

---

### 2️⃣ Structure du projet

```
📁 Mini-Projet-Springboot
├── 📂 backSpring/       # Code du backend Spring Boot
├── 📂 FrontSpring/      # Code du frontend HTML/CSS/JS
└── 📄 README.md         # Fichier de documentation
```

---

### 3️⃣ Construction et exécution avec Docker

#### 🖥️ Backend

📦 Aller dans le dossier `BackSpring` puis builder l’image Docker :

```bash
cd BackSpring
docker build -t first-spring-app .
```

▶️ Lancer le conteneur :

```bash
docker run -p 9090:9090 first-spring-app
```

---

#### 🌐 Frontend

📦 Aller dans le dossier `FrontSpring` puis builder l’image Docker :

```bash
cd ../FrontSpring
docker build -t front-jee-app .
```

▶️ Lancer le conteneur :

```bash
docker run -p 8080:80 front-jee-app
```

---

### 🔗 Accès à l’application

- 🌍 Frontend : [http://localhost:30000](http://localhost:8080)  
- 🛠️ Backend : [http://localhost:30080 ](http://localhost:9090) *(API REST)*
→ Spring Boot

---


## 👩‍💻 Auteur

Développé par **Dorra Moumen**  


---

## 📌 Statut du projet

✅ Version fonctionnelle  
📈 Évolutions futures prévues :
- 🧾 Gestion des fournisseurs avec suivi des livraisons  
- 🗂️ Intégration des catégories et sous-catégories de produits  
- 📄 Exportation des données (PDF, Excel) et génération de rapports  
- 📊 Mise en place de statistiques avancées pour l’analyse des performances  


