import { useEffect, useState } from "react";
import { Droplet } from "lucide-react"; // Icône thématique eau/fraîcheur
import {
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList,
} from "recharts"; // Bibliothèque graphiques Recharts
import ilotImg from "../assets/ilot_info.jpg"; // Image illustrative

// Constante de couleur pour les graphiques
const COLOR_HOVER = "#f97316";  
 
// Utilitaire pour tronquer les textes longs
const shorten = (t) => (t.length > 28 ? `${t.slice(0, 27)}…` : t);

// Composant tooltip personnalisé pour les graphiques
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: "#1a1a1a",     // Fond sombre
                color: "#f5f5f5ff",        // Texte clair
                padding: "6px 10px",       // Padding compact
                borderRadius: "4px",       // Bordures arrondies
                fontSize: "13px"           // Taille lisible
            }}>
                {label} : {payload[0].value}
            </div>
        );
    }
    return null;
};

export default function AboutDashboardSection() {
    const [stats, setStats] = useState(null); // Données des graphiques

    // État pour détecter le thème actuel (clair/sombre)
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Fonction pour détecter le mode sombre
        const checkDarkMode = () => {
            const htmlElement = document.documentElement;
            setIsDark(htmlElement.classList.contains('dark')); // Détecte classe 'dark'
        };

        // Vérifier au montage du composant
        checkDarkMode();

        // Observer les changements de classe sur l'élément html
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'] // Surveille seulement les changements de classe
        });

        return () => observer.disconnect(); // Cleanup de l'observer
    }, []);

    // Couleurs dynamiques selon le thème actuel
    const COLOR_OK = isDark ? "#ffffff" : "#b336c6ff";   // Blanc en mode sombre, violet en clair
    const COLOR_KO = isDark ? "#b336c6ff" : "#5f259f";   
    const yAxisColor = isDark ? "#ffffff" : "#5f259f";   
    const labelColor = isDark ? "#ffffff" : "#5f259f";   

    // Hook pour charger les statistiques depuis l'API
    useEffect(() => {
        (async () => { 
            /* ---------- Statistiques fontaines ---------- */
            const fRes = await fetch("/api/fountains");
            const { results: fountains } = await fRes.json();
            // Compte fontaines disponibles (dispo = "oui" insensible à la casse)
            const ok = fountains.filter((f) => /oui/i.test(f.dispo)).length;
            const ko = fountains.length - ok; 

            /* ---------- Statistiques espaces verts ---------- */
            const gRes = await fetch("/api/green");
            const { results: green } = await gRes.json();

            // Agrégation par type d'espace vert
            const byType = {};
            green.forEach((g) => {
                const k = g.type || "NC"; // "NC" si type manquant
                byType[k] = (byType[k] || 0) + 1; // Incrémente compteur
            });

            // Top des types les plus fréquents
            const top = Object.entries(byType)
                .sort((a, b) => b[1] - a[1])     // Tri décroissant par nombre
                .slice(0, 8)                     // Garde les 8 premiers
                .map(([name, value]) => ({ name: shorten(name), value })); // Formate pour Recharts

            setStats({ ok, ko, top }); // Met à jour l'état
        })();
    }, []);

    return (
        <section
            className="
        w-full px-6 py-14
        bg-gradient-to-br from-primary/15 to-primary/8
        dark:bg-gradient-to-br dark:from-primary/25 dark:to-dark
        text-gray-900 dark:text-light
      "
        >
            <div className="max-w-7xl mx-auto space-y-16">

                {/* SECTION À PROPOS */}
                <div id="about" className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    {/* Carte image avec effet hover */}
                    <div className="bg-white/60 dark:bg-white/100 backdrop-blur-md rounded-lg shadow-card p-1 border border-primary/30 overflow-hidden group cursor-pointer">
                        <img
                            src={ilotImg}
                            alt="Parisiens profitant d'un îlot de fraîcheur"
                            className="w-full h-auto rounded-lg object-cover transform transition-all duration-700 ease-out group-hover:scale-110"
                            loading="lazy" // Chargement paresseux pour performance
                        />
                    </div>

                    {/* Texte explicatif avec icône thématique */}
                    <div>
                        <h2 className="font-heading text-3xl mb-4 flex items-center gap-2 text-primary dark:text-white">
                            <Droplet className="w-8 h-8 text-primary" />
                            Les îlots de fraîcheur
                        </h2>
                        <p className="leading-relaxed mb-4 text-gray-800 dark:text-gray-200">
                            Les îlots de fraîcheur à Paris sont des lieux d'accueil, de halte
                            et/ou de repos, accessibles au grand public et repérés comme source
                            de rafraîchissement par rapport à leur environnement proche en
                            période chaude ou caniculaire.
                        </p>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                            Fontaines à boire, brumisateurs, jardins ouverts la nuit ou
                            équipements climatisés : explorez la base pour trouver le spot le
                            plus proche !
                        </p>

                        {/* Élément décoratif avec gradient */}
                        <div className="mt-6 h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                    </div>
                </div>

                {/* SECTION DASHBOARD */}
                <div>
                    <h2 className="text-3xl font-heading mb-10 tracking-wide text-primary dark:text-light text-center">
                        Dashboard
                    </h2>

                    {stats && ( // Affiche seulement si données chargées
                        <div className="grid md:grid-cols-2 gap-10">
                            {/* ---------- Graphique en camembert (Fontaines) ---------- */}
                            <div className="bg-gradient-to-br from-primary/25 to-primary/15 dark:bg-gradient-to-br dark:from-primary/35 dark:to-primary/20 rounded-xl p-6 shadow-xl">
                                <h3 className="mb-4 text-white dark:text-light font-semibold bg-primary/80 dark:bg-primary/60 px-4 py-2 rounded-lg">
                                    Disponibilité des fontaines
                                </h3>
                                <ResponsiveContainer width="100%" height={260}>
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: "Disponibles", value: stats.ok },
                                                { name: "Hors service", value: stats.ko },
                                            ]}
                                            innerRadius={55}        // Donut chart 
                                            outerRadius={95}        // Taille externe
                                            dataKey="value"         // Champ pour les valeurs
                                            stroke="#1a1a1a"       // Bordure segments
                                            paddingAngle={1}        // Espacement entre segments
                                            label={({ value }) => value} // Affiche valeur sur segment
                                        >
                                            <Cell fill={COLOR_OK} /> {/* Couleur segment disponible */}
                                            <Cell fill={COLOR_KO} /> {/* Couleur segment hors service */}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ background: "#1a1a1a", border: "none" }}
                                            labelStyle={{ color: "#f5f5f5" }}
                                            itemStyle={{ color: "#f5f5f5" }}
                                            formatter={(v, n) => [v, n]}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={24}
                                            iconSize={10}
                                            wrapperStyle={{ color: "#cfcfe0" }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* ---------- Graphique en barres horizontales (Espaces verts) ---------- */}
                            <div className="bg-gradient-to-br from-primary/25 to-primary/15 dark:bg-gradient-to-br dark:from-primary/35 dark:to-primary/20 rounded-xl p-6 shadow-xl">
                                <h3 className="mb-4 text-white dark:text-light font-semibold bg-primary/80 dark:bg-primary/60 px-4 py-2 rounded-lg">
                                    Types d'espaces verts
                                </h3>
                                <ResponsiveContainer width="100%" height={260}>
                                    <BarChart
                                        data={stats.top}
                                        layout="vertical"    // Barres horizontales
                                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                                        barCategoryGap={4}   // Espacement entre barres
                                    >
                                        <XAxis type="number" hide />        {/* Axe X caché (valeurs) */}
                                        <YAxis
                                            type="category"
                                            dataKey="name"
                                            width={140}                     // Largeur fixe pour labels
                                            tick={{ fill: yAxisColor, fontSize: 12, fontWeight: "bold" }}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="value"
                                            fill={COLOR_KO}
                                            radius={[4, 4, 4, 4]}          // Bordures arrondies
                                            onMouseOver={(e) => (e.target.style.fill = COLOR_HOVER)} // Effet hover
                                            onMouseOut={(e) => (e.target.style.fill = COLOR_KO)}
                                        >
                                            <LabelList dataKey="value" position="right" fill={labelColor} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}