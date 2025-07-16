import { apiService } from './api.js';

export const datasetsService = {
  // Méthode générique pour récupérer n'importe quel dataset avec filtres et pagination
  async getDatasets(type, filters = {}, page = 1) {
    return apiService.get(`/${type}`, { ...filters, page });
  },

  // Méthodes spécialisées pour chaque type de données 
  async getEquipments(filters = {}) {
    return this.getDatasets('equipments', filters);
  },

  async getGreenSpaces(filters = {}) {
    return this.getDatasets('green', filters);
  },

  async getFountains(filters = {}) {
    return this.getDatasets('fountains', filters);
  }
};