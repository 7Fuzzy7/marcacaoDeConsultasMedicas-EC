import { apiClient, API_ENDPOINTS } from './api';

// Interface para usuários retornados da API
interface ApiUser {
  id: number;
  nome: string;
  email: string;
  tipo: 'ADMIN' | 'MEDICO' | 'PACIENTE';
  especialidade?: string;
}

// Interface para usuário no frontend
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  specialty?: string;
}

// Interface para alteração de senha
export interface ChangePasswordData {
  userId: string;
  newPassword: string;
}

export const adminApiService = {
  // Listar todos os usuários (apenas admin)
  async getAllUsers(): Promise<AdminUser[]> {
    try {
      const users = await apiClient.get<ApiUser[]>(API_ENDPOINTS.USERS);
      return users.map(this.mapApiUserToAdminUser);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Erro ao buscar usuários');
    }
  },

  // Alterar senha de um usuário (apenas admin)
  async changeUserPassword(data: ChangePasswordData): Promise<void> {
    try {
      await apiClient.put(`${API_ENDPOINTS.CHANGE_PASSWORD}/${data.userId}/senha`, {
        novaSenha: data.newPassword
      });
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      throw new Error('Erro ao alterar senha do usuário');
    }
  },

  // Mapear usuário da API para formato do frontend
  mapApiUserToAdminUser(apiUser: ApiUser): AdminUser {
    const baseUser = {
      id: apiUser.id.toString(),
      name: apiUser.nome,
      email: apiUser.email,
    };

    switch (apiUser.tipo) {
      case 'ADMIN':
        return { ...baseUser, role: 'admin' as const };
      case 'MEDICO':
        return { 
          ...baseUser, 
          role: 'doctor' as const, 
          specialty: apiUser.especialidade || 'Especialidade não informada' 
        };
      case 'PACIENTE':
        return { ...baseUser, role: 'patient' as const };
      default:
        throw new Error(`Tipo de usuário inválido: ${apiUser.tipo}`);
    }
  },
};
