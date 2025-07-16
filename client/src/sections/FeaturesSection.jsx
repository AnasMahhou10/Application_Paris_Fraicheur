// Section Fonctionnalités - Présente les 4 avantages clés de l'application
import { MapPin, CloudRain, Droplet, TreeDeciduous } from "lucide-react";

export default function Features() {
  // Configuration des cartes de fonctionnalités avec icônes et contenu
  const cards = [
    { Icon: MapPin, title: "+ 1000 Localisations", text: "Trouvez rapidement un îlot partout dans Paris." },
    { Icon: CloudRain, title: "Filtres intelligents", text: "Affinez selon dispo, horaires, type, etc." },
    { Icon: Droplet, title: "Fontaines", text: "Accédez en un clic à la liste des fontaines." },
    { Icon: TreeDeciduous, title: "Espaces verts", text: "Squares, parcs et jardins frais de la ville." },
  ];

  return (
    <section
      className="
        w-full px-6 py-14
        bg-gradient-to-br from-primary/25 via-primary/15 to-white
        dark:bg-gradient-to-br dark:from-primary/35 dark:via-primary/25 dark:to-dark
        text-gray-900 dark:text-light
        border-y border-primary/20
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* Titre de section avec couleur principale */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl text-primary dark:text-white mb-4">
            Fonctionnalités principales
          </h2>
          {/* Barre décorative gradient sous le titre */}
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
        </div>

        {/* Grid responsive des cartes de fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className="
                p-6
                bg-white/70 dark:bg-dark/70
                backdrop-blur-md
                rounded-lg
                shadow-card
                hover:bg-white/90 dark:hover:bg-dark/90
                hover:shadow-xl
                hover:scale-105
                hover:border-primary/50
                transition-all duration-300
                border border-primary/20
                group
              "
            >
              {/* Icône avec animation au hover */}
              <c.Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              
              {/* Titre de la fonctionnalité */}
              <h3 className="font-heading mb-2 text-gray-900 dark:text-light group-hover:text-primary transition-colors">
                {c.title}
              </h3>
              
              {/* Description de la fonctionnalité */}
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}