import { useEffect, useState } from "react";
import { Link } from "react-scroll"; // Navigation par scroll smooth vers sections

export default function Navbar() {
  // État pour détecter si l'utilisateur a fait défiler la page
  const [scrolled, setScrolled] = useState(false);
  
  // Hook pour écouter le scroll et ajuster l'apparence de la navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0); // True si scroll > 0px
    window.addEventListener("scroll", onScroll);            // Écoute l'événement scroll
    return () => window.removeEventListener("scroll", onScroll); // Cleanup au démontage
  }, []);

  // Configuration des liens de navigation vers les sections de la page
  const links = [
    { id: "top", label: "Accueil" },    // Section hero/landing
    { id: "about", label: "À propos" }, // Section informations générales
    { id: "data", label: "Données" },  // Section tableau et filtres
  ];

  return (
    // Navbar sticky avec styles conditionnels selon l'état scroll
    <nav className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled ? "bg-white/90 dark:bg-dark/90 backdrop-blur border-b border-primary/20 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Navigation principale (côté gauche) */}
        <ul className="flex gap-8 text-gray-700 dark:text-light">
          {links.map(l => (
            <li key={l.id}>
              {/* Lien avec scroll smooth vers section ciblée */}
              <Link
                to={l.id}                           // ID de la section cible
                smooth                              // Animation fluide
                spy                                 // Détecte la section active
                duration={500}                      // Durée animation (500ms)
                offset={-80}                        // Offset pour compenser navbar sticky
                activeClass="text-primary font-semibold border-b-2 border-primary" // Style section active
                className="cursor-pointer hover:text-primary dark:hover:text-primary transition-all duration-300 pb-1 border-b-2 border-transparent hover:border-primary/50"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Informations statut API (côté droit) */}
        <div className="flex items-center gap-4">
          {/* Badge source des données */}
          <span className="text-sm text-gray-600 dark:text-gray-400">
            🌊 Paris Open Data
          </span>
          {/* Indicateur visuel API active */}
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="API Active"></div>
        </div>
      </div>
    </nav>
  );
}