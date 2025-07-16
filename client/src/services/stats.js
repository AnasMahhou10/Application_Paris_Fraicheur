import { datasetsService } from './datasets.js';

export const statsService = {
  // Calcule les statistiques de disponibilité des fontaines (disponible/hors service)
  async getFountainStats() {
    const { results: fountains } = await datasetsService.getFountains();
    // Compte fontaines disponibles 
    const ok = fountains.filter(f => /oui/i.test(f.dispo)).length;
    const ko = fountains.length - ok; // Hors service = total - disponibles
    return { ok, ko };
  },

  // Analyse la répartition des espaces verts par type pour graphique en barres
  async getGreenSpaceStats() {
    const { results: green } = await datasetsService.getGreenSpaces();
    const byType = {}; // Objet pour compter occurrences par type
    
    // Agrégation par type d'espace vert
    green.forEach(g => {
      const type = g.type || "NC"; // "NC" (Non Classé) si type manquant
      byType[type] = (byType[type] || 0) + 1; // Incrémente compteur
    });

    // Retourne top 8 des types les plus fréquents, formatés pour Recharts
    return Object.entries(byType)
      .sort((a, b) => b[1] - a[1])     // Tri décroissant par nombre d'occurrences
      .slice(0, 8)                     // Limite aux 8 premiers
      .map(([name, value]) => ({ 
        name: name.length > 28 ? `${name.slice(0, 27)}…` : name, // Tronque noms longs
        value 
      }));
  }
};