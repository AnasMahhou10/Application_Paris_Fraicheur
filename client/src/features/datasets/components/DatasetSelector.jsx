// Configuration des datasets disponibles dans l'application
const DATASETS = [
  { key: 'equipments', label: 'Équipements' },  
  { key: 'green',      label: 'Espaces verts' }, 
  { key: 'fountains',  label: 'Fontaines' },     
];
 
export default function DatasetSelector({ selected, onChange }) {
  return (
    // Container principal avec style pill/capsule
    <nav className="flex space-x-1 mb-6 bg-gray-100 dark:bg-dark/60 p-1 rounded-lg"> 
      {DATASETS.map(ds => {
        const active = ds.key === selected; // Détermine si cet onglet est actif
        return (
          <button
            key={ds.key}
            onClick={() => onChange(ds.key)} // Callback vers composant parent pour changer dataset
            className={`
              px-4 py-2 rounded-md font-medium transition-all duration-200
              ${active 
                ? 'bg-primary text-white shadow-md' // État actif : violet avec ombre
                : 'text-gray-600 hover:text-primary hover:bg-white dark:text-gray-300 dark:hover:bg-dark/80'} 
            `} 
          > 
            {ds.label}
          </button>
        );
      })}
    </nav>
  );
}