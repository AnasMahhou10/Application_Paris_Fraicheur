import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // Icône flèche vers le haut

export default function ScrollToTopFab() {
  // État pour contrôler l'affichage du bouton
  const [show, setShow] = useState(false);
  
  // Hook pour détecter le scroll et afficher/masquer le bouton
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400); // Affiche si scroll > 400px
    window.addEventListener("scroll", onScroll);          // Écoute l'événement scroll
    return () => window.removeEventListener("scroll", onScroll); // Cleanup au démontage
  }, []);
  
  // Masque le composant si pas assez de scroll
  if (!show) return null;
  
  return (
    // Bouton fixe en bas à droite avec gradient et animations
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // Scroll fluide vers le haut
      className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-primary/80 p-4 rounded-full shadow-xl text-white hover:scale-110 hover:shadow-2xl transition-all duration-300 border-2 border-primary/20"
      aria-label="Remonter" // Accessibilité pour lecteurs d'écran
    >
      <ArrowUp className="w-6 h-6" /> {/* Icône flèche claire et lisible */}
    </button>
  );
}