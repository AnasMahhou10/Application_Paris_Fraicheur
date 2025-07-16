// Configuration des colonnes par dataset - Définit l'affichage pour chaque type de données
const COLS = {
  equipments: [
    { k: "nom", t: "Nom", w: "w-48" },                    
    { k: "type", t: "Type", w: "w-32" },                  
    { k: "adresse", t: "Adresse", w: "w-56" },            
    { k: "arrondissement", t: "Arr.", w: "w-16" },        
    { k: "payant", t: "Payant", w: "w-20", f: (v) => v || "Non" },      
    { k: "horaires_periode", t: "Horaires", w: "w-40", f: (v) => v || "—" }, 
  ],
  green: [
    { k: "nom", t: "Nom", w: "w-48" },
    { k: "type", t: "Type", w: "w-32" },
    { k: "adresse", t: "Adresse", w: "w-56" },
    { k: "arrondissement", t: "Arr.", w: "w-16" },
    { k: "ouvert_24h", t: "24h/24", w: "w-20", f: (v) => v || "Non" },   
    { k: "canicule_ouverture", t: "Canicule", w: "w-24", f: (v) => v || "Non" }, 
    { k: "horaires_periode", t: "Horaires", w: "w-40", f: (v) => v || "—" },
  ],
  fountains: [
    { k: "modele", t: "Type", w: "w-32" },                
    { k: "voie", t: "Adresse", w: "w-64" },              
    { k: "dispo", t: "Dispo", w: "w-20", f: (v) => (v === "OUI" || v === "Oui" ? "Oui" : "Non") }, 
    { k: "commune", t: "Commune", w: "w-32" },            
  ],
};

export default function DataTable({
  data = [],         // Données à afficher
  total = 0,         // Nombre total de résultats (pour pagination)
  page = 1,          // Page actuelle
  pages = 1,         // Nombre total de pages
  onPage = () => {}, // Callback changement de page
  dataset = "equipments", // Type de dataset actuel
}) {
  // Récupère la configuration des colonnes selon le dataset actuel
  const cols = COLS[dataset] ?? [];

  return (
    <div className="
      bg-gradient-to-br from-primary/20 via-primary/10 to-white
      dark:bg-gradient-to-br dark:from-primary/30 dark:via-primary/15 dark:to-dark
      rounded-lg p-6 mt-6
      border border-primary/20
      shadow-lg
    ">
      {/* Header avec compteur de résultats */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading text-primary dark:text-white">
          Résultats de recherche
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {total} résultat{total > 1 && "s"} {/* Pluriel conditionnel */}
        </p>
      </div>

      {/* Barre décorative gradient */}
      <div className="w-full h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-6"></div>

      {/* Tableau principal avec scroll horizontal */}
      <div className="overflow-x-auto rounded border border-primary/50 shadow-lg">
        <table className="w-full text-light bg-dark table-fixed min-w-max">
          {/* En-tête sticky avec gradient */}
          <thead className="bg-gradient-to-r from-primary to-primary/80 text-white font-heading sticky top-0 z-10">
            <tr>
              {cols.map((c) => (
                <th key={c.k} className={`px-3 py-3 text-left font-semibold tracking-wide ${c.w}`}>
                  {c.t} {/* Titre de la colonne */}
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Corps du tableau */}
          <tbody>
            {data.length === 0 ? (
              // État vide avec message centré
              <tr>
                <td
                  colSpan={cols.length}
                  className="py-8 text-center italic text-light/70"
                >
                  Aucun résultat.
                </td>
              </tr>
            ) : (
              // Lignes de données avec alternance de couleurs
              data.map((r, i) => (
                <tr
                  key={i}
                  className="odd:bg-secondary/20 hover:bg-primary/10 transition-colors duration-200 border-b border-primary/20"
                >
                  {cols.map((c) => (
                    <td
                      key={c.k}
                      className={`px-3 py-3 ${c.w} break-words align-top leading-tight`}
                    >
                      <div className="whitespace-normal">
                        {/* Applique le formatter si défini, sinon affiche la valeur brute */}
                        {c.f ? c.f(r[c.k]) : r[c.k] || "—"}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Controls de pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors font-medium"
        >
          ← Précédent
        </button>
        
        {/* Indicateur page actuelle */}
        <span className="flex items-center px-4 py-2 bg-primary/10 text-primary dark:text-white font-medium rounded-lg border border-primary/30">
          Page {page} / {pages}
        </span>
        
        <button
          onClick={() => onPage(page + 1)}
          disabled={page >= pages}
          className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors font-medium"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}