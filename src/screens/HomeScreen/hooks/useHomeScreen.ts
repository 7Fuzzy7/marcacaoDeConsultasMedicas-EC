import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../../../types/appointments';
import { User } from '../../../types/auth';
import { authApiService } from '../../../services/authApi';

export const useHomeScreen = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [doctors, setDoctors] = useState<User[]>([]);

  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem('appointments');
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  const loadDoctors = async () => {
    try {
      const doctorsData = await authApiService.getAllDoctors();
      setDoctors(doctorsData);
      console.log(`${doctorsData.length} médicos carregados no HomeScreen`);
    } catch (error) {
      console.error('Erro ao carregar médicos no HomeScreen:', error);
      // Não mostra erro para o usuário no HomeScreen, apenas loga
    }
  };

  const getDoctorInfo = useCallback((doctorId: string): User | undefined => {
    return doctors.find(doctor => doctor.id === doctorId);
  }, [doctors]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadAppointments(), loadDoctors()]);
    setRefreshing(false);
  };

  // Carrega dados quando a tela estiver em foco
  useFocusEffect(
    useCallback(() => {
      loadAppointments();
      loadDoctors();
    }, [])
  );

  return {
    appointments,
    doctors,
    refreshing,
    onRefresh,
    getDoctorInfo,
    loadAppointments,
    loadDoctors
  };
};
