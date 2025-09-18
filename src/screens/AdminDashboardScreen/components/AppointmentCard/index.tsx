import React from 'react';
import { Alert } from 'react-native';
import { Appointment } from '../../hooks/useAdminDashboard';
import { AppointmentStatus, getStatusText, canUpdateStatus } from '../../utils/statusHelpers';
import {
  Container,
  Header,
  DoctorInfo,
  DoctorName,
  Specialty,
  DateTime,
  StatusBadge,
  StatusText,
  ActionContainer,
  ActionButton,
  ActionButtonText
} from './styles';

/**
 * Componente para exibir informações de uma consulta
 * 
 * Este componente demonstra:
 * - Componente especializado e reutilizável
 * - Uso de utilitários para lógica de negócio
 * - Interações do usuário com confirmação
 * - Layout bem estruturado e responsivo
 */

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusUpdate: (id: string, status: AppointmentStatus) => Promise<void>;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onStatusUpdate
}) => {
  const handleStatusUpdate = (newStatus: AppointmentStatus) => {
    const actionText = newStatus === 'confirmed' ? 'confirmar' : 'cancelar';
    
    Alert.alert(
      'Confirmar Ação',
      `Deseja realmente ${actionText} esta consulta?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await onStatusUpdate(appointment.id, newStatus);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível atualizar o status da consulta');
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Container>
      <Header>
        <DoctorInfo>
          <DoctorName>{appointment.doctorName}</DoctorName>
          <Specialty>{appointment.specialty}</Specialty>
          <DateTime>
            {formatDate(appointment.date)} às {appointment.time}
          </DateTime>
        </DoctorInfo>
        
        <StatusBadge status={appointment.status}>
          <StatusText status={appointment.status}>
            {getStatusText(appointment.status)}
          </StatusText>
        </StatusBadge>
      </Header>

      {canUpdateStatus(appointment.status) && (
        <ActionContainer>
          <ActionButton
            variant="confirm"
            onPress={() => handleStatusUpdate('confirmed')}
          >
            <ActionButtonText>Confirmar</ActionButtonText>
          </ActionButton>
          
          <ActionButton
            variant="cancel"
            onPress={() => handleStatusUpdate('cancelled')}
          >
            <ActionButtonText>Cancelar</ActionButtonText>
          </ActionButton>
        </ActionContainer>
      )}
    </Container>
  );
};

export default AppointmentCard;
