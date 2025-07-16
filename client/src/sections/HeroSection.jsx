import ilotsImg from "../assets/ilots.jpg"; // Image de fond thématique

export default function Hero() {
  return (
    <header 
      id="top" // Ancre pour navigation smooth depuis navbar
      className="relative h-[420px] flex items-center justify-center bg-gradient-to-br from-primary/15 to-primary/8 dark:bg-gradient-to-br dark:from-primary/25 dark:to-dark"
    >
      {/* Image de fond avec opacité réduite */}
      <img 
        src={ilotsImg} 
        alt="Îlots de fraîcheur parisiens" // Alt descriptif pour accessibilité
        className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-30" 
      />

      {/* Overlay gradient pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40 dark:from-primary/70 dark:via-primary/50 dark:to-transparent"/>

      {/* Contenu principal centré avec z-index élevé */}
      <div className="relative z-10 max-w-3xl px-6 text-center">
        {/* Titre principal avec espace insécable pour éviter coupure */}
        <h1 className="text-4xl md:text-6xl font-heading text-white mb-3">
          Trouvez vos îlots&nbsp;de fraîcheur à Paris
        </h1>
        
        {/* Sous-titre descriptif court et impactant */}
        <p className="leading-relaxed mb-6 text-white/95 mx-auto max-w-md">
          Espaces verts, équipements et fontaines à boire – à portée de clic.
        </p>

        {/* bouton principal avec scroll smooth vers section données */}
        <button
          onClick={() => document.getElementById("data")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Commencer la recherche
        </button>
      </div>
    </header>
  );
}