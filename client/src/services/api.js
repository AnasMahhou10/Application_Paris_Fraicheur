const API_BASE = '/api'; // Base URL pour tous les endpoints

class ApiService {
  async get(endpoint, params = {}) {
    // Construction URL complète avec base + endpoint
    const url = new URL(`${API_BASE}${endpoint}`, window.location.origin);
    
    // Ajout automatique des paramètres de requête non-vides
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value); // Filtre les valeurs falsy
    });
    
    // Exécution de la requête fetch
    const response = await fetch(url);
    
    // Gestion d'erreur avec message descriptif
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    // Parse automatique de la réponse JSON
    return response.json();
  }
}

// Export d'une instance singleton partagée
export const apiService = new ApiService();