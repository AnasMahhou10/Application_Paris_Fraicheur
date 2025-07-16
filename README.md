# 🌊 Îlots de Fraîcheur Paris

Application web moderne pour explorer les îlots de fraîcheur parisiens : équipements climatisés, espaces verts et fontaines à boire.
## Version Light :
<img width="1920" height="3737" alt="Application_light" src="https://github.com/user-attachments/assets/6c240a85-1a2e-4fbd-b30a-e8e4a8eee55d" />

## Version Dark :
<img width="1920" height="3737" alt="Application_dark" src="https://github.com/user-attachments/assets/7148a568-13a6-4060-904d-874adc14b364" />


# 🎯 Fonctionnalités

- **3 datasets** : Équipements, espaces verts, fontaines
- **Filtres avancés** : Recherche, type, arrondissement, disponibilité, payant, ouvert en canicule
- **Interface moderne** : Mode sombre/clair, responsive design
- **Dashboard** : Statistiques visuelles avec graphiques

# 🚀 Technologies

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

# 📦 Installation
Télecharger Node JS : https://nodejs.org/en/download

## Cloner le repository
git clone https://github.com/AnasMahhou10/Application_Paris_Fraicheur

## Installer les dépendances
```bash
cd Application_Paris_Fraicheur
npm install
cd client
npm install
cd ../server
npm install
```

## Retourner à la racine
```bash
cd ..
```

## Lancer client + serveur en parallèle
```bash
npm run dev
```
# Accès
Frontend: http://localhost:5173
API: http://localhost:5000

# 📦 Design System
Couleur principale : #5f259f (violet)
Police : Nexa (Regular 400, Bold 700)
Thèmes : Clair/Sombre automatique

# 🔗 Sources de données
https://opendata.paris.fr/pages/home/
