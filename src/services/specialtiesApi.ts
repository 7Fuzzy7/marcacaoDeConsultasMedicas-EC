import { apiClient, API_ENDPOINTS } from './api';

/**
 * Interface para a especialidade retornada pela API
 */
interface ApiSpecialty {
  id: number;
  nome: string;
}

/**
 * Interface para a especialidade usada no frontend
 */
export interface Specialty {
  id: string;
  name: string;
}

/**
 * Serviço para gerenciar especialidades médicas
 */
export const specialtiesApiService = {
  /**
   * Busca todas as especialidades
   */
  async getAllSpecialties(): Promise<Specialty[]> {
    try {
      const specialties = await apiClient.get<ApiSpecialty[]>(API_ENDPOINTS.SPECIALTIES);
      return specialties.map(this.mapApiSpecialtyToSpecialty);
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
      throw new Error('Erro ao carregar especialidades');
    }
  },

  /**
   * Mapeia uma especialidade da API para o formato usado no frontend
   */
  mapApiSpecialtyToSpecialty(apiSpecialty: ApiSpecialty): Specialty {
    return {
      id: apiSpecialty.id.toString(),
      name: apiSpecialty.nome,
    };
  },
};
