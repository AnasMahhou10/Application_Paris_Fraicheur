// Composant Skeleton - Animation de chargement pour simuler une table de données
export default function SkeletonTable() {
  return (
    <div className="mt-6 space-y-4">
      {/* Skeleton du titre/header de section */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-6 w-32 animate-pulse"></div>
      
      {/* Skeleton de la table principale */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Header de table (en-têtes colonnes) */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 flex gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1 animate-pulse"></div>
          ))}
        </div>
        
        {/* Lignes de données simulées */}
        {[1, 2, 3, 4, 5].map(row => (
          <div key={row} className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-4">
            {[1, 2, 3, 4].map(col => (
              <div key={col} className="h-4 bg-gray-200 dark:bg-gray-600 rounded flex-1 animate-pulse"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Export alternatif pour compatibilité avec imports existants
export { SkeletonTable };