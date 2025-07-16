// Imports des modules Node.js pour créer l'API
import express from "express";          // Framework web pour créer le serveur
import cors from "cors";                // Permet les requêtes cross-origin depuis le frontend
import morgan from "morgan";            // Logger des requêtes HTTP pour le debug
import compression from "compression";  // Compresse les réponses pour optimiser les performances
import helmet from "helmet";            // Sécurise l'app avec des headers HTTP appropriés

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 5000; // Port du serveur 

// Configuration des middlewares globaux
app.use(helmet());      // Active la sécurité 
app.use(compression()); // Compresse gzip/deflate les réponses
app.use(cors());        // Autorise toutes les origines 
app.use(morgan("dev")); // Log format

// Configuration SSL pour OpenData Paris 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Configuration API OpenData Paris
const BASE = "https://opendata.paris.fr/api/records/1.0/search/";
const DATASETS = {
  equipments: "ilots-de-fraicheur-equipements-activites", // ID du dataset équipements
  green: "ilots-de-fraicheur-espaces-verts-frais",        // ID du dataset espaces verts
  fountains: "fontaines-a-boire",                         // ID du dataset fontaines
};
const ROWS = 1000; // Nombre max d'enregistrements par requête

// Liste des paramètres pour chaque dataset
const ALLOWED = {
  equipments: ["payant", "arrondissement", "q", "type", "adresse"], 
  green: ["ouvert_24h", "canicule_ouverture", "ouverture_estivale_nocturne", "arrondissement", "q", "type", "adresse"], 
  fountains: ["dispo", "commune", "q", "modele"],
};

// Fonction utilitaire pour construire et exécuter les requêtes vers OpenData Paris
async function odsFetch(dataset, query, page = 1) {
  const ds = DATASETS[dataset];        // Récupère l'ID du dataset
  const start = (page - 1) * ROWS;     // Calcule l'offset pour la pagination
  const url = new URL(BASE);           // Crée l'URL de base
  
  // Configure les paramètres de base de la requête
  url.searchParams.set("dataset", ds);
  url.searchParams.set("rows", ROWS);
  url.searchParams.set("start", start);

  // Ajoute les filtres utilisateur à l'URL
  Object.entries(query).forEach(([k, v]) => {
    if (!v) return;                                        // Ignore les valeurs vides
    if (k === "q") url.searchParams.set("q", v);           // Recherche globale
    else url.searchParams.set(`refine.${k}`, v);           // Filtre sur un champ spécifique
  });

  // Exécute la requête vers OpenData Paris
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`ODS error ${resp.status}`);
  return resp.json();
}

// Route principale : proxy vers OpenData Paris avec validation des paramètres
app.get("/api/:type", async (req, res) => {
  try {
    const { type } = req.params;                    // Récupère le type de dataset (equipments/green/fountains)
    const page = +(req.query.page ?? 1);           // Numéro de page (converti en nombre)
    const allowed = ALLOWED[type] ?? [];           // Paramètres autorisés pour ce dataset
    
    // Filtre uniquement les paramètres autorisés 
    const query = Object.fromEntries(
      Object.entries(req.query).filter(([k]) => allowed.includes(k))
    );
    
    // Appelle OpenData Paris avec les paramètres validés
    const json = await odsFetch(type, query, page);
    
    // Extrait uniquement les champs utiles de chaque enregistrement
    const rows = (json.records || []).map(r => r.fields);
    
    // Retourne les données formatées au frontend
    res.json({ results: rows, total_count: json.nhits });
  } catch (e) {
    // Gestion d'erreur : log serveur + réponse d'erreur client
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Démarre le serveur sur le port configuré
app.listen(PORT, () => console.log(`API ➜ http://localhost:${PORT}`));