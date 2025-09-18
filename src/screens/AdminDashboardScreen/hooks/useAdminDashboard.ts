import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppointmentStatus } from '../utils/statusHelpers';

/**
 * Custom Hook para gerenciar o estado e lógica do AdminDashboard
 * 
 * Este hook demonstra:
 * - Separação da lógica de estado do componente
 * - Reutilização de lógica entre componentes
 * - Testabilidade independente
 * - Single Responsibility Principle
 */

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: AppointmentStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}

export const useAdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'users'>('appointments');

  /**
   * Carrega todos os dados necessários
   */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Carrega consultas
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        setAppointments(allAppointments);
      }

      // Carrega usuários
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        setUsers(allUsers);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Atualiza o status de uma consulta específica
   */
  const updateAppointmentStatus = useCallback(async (
    appointmentId: string, 
    newStatus: AppointmentStatus
  ) => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map(appointment => {
          if (appointment.id === appointmentId) {
            return { ...appointment, status: newStatus };
          }
          return appointment;
        });
        
        await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(updatedAppointments));
        await loadData(); // Recarrega os dados
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw error;
    }
  }, [loadData]);

  /**
   * Calcula estatísticas das consultas
   */
  const getAppointmentStats = useCallback(() => {
    const total = appointments.length;
    const pending = appointments.filter(app => app.status === 'pending').length;
    const confirmed = appointments.filter(app => app.status === 'confirmed').length;
    const cancelled = appointments.filter(app => app.status === 'cancelled').length;

    return { total, pending, confirmed, cancelled };
  }, [appointments]);

  /**
   * Calcula estatísticas dos usuários
   */
  const getUserStats = useCallback(() => {
    const total = users.length;
    const doctors = users.filter(user => user.role === 'doctor').length;
    const patients = users.filter(user => user.role === 'patient').length;
    const admins = users.filter(user => user.role === 'admin').length;

    return { total, doctors, patients, admins };
  }, [users]);

  // Carrega os dados quando a tela entra em foco
  useFocusEffect(loadData);

  return {
    // Estados
    appointments,
    users,
    loading,
    activeTab,
    
    // Ações
    setActiveTab,
    updateAppointmentStatus,
    refreshData: loadData,
    
    // Dados calculados
    appointmentStats: getAppointmentStats(),
    userStats: getUserStats(),
  };
};
