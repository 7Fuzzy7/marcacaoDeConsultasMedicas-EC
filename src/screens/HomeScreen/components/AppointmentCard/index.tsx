import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Appointment } from '../../../../types/appointments';
import { User } from '../../../../types/auth';
import theme from '../../../../styles/theme';
import {
  Container,
  DoctorImage,
  InfoContainer,
  DoctorName,
  DoctorSpecialty,
  DateTime,
  Description,
  Status,
  ActionButtons,
  ActionButton
} from './styles';

interface AppointmentCardProps {
  appointment: Appointment;
  doctor?: User;
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointment: Appointment) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  doctor,
  onEdit,
  onDelete
}) => {
  const handleEdit = () => {
    onEdit?.(appointment);
  };

  const handleDelete = () => {
    onDelete?.(appointment);
  };

  const getDoctorSpecialty = (): string => {
    if (doctor?.role === 'doctor' && 'specialty' in doctor) {
      return doctor.specialty;
    }
    return 'Especialidade não encontrada';
  };

  const getStatusText = (status: string): string => {
    return status === 'pending' ? 'Pendente' : 'Confirmado';
  };

  return (
    <Container>
      <DoctorImage 
        source={{ uri: doctor?.image || 'https://via.placeholder.com/100' }} 
      />
      <InfoContainer>
        <DoctorName>
          {doctor?.name || 'Médico não encontrado'}
        </DoctorName>
        <DoctorSpecialty>
          {getDoctorSpecialty()}
        </DoctorSpecialty>
        <DateTime>
          {new Date(appointment.date).toLocaleDateString()} - {appointment.time}
        </DateTime>
        <Description>{appointment.description}</Description>
        <Status status={appointment.status}>
          {getStatusText(appointment.status)}
        </Status>
        <ActionButtons>
          <ActionButton onPress={handleEdit}>
            <Icon 
              name="edit" 
              type="material" 
              size={20} 
              color={theme.colors.primary} 
            />
          </ActionButton>
          <ActionButton onPress={handleDelete}>
            <Icon 
              name="delete" 
              type="material" 
              size={20} 
              color={theme.colors.error} 
            />
          </ActionButton>
        </ActionButtons>
      </InfoContainer>
    </Container>
  );
};

export default AppointmentCard;
