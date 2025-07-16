# 🌊 Îlots de Fraîcheur Paris

Application web moderne pour explorer les îlots de fraîcheur parisiens : équipements climatisés, espaces verts et fontaines à boire.


## 🎯 Fonctionnalités

- **3 datasets** : Équipements, espaces verts, fontaines
- **Filtres avancés** : Recherche, type, arrondissement, disponibilité, payant, ouvert en canicule
- **Interface moderne** : Mode sombre/clair, responsive design
- **Dashboard** : Statistiques visuelles avec graphiques
- **Performance** : Pagination côté client, cache intelligent

## 🚀 Technologies

### Frontend
- **React 18** + Vite
- **Tailwind CSS** + PostCSS
- **React Query** (cache & état serveur)
- **React Router** (navigation)
- **Recharts** (graphiques)
- **Lucide React** (icônes)

### Backend
- **Node.js** + Express
- **Proxy intelligent** vers OpenData Paris
- **Middlewares** : CORS, Helmet, Compression, Morgan

## 📦 Installation

# Cloner le repository
git clone 
cd ilots-fraicheur-paris

# Installer les dépendances
npm install
cd client && npm install
cd ../server && npm install

# Retourner à la racine
cd ..

##  Développement
# Lancer client + serveur en parallèle
npm run dev

# Accès
Frontend: http://localhost:5173
API: http://localhost:5000

## 📦 Design System
Couleur principale : #5f259f (violet)
Police : Nexa (Regular 400, Bold 700)
Thèmes : Clair/Sombre automatique

## 🔗 Sources de données
https://opendata.paris.fr/pages/home/