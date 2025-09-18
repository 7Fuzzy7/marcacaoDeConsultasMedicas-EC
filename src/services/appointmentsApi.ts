import { apiClient, API_ENDPOINTS } from './api';

/**
 * Interface para a consulta retornada pela API
 */
interface ApiAppointment {
  id: number;
  dataHora: string;
  especialidade: string;
  usuarioId: number;
  medicoId: number;
  observacao: string;
  status: 'AGENDADA' | 'CONFIRMADA' | 'CANCELADA' | 'REALIZADA';
}

/**
 * Interface para a consulta usada no frontend
 */
export interface Appointment {
  id: string;
  date: string;
  time: string;
  specialty: string;
  patientId: string;
  doctorId: string;
  notes: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
}

/**
 * Interface para criar uma nova consulta
 */
export interface CreateAppointmentData {
  dataHora: string;
  especialidade: string;
  usuarioId: number;
  medicoId: number;
  observacao: string;
}

/**
 * Serviço para gerenciar consultas médicas
 */
export const appointmentsApiService = {
  /**
   * Cria uma nova consulta
   */
  async createAppointment(data: CreateAppointmentData): Promise<Appointment> {
    try {
      const appointment = await apiClient.post<ApiAppointment>(
        API_ENDPOINTS.APPOINTMENTS,
        {
          ...data,
          status: 'AGENDADA',
        }
      );
      return this.mapApiAppointmentToAppointment(appointment);
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      throw new Error('Erro ao agendar consulta');
    }
  },

  /**
   * Busca uma consulta por ID
   */
  async getAppointmentById(id: string): Promise<Appointment> {
    try {
      const appointment = await apiClient.get<ApiAppointment>(
        `${API_ENDPOINTS.APPOINTMENTS}/${id}`
      );
      return this.mapApiAppointmentToAppointment(appointment);
    } catch (error) {
      console.error('Erro ao buscar consulta:', error);
      throw new Error('Erro ao carregar consulta');
    }
  },

  /**
   * Cancela uma consulta
   */
  async cancelAppointment(id: string): Promise<void> {
    try {
      await apiClient.delete(`${API_ENDPOINTS.APPOINTMENTS}/${id}`);
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      throw new Error('Erro ao cancelar consulta');
    }
  },

  /**
   * Mapeia uma consulta da API para o formato usado no frontend
   */
  mapApiAppointmentToAppointment(apiAppointment: ApiAppointment): Appointment {
    // Divide data e hora
    const dateTime = new Date(apiAppointment.dataHora);
    const date = dateTime.toISOString().split('T')[0];
    const time = dateTime.toTimeString().slice(0, 5);

    // Mapeia o status
    let status: Appointment['status'];
    switch (apiAppointment.status) {
      case 'AGENDADA':
        status = 'scheduled';
        break;
      case 'CONFIRMADA':
        status = 'confirmed';
        break;
      case 'CANCELADA':
        status = 'cancelled';
        break;
      case 'REALIZADA':
        status = 'completed';
        break;
      default:
        status = 'scheduled';
    }

    return {
      id: apiAppointment.id.toString(),
      date,
      time,
      specialty: apiAppointment.especialidade,
      patientId: apiAppointment.usuarioId.toString(),
      doctorId: apiAppointment.medicoId.toString(),
      notes: apiAppointment.observacao,
      status,
    };
  },

  /**
   * Mapeia dados do frontend para o formato da API
   */
  mapAppointmentDataToApi(
    data: {
      date: string;
      time: string;
      specialty: string;
      patientId: string;
      doctorId: string;
      notes: string;
    }
  ): CreateAppointmentData {
    // Combina data e hora
    const dateTime = `${data.date}T${data.time}:00`;

    return {
      dataHora: dateTime,
      especialidade: data.specialty,
      usuarioId: parseInt(data.patientId),
      medicoId: parseInt(data.doctorId),
      observacao: data.notes,
    };
  },
};
