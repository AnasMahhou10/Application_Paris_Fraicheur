// Configuration Vite pour le projet React
import { defineConfig } from 'vite'  
import react from '@vitejs/plugin-react'  


export default defineConfig({
  plugins: [react()],  // Active le support React (JSX, Fast Refresh, etc.)
  
  server: {
    proxy: {
      // Proxy pour rediriger les appels API vers le backend
      '/api': {
        target: 'http://localhost:5000',  // Adresse du serveur backend Express
        changeOrigin: true,               // Change l'origine de la requête (nécessaire pour CORS)
        secure: false                     // Autorise les connexions HTTP non-sécurisées (dev uniquement)
      }
    }
  }
})