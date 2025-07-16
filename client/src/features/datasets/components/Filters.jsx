import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce"; // Optimisation performance recherche

// Configuration des filtres par dataset - Définit les champs disponibles pour chaque type
const DATA_CONFIG = {
  equipments: {
    text: ["q"], // Champ de recherche textuelle générale
    selects: [
      { key: "type", label: "Type", options: [] },                    // Options dynamiques depuis API
      { key: "arrondissement", label: "Arrondissement", options: [] }, // Options dynamiques
      {
        key: "payant",
        label: "Payant ?",
        options: [ // Options statiques prédéfinies
          { value: "Oui", label: "Oui" },
          { value: "Non", label: "Non" },
        ],
      },
    ],
  },

  green: {
    text: ["q"],
    selects: [
      { key: "type", label: "Type", options: [] },
      { key: "arrondissement", label: "Arrondissement", options: [] },
      {
        key: "ouvert_24h",
        label: "Ouvert 24 h/24",
        options: [
          { value: "Oui", label: "Oui" },
          { value: "Non", label: "Non" },
        ],
      },
      {
        key: "canicule_ouverture",
        label: "Ouvert en canicule", 
        options: [
          { value: "Oui", label: "Oui" },
          { value: "Non", label: "Non" },
        ],
      },
      {
        key: "ouverture_estivale_nocturne",
        label: "Nocturne estivale", 
        options: [
          { value: "Oui", label: "Oui" },
          { value: "Non", label: "Non" },
        ],
      },
    ],
  },

  fountains: {
    text: ["q"],
    selects: [
      { key: "modele", label: "Modèle", options: [] },   
      {
        key: "dispo",
        label: "Disponible ?",
        options: [
          { value: "OUI", label: "Oui" }, // API retourne "OUI"/"NON"
          { value: "NON", label: "Non" },
        ],
      },
      { key: "commune", label: "Commune", options: [] }, 
    ],
  },
};

export default function Filters({ dataset = "equipments", onFilter }) {
  // Récupère la configuration selon le dataset actuel
  const cfg = DATA_CONFIG[dataset] ?? { text: [], selects: [] };

  // État des valeurs sélectionnées par l'utilisateur
  const [values, setValues] = useState({});
  // État des options dynamiques récupérées depuis l'API
  const [facets, setFacets] = useState({});

  // Hook pour charger les options dynamiques quand le dataset change
  useEffect(() => {
    (async () => {
      const obj = {};
      // Traite seulement les selects sans options prédéfinies
      await Promise.all(
        cfg.selects
          .filter((s) => s.options.length === 0) // Seulement les dynamiques
          .map(async ({ key }) => {
            try {
              // Requête API pour récupérer les valeurs uniques du champ
              const r = await fetch(`/api/${dataset}?facet=${key}&rows=0`);
              const j = await r.json();
              // Déduplique et formate les options
              obj[key] = [...new Set(j.results.map((x) => x[key]))]
                .filter(Boolean) // Retire les valeurs nulles/vides
                .map((v) => ({ value: v, label: v }));
            } catch (e) {
              console.error(`facet ${key}`, e);
              obj[key] = []; // Fallback si erreur API
            }
          })
      );
      setFacets(obj);
      setValues({});       // Reset formulaire au changement dataset
      onFilter({});        // Reset requête parent
    })();
  }, [dataset]); // Se déclenche à chaque changement de dataset

  // Debouncing pour optimiser les appels API de filtrage
  const trigger = useCallback(debounce(onFilter, 300), [onFilter]);
  
  // Déclenche le filtrage avec délai à chaque changement de valeurs
  useEffect(() => {
    trigger(values);
    return () => trigger.cancel(); // Cleanup du debounce
  }, [values, trigger]);

  // Helpers pour l'UI
  const hasFilter = Object.values(values).some(Boolean); // Au moins un filtre actif
  const update = (k, v) => setValues((old) => ({ ...old, [k]: v })); // Met à jour une valeur

  return (
    <div className="bg-secondary text-light p-4 rounded-lg shadow-md flex flex-nowrap gap-4 overflow-x-auto">
      {/* Champs de recherche textuelle */}
      {cfg.text.map((k) => (
        <input
          key={k}
          type="text"
          placeholder="Rechercher…"
          value={values[k] ?? ""}
          className="bg-dark text-light border border-primary rounded p-2 flex-shrink-0 w-48 focus:border-primary focus:ring-2 focus:ring-primary/50"
          onChange={(e) => update(k, e.target.value)}
        />
      ))}

      {/* Selects de filtrage */}
      {cfg.selects.map(({ key, label, options }) => {
        // Utilise options statiques ou facets dynamiques
        const opts = options.length ? options : facets[key] ?? [];
        return (
          <select
            key={key}
            value={values[key] ?? ""}
            className="bg-dark text-light border border-primary rounded p-2 flex-shrink-0 w-44 focus:border-primary focus:ring-2 focus:ring-primary/50"
            onChange={(e) => update(key, e.target.value)}
          >
            <option value="">{label}</option>
            {opts.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );
      })}

      {/* Bouton Reset (affiché seulement si filtres actifs) */}
      {hasFilter && (
        <button
          onClick={() => {
            setValues({});   // Reset local
            onFilter({});    // Reset parent
          }}
          className="ml-auto px-3 py-1 bg-primary text-white rounded hover:bg-primary/80 transition-colors text-sm flex-shrink-0"
        >
          Reset
        </button>
      )}
    </div>
  );
}