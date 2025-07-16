import { Sun, Moon, Droplet, Thermometer } from "lucide-react"; // Icônes modernes

export default function Header({ theme = "light", onToggle }) {
  return (
    // Container principal avec fond violet et ombre
    <header className="bg-primary text-white shadow-lg">
      <div className="px-4 py-3 flex justify-between items-center">
        
        {/* Section gauche : Logo + Météo */}
        <div className="flex items-center gap-6">
          
          {/* Logo avec icône et titre */}
          <div className="flex items-center gap-3">
            <Droplet className="w-6 h-6" />                              {/* Icône goutte d'eau */}
            <h1 className="font-heading text-xl font-bold">Paris Fraîcheur</h1> {/* Titre principal */}
          </div>
          
          {/* Informations météo */}
          <div className="hidden lg:flex items-center gap-4 text-sm text-white/80">
            {/* Température actuelle */}
            <div className="flex items-center gap-1">
              <Thermometer size={14} />                                  {/* Icône thermomètre */}
              <span>Paris • 24°C</span>                                 {/* Température statique */}
            </div>
            
            {/* Badge niveau de chaleur */}
            <span className="px-2 py-1 bg-orange-500/20 rounded text-orange-200 text-xs">
              Chaleur modérée                                           
            </span>
          </div>
        </div>

        {/* Bouton toggle thème (section droite) */}
        <button
          onClick={onToggle}                                            // Callback pour changer thème
          aria-label="Basculer le mode sombre"                        
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center justify-center"
        >
          {/* Icône conditionnelle selon le thème actuel */}
          {theme === "dark" ? (
            <Sun size={20} className="text-white-400" />              
          ) : (
            <Moon size={20} className="text-white" />                  
          )}
        </button>
      </div>
    </header>
  );
}