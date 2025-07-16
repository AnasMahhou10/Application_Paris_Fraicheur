// Composant racine de l'application - Configure tous les providers et le layout global
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Routing côté client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Gestion état serveur et cache
import { ToastContainer } from "react-toastify"; // Notifications toast
import "react-toastify/dist/ReactToastify.css"; // Styles des notifications

// Hooks et composants personnalisés
import { useTheme } from "./hooks/useTheme"; 
import Header from "./components/common/Header"; 
import Navbar from "./components/common/Navbar"; 
import Footer from "./components/common/Footer"; 
import ScrollToTopFab from "./components/common/ScrollToTopFab"; 
import HomePage from "./pages/HomePage"; 

// Configuration client React Query avec paramètres par défaut
const queryClient = new QueryClient();

export default function App() {
  // Hook personnalisé pour gérer le thème 
  const { theme, toggleTheme } = useTheme();

  return (
    // Provider React Query - met en cache les données API et gère les états loading/error
    <QueryClientProvider client={queryClient}>

      {/* Router - active la navigation côté client sans rechargement page */}
      <BrowserRouter>

        {/* Container thème - applique classe "dark" conditionnellement */}
        <div className={theme === "dark" ? "dark" : ""}>

          {/* Layout principal avec background adaptatif clair/sombre */}
          <div className="min-h-screen bg-white dark:bg-dark">
            
            {/* En-tête, titre et bouton toggle thème */}
            <Header theme={theme} onToggle={toggleTheme} />
            
            {/* Navigation principale (menu liens) */}
            <Navbar />

            {/* Configuration des routes de l'application */}
            <Routes>
              {/* Route racine - affiche la page d'accueil */}
              <Route path="/" element={<HomePage />} />
              {/* Fallback - redirige toutes les routes non trouvées vers l'accueil */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Pied de page avec liens et infos */}
            <Footer />
            
            {/* Bouton flottant pour remonter en haut de page */}
            <ScrollToTopFab />
            
            {/* Container des notifications toast - position top-right, fermeture auto 3s */}
            <ToastContainer position="top-right" autoClose={3000} newestOnTop />
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}