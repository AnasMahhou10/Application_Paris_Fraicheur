/** @type {import('tailwindcss').Config} */
export default {
  // Chemins des fichiers à analyser pour les classes CSS utilisées
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  
  // Active le mode sombre avec la classe "dark" sur l'élément parent
  darkMode: "class",

  theme: {
    extend: {
      // Palette de couleurs personnalisée du projet
      colors: {
        primary: "#5f259f",    // Violet principal 
        accent: "#18d8d8",     // Cyan pour les accents et highlights
        secondary: "#341b63",  // Violet foncé pour les éléments secondaires
        dark: "#0f0f1a",       // Arrière-plan mode sombre 
        light: "#f5f5f5",      // Arrière-plan mode clair 
      },
      
      // Configuration des polices personnalisées
      fontFamily: {
        nexa: ["Nexa"],        
        heading: ["Nexa"],     
        sans: ["Nexa"],        
      },
      
      // Ombres personnalisées pour les cartes et composants
      boxShadow: {
        card: "0 10px 25px -10px rgba(0,0,0,.4)",  
      },
      
      // Animations personnalisées 
      keyframes: {
        // Animation de pulsation lente pour les états de chargement
        pulseSlow: { 
          "0%,100%": { opacity: 1 },    // État initial et final : opaque
          "50%": { opacity: .4 }        // État intermédiaire : semi-transparent
        },
      },
      
      // Classes d'animation utilisables dans les composants
      animation: {
        "pulse-slow": "pulseSlow 2s ease-in-out infinite",  // Pulsation douce infinie 2 secondes
      },
    },
  },
  
  // Aucun plugin Tailwind additionnel installé
  plugins: [],
};