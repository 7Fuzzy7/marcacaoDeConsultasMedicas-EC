import theme from '../../../styles/theme';

/**
 * Utilitários para manipulação de status de consultas
 * 
 * Este arquivo demonstra:
 * - Separação de lógica de negócio em utilitários
 * - Reutilização de código
 * - Tipagem forte com TypeScript
 */

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

/**
 * Retorna a cor do tema baseada no status da consulta
 */
export const getStatusColor = (status: AppointmentStatus): string => {
  switch (status) {
    case 'confirmed':
      return theme.colors.success;
    case 'cancelled':
      return theme.colors.error;
    default:
      return theme.colors.warning;
  }
};

/**
 * Retorna o texto em português para o status
 */
export const getStatusText = (status: AppointmentStatus): string => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};

/**
 * Verifica se um status permite ações (confirmar/cancelar)
 */
export const canUpdateStatus = (status: AppointmentStatus): boolean => {
  return status === 'pending';
};
